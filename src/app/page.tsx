"use client";
import DefaultCard from "./components/DefaultCard";
import Navbar from "./components/Navbar";
import Prompt from "./components/Prompt";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow">
        <Navbar />
      </div>
      <div className="flex justify-center items-center mb-32 font-semibold text-3xl">
        What problem you are trying to solve?
      </div>
      <div className="mt-auto">
        <DefaultCard />
      </div>
      <div className="mt-auto">
        <Prompt />
      </div>
    </main>
  );
}
