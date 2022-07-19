import { useState, useEffect } from "react";
import fetchDelay from "../../helpers/FetchDelay";
import { Joke } from "../../types";

function AbortControllerComponent() {
  const [counter, setCounter] = useState<number>(0);
  const [joke, setJoke] = useState<Joke>({
    id: "",
    type: "",
    setup: "",
    punchline: "",
  });

  useEffect(() => {
    const abortCtrl = new AbortController();
    const options = { signal: abortCtrl.signal };

    const fetchAPI = async () => {
      try {
        let response = await fetchDelay(
          "http://localhost:3005/random_joke",
          options
        );
        if (response.ok) {
          let json = await response.json();
          setJoke(json);
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    };

    fetchAPI();

    return () => {
      abortCtrl.abort();
    };
  }, [counter]);

  const { id, type, setup, punchline } = joke;
  return (
    <div className="App">
      <h1>AbortController</h1>
      <span>{counter}</span>
      <button onClick={() => setCounter(counter + 1)}>Fetch new user</button>
      <p>{id}</p>
      <p>{type}</p>
      <p>{setup}</p>
      <p>{punchline}</p>
    </div>
  );
}

export default AbortControllerComponent;
