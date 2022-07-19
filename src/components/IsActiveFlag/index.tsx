import { useState, useEffect } from "react";
import fetchDelay from "../../helpers/FetchDelay";

import { Joke } from "../../types";

function IsActiveFlag() {
  const [counter, setCounter] = useState<number>(0);
  const [joke, setJoke] = useState<Joke>({
    id: "",
    type: "",
    setup: "",
    punchline: "",
  });

  useEffect(() => {
    let isActive = true;

    const fetchAPI = async () => {
      try {
        let response = await fetchDelay(
          "http://localhost:3005/random_joke",
          {}
        );
        if (response.ok) {
          let json = await response.json();
          if (isActive) {
            setJoke(json);
          }
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    };

    fetchAPI();

    return () => {
      isActive = false;
    };
  }, [counter]);

  const { id, type, setup, punchline } = joke;
  return (
    <div className="App">
      <h1>IsActive Flag</h1>
      <span>{counter}</span>
      <button onClick={() => setCounter(counter + 1)}>Fetch new user</button>
      <p>{id}</p>
      <p>{type}</p>
      <p>{setup}</p>
      <p>{punchline}</p>
    </div>
  );
}

export default IsActiveFlag;
