## React query demo blog application

### Server side state

This is the data stored on the server (eg database) but client needs it to show

### Benefits of using react query

- Managing loading and error states automatically
- Prefetching the data from the server
- De-duplication of the requests
- Pagination and infinite scrolling support
- Support for mutations
- Retry on error
- Callbacks to perform on success or error

React query maintains a cache on the client side of the server data making it the source of truth

### Making queries

```ts
export async function fetchPosts(pageNumber: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`
  );
  return response.json();
}
```

```tsx
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
```

This is how we make queries using react query and we prefetch the data as well
