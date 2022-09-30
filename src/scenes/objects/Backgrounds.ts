import Phaser from "phaser";
import { internalWidth, internalHeight } from "../../config";

export default class Backgrounds extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene, { defaultKey: "bg", classType: Phaser.GameObjects.Image });
    const newImage = scene.add.image(0, 0, "bg");
    newImage.setOrigin(0, 0);
    newImage.setDepth(-1);
    this.add(newImage);

    this.createCallback = (newBg) => {
      if (!(newBg instanceof Phaser.GameObjects.Image)) return;
      newBg.setOrigin(0, 0);
      newBg.setDepth(-1); 
      scene.add.existing(newBg);

      newBg.active = true;
      newBg.visible = true;
    }
  }

  update() {
    const lastLivingBg = this.getLast(true);
    const camera = this.scene.cameras.main;

    // There's actually a memory leak here where you can eventually
    // end up with wayyy more background than you should
    // but heck if i can figure out why
    // this is good enough.

    if (lastLivingBg) {
      if (lastLivingBg.x + lastLivingBg.width <= camera.scrollX) {
        this.kill(lastLivingBg)
      }

      // 10 is added as buffer
      if (lastLivingBg.x + lastLivingBg.width <= camera.scrollX + internalWidth + 10) {
        const revivedBg = this.get(lastLivingBg.x + internalWidth, 0);
        revivedBg.visible = true;
        revivedBg.active = true;
      }
    }
  }
}