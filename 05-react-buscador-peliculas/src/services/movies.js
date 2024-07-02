const API_KEY = "35a0a289";
export function searchMovies(search) {
  if (search === "") return null;

  return fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    .then((res) => res.json())
    .then((json) => {
      const movies = json?.Search;

      const mappedMovies = movies?.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
        poster: movie.Poster,
        year: movie.Year,
      }));

      return mappedMovies;
    })
    .catch((e) => {
      throw new Error(e.message);
    });
}
