import { useEffect, useRef, useState } from "react";

export function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    // Se salta las validaciones en el primer render
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    // Validacion del query
    if (search === "") {
      setError("La búsqueda no puede estar vacía");
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}
