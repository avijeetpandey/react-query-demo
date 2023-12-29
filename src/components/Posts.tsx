/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Post } from "../types/post.type";
import { MAX_POST_PAGE } from "../constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";

function Posts() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const queryClient = useQueryClient();

  const { isLoading, isError, error, data } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: async () => await fetchPosts(currentPage),
  });

  useEffect(() => {
    if (currentPage < MAX_POST_PAGE) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery<Post[], Error>({
        queryKey: ["posts"],
        queryFn: async () => fetchPosts(nextPage),
      });
    }
  }, [currentPage, queryClient]);

  if (isLoading) {
    return <h3>Loading</h3>;
  }

  if (isError) {
    return (
      <>
        <h3>Oops something went wrong</h3>
        <p>{error.message}</p>
      </>
    );
  }

  return (
    <>
      <ul>
        {data &&
          data.map((post: Post) => (
            <li
              key={post.id}
              className="post-title"
              onClick={() => setSelectedPost(post)}
            >
              {post.title}
            </li>
          ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((previousValue) => previousValue - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= MAX_POST_PAGE}
          onClick={() => {
            setCurrentPage((previousValue) => previousValue + 1);
          }}
        >
          Next page
        </button>
      </div>
      {selectedPost && <hr />}
    </>
  );
}

export default Posts;
