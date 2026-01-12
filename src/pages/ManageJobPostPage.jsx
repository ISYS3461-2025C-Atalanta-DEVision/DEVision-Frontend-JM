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

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-backGround">
        <NavBar />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
          <p className="text-neutral7 text-lg">Loading job posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-backGround">
        <NavBar/>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-neutral8 mb-2">
              Something went wrong
            </h2>
            <p className="text-neutral7 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-backGround">
      <NavBar  />
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-neutral8">
            Manage Job Posts
          </h1>
          <p className="mt-2 text-sm text-neutral7">
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