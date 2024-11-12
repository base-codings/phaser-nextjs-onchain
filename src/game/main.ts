import Boot from "../scenes/Boot";
import Preloader from "../scenes/Preloader";
import { AUTO, Game } from "phaser";
import MainGame from "@/scenes/MainGame/class";
import ContainerLitePlugin from "phaser3-rex-plugins/plugins/containerlite-plugin.js";
import { BASE_HEIGHT, BASE_WIDTH } from "@/core/constant";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig

const divId = "game-container";

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: BASE_WIDTH,
    height: BASE_HEIGHT,
    parent: divId,
    dom: {
        createContainer: true,
    },
    backgroundColor: "#000",
    loader: {
        crossOrigin: "anonymous",
    },
    input: {
        mouse: {
            target: divId,
        },
        touch: {
            target: divId,
        },
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
    },
    scene: [Boot, Preloader, MainGame],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: true,
        },
    },
    plugins: {
        global: [
            {
                key: "rexContainerLitePlugin",
                plugin: ContainerLitePlugin,
                start: true,
            },
        ],
    },
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartGame;
