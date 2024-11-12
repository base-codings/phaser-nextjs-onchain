// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import WebFontLoader from "webfontloader";
import { SCENE_KEYS } from "../game/scene-keys";
import useStoreGlobal from "@/store/useStoreGlobal";
import { getKeyChain } from "@/core/chains";
import { IMAGE_ASSET_KEYS } from "@/assets/asset-key";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Preloader extends Phaser.Scene {
    private fontLoaded = false;
    private assetsLoaded = false;
    private minLoadingTime = 1000;
    private loadingStartTime: number;

    private keyChain: string;

    constructor() {
        super({
            key: SCENE_KEYS.PRELOAD_SCENE,
        });

        this.keyChain = getKeyChain();
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    private progressBar!: Phaser.GameObjects.Rectangle;

    /* START-USER-CODE */

    // Write your code here
    init() {}

    preload() {
        // Use the 'pack' file to load in any assets you need for this scene
        this.load.image(
            IMAGE_ASSET_KEYS.NATIVE_TOKEN_LOGO,
            `assets/tokens/native-logo/${this.keyChain}.png`
        );
        this.load.image(
            IMAGE_ASSET_KEYS.NETWORK_LOGO,
            `assets/tokens/network-logo/${this.keyChain}.png`
        );
        this.load.pack("preload", "assets/preload-asset-pack.json");
        this.load.on("complete", () => {
            this.assetsLoaded = true;
        });
    }

    create() {
        WebFontLoader.load({
            custom: {
                families: ["Grandstander"],
                urls: ["/fonts/font.css"],
            },
            active: () => {
                this.fontLoaded = true;
            },
        });
    }

    update(time: number, delta: number): void {
        // Write your game update code
        const isPageLoading = useStoreGlobal.getState().isPageLoading;

        if (this.fontLoaded && this.assetsLoaded && !isPageLoading) {
            this.scene.start(SCENE_KEYS.GAME_SCENE);
        }
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
