import { useCallback, useState } from "react";
import "./App.css";
import "./bolt.css";
import { Movies } from "./components/ListOfMovies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import debounce from "just-debounce-it";

export function App() {
  const { search, updateSearch, error } = useSearch();
  const [sort, setSort] = useState(false);
  const { movies, getMovies, loading } = useMovies({ sort });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies(search);
    }, 300),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    getMovies(search);
  };

  const handleChange = (e) => {
    const newQuery = e.target.value;

    updateSearch(newQuery);

    debouncedGetMovies(newQuery);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form action="#" className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="query"
            id="movie-search"
            placeholder="El Padrino, Matrix, Cars..."
            onChange={handleChange}
            value={search}
            className={error && "input-error"}
          />
          <input type="checkbox" name="sort" id="movie-sort" onChange={handleSort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p className="error">{error}</p>}
      </header>

      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}
