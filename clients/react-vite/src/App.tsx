import { useState } from "react";

import "./App.css";

import { useGameStateStore } from "@lootsurvivor/core";

function App() {
  const [count, setCount] = useState(0);

  const { gameState } = useGameStateStore.getState();

  return <></>;
}

export default App;
