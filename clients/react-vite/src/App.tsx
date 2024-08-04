import { LandingPage } from "./components/pages/LandingPage";
import { Button } from "./components/ui/button";

import { useSurvivorState } from "./hooks/useSurvivorState";
import { useConnect } from "@starknet-react/core";

function App() {
    const { survivor } = useSurvivorState();

    return (
        <>
            <LandingPage />
        </>
    );
}

export default App;
