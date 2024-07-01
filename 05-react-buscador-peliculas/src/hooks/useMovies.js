import { useCallback, useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/movies";

export function useMovies({ sort }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const previousSearch = useRef("");

  /* const getMovies = useMemo(() => {
    return (search) => {
      if (search === "") return;
      if (previousSearch.current === search) return;

      setLoading(true);
      setError(null);
      searchMovies(search)
        .then((newMovies) => setMovies(newMovies))
        .catch((error) => setError(error.message))
        .finally(() => {
          setLoading(false);
          previousSearch.current = search;
        });
    };
  }, []); */

  const getMovies = useCallback((search) => {
    if (search === "") return;
    if (previousSearch.current === search) return;

    setLoading(true);
    setError(null);
    searchMovies(search)
      .then((newMovies) => setMovies(newMovies))
      .catch((error) => setError(error.message))
      .finally(() => {
        setLoading(false);
        previousSearch.current = search;
      });
  }, []);

  // Ordena por título
  // const sortedMovies = sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies;

  // Ordena por año
  const sortedMovies = useMemo(() => {
    return sort ? [...movies].sort((a, b) => b.year - a.year) : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, loading, error };
}
