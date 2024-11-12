import { useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
import SceneControl from "./components/SceneControl";

function App() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const [scene, setScene] = useState<Phaser.Scene | null>(null);

    const currentScene = (scene: Phaser.Scene) => {
        setScene(scene);
    };

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            <SceneControl scene={scene} />
        </div>
    );
}

export default App;
