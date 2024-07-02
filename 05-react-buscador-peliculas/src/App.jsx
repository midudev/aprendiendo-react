import "./App.css";
import "./bolt.css";
import { useCallback, useEffect, useState } from "react";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import debounce from "just-debounce-it";

export function App() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const { movies, getMovies, loading } = useMovies();

  const debouncedGetMovies = useCallback(debounce(getMovies, 300), []);

  const handleSubmit = (e) => {
    e.preventDefault();

    getMovies(search);
  };

  const handleChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  useEffect(() => {
    if (search === "") {
      setError("La búsqueda no puede estar vacía");
      return;
    }

    setError(null);
  }, [search]);

  return (
    <div className="page">
      <header>
        <h1>Buscador de pelis</h1>
        <form action="#" className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="query"
            id="movie-search"
            value={search}
            onChange={handleChange}
          />
          <button type="submit">Buscar</button>
        </form>
        {error && <p>{error}</p>}
      </header>

      <main>
        {loading && <p>Cargando...</p>}
        <Movies movies={movies} />
      </main>
    </div>
  );
}
