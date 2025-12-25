import React from "react";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import ImageHolder from "../../components/ImageHolder";
import useForm from "../../hooks/useForm";
import { postValidators } from "../../hooks/useForm"; // Adjust import if needed

export default function CreateEventForm({ onCreate, isCreating, success, error }) {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleListChange,
    validateAll,
    reset,
  } = useForm(
    {
      title: "",
      caption: "",
      coverImage: "",
      imageUrls: [""],
      videoUrl: "",
    },
    {
      title: [
        postValidators.required("Event title is required"),
        postValidators.maxLength(150, "Event title must not exceed 150 characters"),
      ],
      caption: [
        postValidators.required("Event caption is required"),
        postValidators.maxLength(1000, "Event caption must not exceed 1000 characters"),
      ],
      coverImage: [
        postValidators.required("Cover image is required"),
        postValidators.maxLength(500, "Cover image URL must not exceed 500 characters"),
      ],
      imageUrls: [
        postValidators.maxArrayLength(10, "Maximum 10 images allowed"),
        // Optionally add individual URL length check
      ],
      videoUrl: [
        postValidators.maxLength(500, "Video URL must not exceed 500 characters"),
      ],
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAll()) {
      onCreate && onCreate(values, reset);
    }
  };

  return (
    <form className="max-w-2xl mx-auto p-6 bg-bgComponent rounded-lg shadow space-y-6" onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold mb-4">Create New Event</h1>
      <Input
        label="Event Title"
        name="title"
        type="text"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.title}
        placeholder="e.g., Company Roadshow"
        required
      />
      <TextArea
        label="Event Caption"
        name="caption"
        rows={5}
        value={values.caption}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.caption}
        placeholder="Describe your event here..."
        required
      />
      <Input
        label="Cover Image URL"
        name="coverImage"
        type="text"
        value={values.coverImage}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.coverImage}
        placeholder="e.g., https://..."
        required
      />

      <div>
        <label className="block text-sm font-medium text-neutral8 mb-2">Image Gallery URLs (max 10)</label>
        <div className="space-y-2">
          {(values.imageUrls || []).map((img, i) => (
            <Input
              key={i}
              label={i === 0 ? "" : `Image URL ${i + 1}`}
              name={`imageUrls[${i}]`}
              type="text"
              value={img}
              onChange={(e) => handleListChange(e, "imageUrls")}
              onBlur={handleBlur}
              error={errors.imageUrls && errors.imageUrls[i]}
              placeholder="Paste image URL"
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          type="button"
          onClick={() => handleListChange({ target: { value: "" } }, "imageUrls", "add")}
        >
          Add another image
        </Button>
      </div>

      <Input
        label="Video URL (optional)"
        name="videoUrl"
        type="text"
        value={values.videoUrl}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.videoUrl}
        placeholder="e.g., https://youtube.com/watch?v=..."
      />

      <div className="flex gap-4 pt-4 border-t">
        <Button
          variant="outline"
          size="lg"
          type="button"
          onClick={reset}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size="lg"
          type="submit"
          loading={isCreating}
        >
          Create Event
        </Button>
      </div>
      {error && (
        <div className="mt-4">
          <Alert type="error" message={error} />
        </div>
      )}
      {success && (
        <div className="mt-4">
          <Alert type="success" message={success} />
        </div>
      )}
    </form>
  );
}