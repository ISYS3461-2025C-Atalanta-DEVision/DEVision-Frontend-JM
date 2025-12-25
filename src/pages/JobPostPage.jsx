import React from "react";
import PostList from "../headless/post_list/PostList";
import postService from "../services/postService";
import PostCard from "../components/PostCard";
import NavBar from "../layout/NavBar/NavBar";
import CreateJobPost from "../layout/CreatePostForm/CreateJobPost";
import CompanyCard from "../components/CompanyCard";

import useProfileStore from "../store/profile.store";

export default function JobPostPage() {
  const { profile, loading, error } = useProfileStore();

  return (
    <div className="min-h-screen bg-backGround">
      <NavBar activepage={"jobs"} />

      <main className="w-full flex justify-center pt-5">
        <div className="w-full max-w-7xl flex gap-6 px-6">
          {loading ? (
            <div>Loading profile...</div>
          ) : (
            <aside className="w-[320px] shrink-0">
              <div className="sticky top-20">
                <CompanyCard items={profile} />
              </div>
            </aside>
          )}

          <section className="flex-1">
            <PostList
              PostCardComponent={PostCard}
              fetchPostAPI={postService.getPostList}
              className="flex flex-col gap-6 my-5"
              CreatePostComponent={CreateJobPost}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
