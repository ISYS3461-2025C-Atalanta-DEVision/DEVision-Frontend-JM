import React from "react";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import ImageHolder from "../../components/ImageHolder";
import useForm from "../../hooks/useForm";
import { postValidators } from "../../hooks/useForm";
import useCreateEventForm from "./useCreateEventForm";
import profileService from "../../services/profileService";
import GridTable from "../../headless/grid_table/GridTable";
import Alert from "../../components/Alert";

export default function CreateEventForm({}) {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleListChange,
    validateAll,
    handleFileChange,
    reset,
  } = useForm(
    {
      title: "",
      caption: "",
      coverImage: "",
      images: [],
    },
    {
      title: [
        postValidators.required("Event title is required"),
        postValidators.maxLength(
          150,
          "Event title must not exceed 150 characters"
        ),
      ],
      caption: [
        postValidators.required("Event caption is required"),
        postValidators.maxLength(
          1000,
          "Event caption must not exceed 1000 characters"
        ),
      ],
      coverImage: [
        postValidators.required("Cover image is required"),
        postValidators.maxLength(
          500,
          "Cover image URL must not exceed 500 characters"
        ),
      ],
      imageUrls: [
        postValidators.maxArrayLength(10, "Maximum 10 images allowed"),
        // Optionally add individual URL length check
      ],
      videoUrl: [
        postValidators.maxLength(
          500,
          "Video URL must not exceed 500 characters"
        ),
      ],
    }
  );

  const { handleSubmit, isCreating, setFormOpen, isFormOpen, message } =
    useCreateEventForm(values, profileService.createEvent, validateAll, reset);

  return (
    <form
      className="w-full mx-auto p-6 bg-bgComponent rounded-lg shadow space-y-6 mt-6"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl font-bold mb-4">Create New Event</h1>

      <h2 className="text-xl font-semibold text-textBlack mb-4 border-b pb-2">
        Basic Information
      </h2>

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

      <h2 className="text-xl font-semibold text-textBlack mb-4 border-b pb-2">
        Media Upload
      </h2>

      <div className="flex flex-col w-full items-center md:items-start gap-6">
        <div className="w-full flex flex-col gap-2">
          <label className="block text-sm font-medium text-neutral8">
            Cover Image
          </label>
          <div
            className={`
            relative group
            w-full ${values.coverImage ? "h-content" : "h-80"}
            bg-neutral4 rounded-lg shadow
            flex justify-center items-center
            text-neutral7 text-2xl font-medium
            cursor-pointer
            hover:bg-neutral6 transition
          `}
            onClick={() =>
              values.coverImage
                ? null
                : document.getElementById("cover-upload").click()
            }
          >
            {values.coverImage ? (
              <>
                <ImageHolder
                  src={
                    values.coverImagePreview ||
                    (typeof values.coverImage === "string"
                      ? values.coverImage
                      : "")
                  }
                  alt="Cover image"
                  className="w-full h-auto"
                />

                {/* Edit button */}
                <button
                  type="button"
                  className="
                  absolute top-2 right-2
                  w-10 h-10
                  bg-primary text-white
                  rounded-full
                  flex items-center justify-center
                  opacity-0 group-hover:opacity-100
                  transition-opacity
                "
                  title="Change cover"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    document.getElementById("cover-upload").click();
                  }}
                >
                  <i className="ri-edit-line text-xl" />
                </button>
              </>
            ) : (
              <span className="text-center px-4">Upload Cover Image</span>
            )}
          </div>
        </div>

        <div className="h-full w-full flex flex-col gap-2">
          <label className="block text-sm font-medium text-neutral8">
            Addtional Images
          </label>
          <div className="grid h-full grid-cols-4 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <div
                key={i}
                className="
                  aspect-square
                  bg-error rounded-lg
                  flex items-center justify-center
                  text-neutral7 text-2xl font-medium
                  cursor-pointer
                  hover:bg-neutral6 transition
                "
                title="Add image"
              >
                +
              </div>
            ))}

             <div
                className="
                  aspect-square
                  bg-neutral4 rounded-lg
                  flex items-center justify-center
                  text-neutral7 text-2xl font-medium
                  cursor-pointer
                  hover:bg-neutral6 transition
                "
                title="Add image"
              >
                +
              </div>
          </div>
        </div>

        <input
          id="cover-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            handleFileChange(e, {
              fileField: "coverImage",
              previewField: "coverImagePreview",
              createPreview: true,
            });
            e.target.value = "";
          }}
        />
      </div>

      <div className="flex gap-4 pt-4 border-t">
        <Button variant="outline" size="lg" type="button" onClick={reset}>
          Cancel
        </Button>
        <Button variant="primary" size="lg" type="submit" loading={isCreating}>
          Create Event
        </Button>
      </div>
      {message && (
        <div className="mt-4">
          <Alert type={message.type} message={message.msg} />
        </div>
      )}
    </form>
  );
}
