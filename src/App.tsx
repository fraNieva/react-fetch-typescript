import { useState, useEffect } from "react";
import "./App.css";

type Joke = {
  id: string;
  type: string;
  setup: string;
  punchline: string;
};

function delay(ms: number): Promise<object> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchDelay(url: string, options: Object) {
  await delay(Math.random() * 2000);
  return fetch(url, options);
}

function App() {
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
      <span>{counter}</span>
      <button onClick={() => setCounter(counter + 1)}>Fetch new user</button>
      <p>{id}</p>
      <p>{type}</p>
      <p>{setup}</p>
      <p>{punchline}</p>
    </div>
  );
}

export default App;
