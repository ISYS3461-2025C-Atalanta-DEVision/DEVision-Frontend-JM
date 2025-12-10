import React from "react";
import PostList from "../headless/post_list/PostList";
import postServices from "../services/postServices";
import useDashboardStore from "../store/dashboard.store";
import PostCard from "../components/PostCard";
import NavBar from "../layout/NavBar/NavBar";
import CreateJobPost from "../layout/CreatePostForm/CreateJobPost";

import useAuthLoginStore from "../store/auth.login.store";

export default function JobPostPage() {
  const {user} = useAuthLoginStore();
  
  return (
    <div className="min-h-screen bg-backGround">
      <NavBar activepage={"jobs"} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <PostList
          PostCardComponent={PostCard}
          fetchPostAPI={postServices.getPostList}
          company={user}
          className="flex flex-col w-full gap-6 p-6"
          CreatePostComponent={CreateJobPost}
        />
      </main>
    </div>
  );
}
