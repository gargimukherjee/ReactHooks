//Example of custom hooks
// export default function useFetch(url) {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch(url)
//       .then(response => response.json())
//       .then(response => setData(response.menuitem));
//   }, [url]);

//   return data;
// }


//Example of useReducer Hooks
import { useEffect, useReducer } from "react";

const initialState = {
  loading: "",
  error: "",
  data: []
};

function apiReducer(state, action) {
  switch (action.type) {
    case "DATA_FETCH_START":
      return { ...state, loading: "yes" };
    case "DATA_FETCH_FAILURE":
      return { ...state, loading: "", error: action.payload };
    case "DATA_FETCH_SUCCESS":
      return { ...state, loading: "", data: action.payload };
    default:
      return state;
  }
}

export default function useFetch(endpoint) {
  const [data, dispatch] = useReducer(apiReducer, initialState);
  
  useEffect(() => {
    dispatch({ type: "DATA_FETCH_START" });

    fetch(endpoint)
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(json => {
        dispatch({ type: "DATA_FETCH_SUCCESS", payload: json });
      })
      .catch(error => {
        dispatch({ type: "DATA_FETCH_FAILURE", payload: error.message });
      });
  }, [endpoint]);
  console.log(data)
  return data;
}