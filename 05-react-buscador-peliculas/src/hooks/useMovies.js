import { useCallback, useRef, useState } from "react";
import { searchMovies } from "../services/movies";

export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const previousSearch = useRef("");

  const getMovies = useCallback(async (search) => {
    if (search === "") return;
    if (previousSearch.current === search) return;

    try {
      setLoading(true);
      const movies = await searchMovies(search);
      setMovies(movies);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      previousSearch.current = search;
    }
  }, []);

  return { movies, getMovies, loading };
}
