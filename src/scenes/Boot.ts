import { Scene } from "phaser";
import { SCENE_KEYS } from "../game/scene-keys";
import WebFontLoader from "webfontloader";

export default class Boot extends Scene {
    constructor() {
        super("Boot");
    }

    preload() {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.pack("pack", "assets/boot-asset-pack.json");

        WebFontLoader.load({
            custom: {
                families: ["Pally"],
                urls: ["/fonts/font.css"],
            },
        });
    }

    create() {
        this.scene.start(SCENE_KEYS.PRELOAD_SCENE);
    }
}

