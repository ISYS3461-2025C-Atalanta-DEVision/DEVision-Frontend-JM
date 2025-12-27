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
      <div className="grid w-full grid-cols-[auto,1fr] gap-6">
        <div
          className="text-neutral7 font-medium text-2xl w-80 aspect-square bg-neutral4 shadow rounded-lg shadow flex justify-center items-center cursor-pointer overflow-hidden relative hover:bg-neutral6"
          onClick={() => document.getElementById("cover-upload").click()}
        >
          {values.coverImage ? (
            <ImageHolder
              src={values.coverImage}
              alt={"Cover image"}
              className="w-full h-full object-cover"
            />
          ) : (
            "Upload Cover Image"
          )}
        </div>

        <input
          id="cover-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) =>
            handleFileChange(e, {
              fileField: "coverImage",
            })
          }
        />

        <div className="flex flex-col gap-2">
          <GridTable />
          <Button variant="primary" size="lg" className="w-fit">
            Upload Additional Images
          </Button>
        </div>
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
