import React from "react";
import usePostList from "./usePostList";
import { motion } from "framer-motion";

export default function PostList({
  PostCardComponent,
  fetchPostAPI,
  company,
  className,
  CreatePostComponent,
  createPostAPI,
}) {
  const { items, loading, error } = usePostList(fetchPostAPI, company?.id);

  return (
    <>
      {CreatePostComponent ? (
        <CreatePostComponent company={company} />
      ) : (
        <div className="mt-6 mb-6 bg-bgComponent rounded-lg shadow p-2">
          <p className="text-error text-center w-full">
            Cannot create post rightnow
          </p>
        </div>
      )}
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-gray-600 text-lg">Loading post.</p>
        </div>
      ) : error ? (
        <div className="mt-6 mb-6 bg-bgComponent rounded-lg shadow p-6">
          <p className="text-error text-center w-full">{error}</p>
        </div>
      ) : (
        <div className={className}>
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <PostCardComponent item={item} />
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
