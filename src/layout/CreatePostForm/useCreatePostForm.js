import jobPostCreateStore from "../../store/jobpost.create.store";
import jobPostStore from "../../store/jobpost.store";
import { useEffect } from "react";

function useCreatePostForm(
  createPostApi,
  validateAll,
  values,
  company,
  dashboardServices
) {
  const addItem = jobPostStore((state) => state.addItem);

  const {
    postData,
    loading,
    error,
    setPostData,
    setLoading,
    setError,
    isCreating,
    setIsCreating,
    companyData,
    setCompanyData,
  } = jobPostCreateStore();

  const fetchDashboardProfile = async (companyId) => {
    setLoading(true);
    setError(null);
    try {
      const profileData = await dashboardServices.getCompanyProfile(companyId);
      setCompanyData(profileData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardProfile(company?.id);
  }, [company]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");

      if (!validateAll()) {
        setError("Please fill all the fields correctly.");
        return;
      }
      console.log("Form values on submit:", company);
      const payload = mergeJobPost(values, company.id, company.companyName);

      setPostData(payload);
      setLoading(true);
      console.log("Submitting post data:", payload);
      await new Promise((resolve) => setTimeout(resolve, 800));
      addItem(payload);

      setLoading(false);
    } catch (err) {
      console.error("Failed to create post:", err);
      setError(err.message || "Failed to create post");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  function mergeJobPost(values, company_id, company_name) {
    let salaryValue = "";

    if (values.salaryType === "range") {
      salaryValue = `${values.minSalaryValue} - ${values.maxSalaryValue}`;
    } else if (values.salaryType === "estimation") {
      salaryValue = values.estimationSalary;
    } else {
      salaryValue = null; // negotiable
    }

    return {
      id: `job_${Date.now()}`,
      company_id,
      company_name,

      title: values.title,
      description: values.description,

      // Convert string → array as backend requires
      employmentType: [values.employmentType],

      // Convert 3 separate salary fields → one object
      salary: {
        type: values.salaryType,
        value: salaryValue,
      },

      location: values.location,
      expiryDate: values.expiryDate,
      postedDate: new Date().toISOString().split("T")[0],

      // Rename to match backend
      mediaURL: [
        "https://www.rmit.edu.vn/content/dam/rmit/vn/en/assets-for-production/images/rmit-sgs-campus-facilities/2015-campus-photos/rmit-sgs-b2-14.jpg",
      ],
      skillRequire: values.requireSkills,

      published: values.published,
    };
  }

  return {
    loading,
    error,
    handleSubmit,
    isCreating,
    setIsCreating,
    companyData
  };
}

export default useCreatePostForm;
