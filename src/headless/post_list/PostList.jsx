import React from "react";
import usePostList from "./hooks/usePostList";
import { motion } from "framer-motion";
import useObserveScrolling from "./hooks/LazyLoadingObserveScrolling";
import { useRef } from "react";
import jobPostService from "../../services/jobPostService";

export default function PostList({
  PostCardComponent,
  company,            // if backend needs companyId explicitly
  className,
  CreatePostComponent,
}) {
  const loaderRef = useRef(null);

  // Use the lazy-loading hook
  const { items, loading, error, loadMore, hasMore } = usePostList(
    jobPostService.getJobPostsByCompany, // or getJobPostsByCompanyMe
    company?.id                          // or null if backend reads from token
  );

  // Infinite scroll observer
  useObserveScrolling({
    loadMore: hasMore ? loadMore : () => {},
    loaderRef,
    loading,
  });

  return (
    <>
      {/* Create Post section */}
      {CreatePostComponent ? (
        <CreatePostComponent company={company} />
      ) : (
        <div className="mt-6 mb-6 bg-bgComponent rounded-lg shadow p-2">
          <p className="text-error text-center w-full">
            Cannot create post right now
          </p>
        </div>
      )}

      {/* List / loading / error */}
      {loading && items.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-gray-600 text-lg">Loading posts…</p>
        </div>
      ) : error ? (
        <div className="mt-6 mb-6 bg-bgComponent rounded-lg shadow p-6">
          <p className="text-error text-center w-full">{error}</p>
        </div>
      ) : (
        <div className={className}>
          {items.map((item) => (
            <motion.div
              key={item.jobId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <PostCardComponent item={item} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Infinite scroll sentinel */}
      <div ref={loaderRef} className="h-8 flex justify-center items-center">
        {loading && items.length > 0 && <span>Loading…</span>}
        {!hasMore && !loading && items.length > 0 && (
          <span>No more jobs</span>
        )}
      </div>
    </>
  );
}