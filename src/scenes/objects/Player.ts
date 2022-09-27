import Phaser from "phaser";
import { internalWidth, internalHeight } from "../config";

export default class Player extends Phaser.GameObjects.Sprite {
  scene: Phaser.Scene;
  physics: Phaser.Physics.Arcade.ArcadePhysics;

  constructor(scene: Phaser.Scene) {
    super(scene, 100, internalHeight / 2, "player");
    this.scene = scene;
    this.physics = scene.physics;
    this.setScale(0.1);
    this.physics.add.existing(this);
    this.body.setSize(this.width / 2, this.height / 2);
    
  }
}
