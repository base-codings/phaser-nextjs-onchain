import { SCENE_KEYS } from "@/game/scene-keys";
import MainGame from "@/scenes/MainGame/class";
import MainGameTSX from "@/scenes/MainGame/component";
import React from "react";

const SceneControl = ({ scene }: { scene: Phaser.Scene | null }) => {
    if (scene) {
        if (scene?.scene?.key === SCENE_KEYS.GAME_SCENE) {
            return <MainGameTSX scene={scene as MainGame} />;
        }
        return <></>;
    }
    return <></>;
};

export default SceneControl;
