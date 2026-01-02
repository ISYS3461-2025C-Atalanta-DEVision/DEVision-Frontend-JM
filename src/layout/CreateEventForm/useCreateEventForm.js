import { useState, useEffect, useCallback } from "react";
import eventCreateStore from "../../store/eventpost.store";

function useCreateEventForm(values, createEventApi, validateAll, reset) {
  const {
    isFormOpen,
    setFormOpen,
    message,
    setMessage,
    isCreating,
    setIsCreating,
  } = eventCreateStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const isValid = validateAll();

      if (!isValid) {
        setMessage({
          type: "error",
          msg: "Please fill all the fields correctly.",
        });
        return;
      }
      
      const { coverImagePreview, imagePreviews, ...rest } = values;
      setIsCreating(true);
      await createEventApi(rest);

      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsCreating(false);
      setMessage({
        type: "success",
        msg: "Your post has been created successfully!",
      });

      await new Promise((resolve) => setTimeout(resolve, 1200));
      setFormOpen(false);
      setMessage(null);
      reset();
    } catch (error) {
      setMessage({
        type: "error",
        msg: "An error occurred while creating the post.",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return {
    handleSubmit,
    isCreating,
    setFormOpen,
    isFormOpen,
    message,
  };
}

export default useCreateEventForm;
