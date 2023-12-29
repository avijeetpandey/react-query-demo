import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Posts from "./components/Posts";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Blog powered by react query</h1>
      <Posts />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
