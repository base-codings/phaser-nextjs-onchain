import Phaser from "phaser";
import { SCENE_KEYS } from "@/game/scene-keys";
import { EventBus } from "@/game/EventBus";

export default class MainGame extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.GAME_SCENE,
        });
    }
    create() {
        EventBus.emit("current-scene-ready", this);
    }

    update(time: number, delta: number): void {}
}

/* END OF COMPILED CODE */

// You can write more code here
