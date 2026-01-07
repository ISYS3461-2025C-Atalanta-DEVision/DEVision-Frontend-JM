import { useSearchParams } from "react-router-dom";
import NavBar from "../layout/NavBar/NavBar";
import JobPostCard from "../headless/manageJobPost/JobPostCard";
import EditJobPostForm from "../headless/manageJobPost/childComponent/EditJobPostForm";
import useJobPostList from "../hooks/useJobPostList";
import useJobPostActions from "../headless/manageJobPost/hooks/useJobPostActions";

export default function ManageJobPostPage() {
  const { posts, setPosts, loading, error, setError } = useJobPostList();
  const {
    handleDeletePost,
    handlePublishPost,
    handleUnpublishPost,
  } = useJobPostActions({ setPosts, setError });

  const [searchParams, setSearchParams] = useSearchParams();
  const editJobId = searchParams.get("edit");

  // Find the job post being edited
  const currentJobPost = editJobId
    ? posts.find((post) => post.jobId === editJobId)
    : null;

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: "#D9D9D9" }}
    >
      <NavBar activepage={"dashboard"} />
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Manage Job Posts
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage all job posts created by your company.
          </p>
        </header>

        {/* Cards grid */}
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
          {posts.map((item) =>
            editJobId === item.jobId ? (
              // Show edit form for the selected job post
              <div key={item.jobId} className="md:col-span-2">
                <EditJobPostForm
                  currentData={currentJobPost}
                  setSearchParams={setSearchParams}
                  setPosts={setPosts}
                />
              </div>
            ) : (
              // Show regular card for other job posts
              <JobPostCard
                key={item.jobId}
                item={item}
                onDelete={handleDeletePost}
                onPublish={handlePublishPost}
                onUnpublish={handleUnpublishPost}
              />
            )
          )}
        </section>
      </div>
    </div>
  );
}