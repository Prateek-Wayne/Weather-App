"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";

const queryClient = new QueryClient()
export default function Home() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col gap-4 bg-gray-100 min-h-screen ">
        <Navbar />
        <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
          <MainPage/>
        </main>
      </div>
    </QueryClientProvider>
  );
}