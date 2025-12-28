import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJoke } from "./jokeSlice";

function App() {
  const dispatch = useDispatch();

  const joke = useSelector((state) => state.joke.joke);
  const loading = useSelector((state) => state.joke.loading);

  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const categories = [
    "animal",
    "career",
    "celebrity",
    "dev",
    "explicit",
    "fashion",
    "food",
    "history",
    "money",
    "movie",
    "music",
    "political",
    "religion",
    "science",
    "sport",
    "travel"
  ];

  function handleFetch() {
    if (categories.includes(category)) {
      setError("");
      dispatch(fetchJoke(category));
    } else {
      setError(
        `"${category} is not a valid category"\nAvailable categories: ${categories.join(
          ", "
        )}`
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#0f0f0f] to-black">
      <div className="bg-[#181818] p-10 rounded-2xl shadow-xl w-[420px] border border-[#262626]">

        <h2 className="text-3xl uppercase text-red-500 mb-2">
          Joke Generator
        </h2>
        <p className="text-sm text-gray-400 mb-6 uppercase tracking-widest">
          Chunk Norris
        </p>

        <input
          type="text"
          placeholder="Enter category (ex: dev, food)"
          className="w-full px-4 py-3 rounded-lg bg-[#0f0f0f] text-gray-200 border border-[#333] focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-gray-500 flex"
          onChange={(e) => setCategory(e.target.value.toLowerCase())}
        />

        <button
          onClick={handleFetch}
          disabled={loading || !category}
          className="w-full mt-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-red-400 transition-colors duration-200 disabled:opacity-50">
          {loading ? "Loading..." : `Get ${category || "random"} joke`}
        </button>

        <div className="mt-6 p-4 rounded-lg bg-[#0f0f0f] border border-[#2a2a2a]">
          <h1 className={`text-sm leading-relaxed whitespace-pre-line text-center ${error ? "text-red-500 cursor-pointer" : "text-gray-300"
            }`}
          >
            {error ? error : joke}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
