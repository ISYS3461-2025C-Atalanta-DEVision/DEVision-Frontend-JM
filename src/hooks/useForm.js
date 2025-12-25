import { useState, useCallback, use } from "react";

export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback(
    (name, value) => {
      const rules = validationRules[name];
      if (!rules) return "";

      for (const rule of rules) {
        const error = rule(value, values);
        if (error) return error;
      }
      return "";
    },
    [validationRules, values]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      let newValue;

      if (type === "checkbox" && name === "status") {
        newValue = checked ? "PUBLIC" : "PRIVATE";
      } else {
        newValue = type === "checkbox" ? checked : value;
      }
      
      setValues((prev) => ({ ...prev, [name]: newValue }));
      if (touched[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: validateField(name, newValue),
        }));
      }
    },
    [touched, validateField]
  );

  const handleListChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setValues((prev) => {
        const prevArr = Array.isArray(prev[name]) ? prev[name] : [];

        // Prevent duplicates (optional)
        if (prevArr.includes(value)) {
          return prev;
        }

        const updatedArr = [...prevArr, value];

        return {
          ...prev,
          [name]: updatedArr,
        };
      });

      // Revalidate if field already touched
      if (touched[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: validateField(name, [...(values[name] || []), value]),
        }));
      }
    },
    [touched, validateField, values]
  );

  const handleFileChange = useCallback(
    (e, { fileField = "file", previewField, createPreview = true } = {}) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setValues((prev) => {
        const next = { ...prev, [fileField]: file };

        if (createPreview && previewField) {
          next[previewField] = URL.createObjectURL(file);
        }

        return next;
      });
    },
    []
  );

  const handlerRemoveListItem = useCallback((name, valueToRemove) => {
    setValues((prev) => {
      const prevArr = Array.isArray(prev[name]) ? prev[name] : [];
      const updatedArr = prevArr.filter((item) => item !== valueToRemove);

      return {
        ...prev,
        [name]: updatedArr,
      };
    });
  }, []);

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    },
    [validateField]
  );

  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((name) => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(validationRules).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
    );

    return isValid;
  }, [validationRules, values, validateField]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  return {
    values,
    errors,
    touched,
    handleListChange,
    handleChange,
    handlerRemoveListItem,
    handleBlur,
    validateAll,
    reset,
    setValue,
    setValues,
    setErrors,
    handleFileChange,
  };
};

// Common validation rules
export const validators = {
  required:
    (message = "This field is required") =>
    (value) => {
      if (!value || (typeof value === "string" && !value.trim())) {
        return message;
      }
      return "";
    },

  email:
    (message = "Invalid email format") =>
    (value) => {
      if (!value) return "";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return message;
      }
      if (value.length > 254) {
        return "Email must be less than 255 characters";
      }
      return "";
    },

  password:
    (message = "Password does not meet requirements") =>
    (value) => {
      if (!value) return "";
      if (value.length < 8) {
        return "Password must be at least 8 characters";
      }
      if (!/[0-9]/.test(value)) {
        return "Password must contain at least 1 number";
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
        return "Password must contain at least 1 special character";
      }
      if (!/[A-Z]/.test(value)) {
        return "Password must contain at least 1 uppercase letter";
      }
      return "";
    },

  confirmPassword:
    (passwordField = "password") =>
    (value, values) => {
      if (!value) return "";
      if (value !== values[passwordField]) {
        return "Passwords do not match";
      }
      return "";
    },

  phone:
    (message = "Invalid phone number") =>
    (value) => {
      if (!value) return ""; // Phone is optional
      const phoneRegex = /^\+[1-9]\d{0,2}\d{1,12}$/;
      if (!phoneRegex.test(value)) {
        return message;
      }
      return "";
    },

  minLength: (min, message) => (value) => {
    if (!value) return "";
    if (value.length < min) {
      return message || `Must be at least ${min} characters`;
    }
    return "";
  },

  maxLength: (max, message) => (value) => {
    if (!value) return "";
    if (value.length > max) {
      return message || `Must be less than ${max} characters`;
    }
    return "";
  },
};

export const postValidators = {
  required:
    (message = "This field is required") =>
    (value) => {
      if (!value || (typeof value === "string" && !value.trim())) {
        return message;
      }
      return "";
    },
  salaryPositive:
    (message = "Salary must be a positive number") =>
    (value) => {
      if (value === undefined || value === null || value === "") return "";
      if (isNaN(value) || Number(value) <= 0) {
        return message;
      }
      return "";
    },

  isNumber:
    (message = "This field must be a number") =>
    (value) => {
      if (value === undefined || value === null || value === "") return "";
      if (isNaN(value)) {
        return message;
      }
      return "";
    },
  minArrayLength: (min, message) => (value) => {
    if (!Array.isArray(value)) return "";
    if (value.length < min) {
      return message || `Select at least ${min} items`;
    }
    return "";
  },
};

export default useForm;
