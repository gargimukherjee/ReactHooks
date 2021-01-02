import { useState, useEffect } from "react";

export default function useFetchBooks(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(response => {setData(response.books)}
      );
  }, [url]);


  return data;
}
