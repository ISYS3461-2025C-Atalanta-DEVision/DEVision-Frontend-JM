import NavBar from "../layout/NavBar/NavBar";
import GridTable from "../headless/grid_table/GridTable";
import postService from "../services/postService";
import JobPostCard from "../components/JobPostCard";

export default function ManageJobPostPage() {
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
        <section>
          <GridTable
            CardComponent={JobPostCard}
            fetchItemAPI={postService.getJobPostsByCompany}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          />
        </section>
      </div>
    </div>
  );
}