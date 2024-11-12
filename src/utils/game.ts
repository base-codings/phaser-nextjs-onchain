import { getIsAnyModalOpen } from "@/context/ModalContext/utils";
import { hashString } from "./string";
import ContainerLite from "phaser3-rex-plugins/plugins/gameobjects/container/containerlite/ContainerLite";

type ObjectPhaser =
    | Phaser.GameObjects.Image
    | Phaser.GameObjects.Container
    | Phaser.GameObjects.Graphics
    | ContainerLite;

export function phaserClick(
    object: ObjectPhaser,
    callback: () => void
): ObjectPhaser {
    object
        .setInteractive({ useHandCursor: true })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            const isAnyModalOpen = getIsAnyModalOpen();
            const isOpenAppKitModal = document.querySelector("w3m-modal.open");
            if (!isAnyModalOpen && !isOpenAppKitModal) {
                callback();
            }
        });
    return object;
}
