import Phaser from "phaser";
import { internalHeight } from "../../config";

export default class Player extends Phaser.GameObjects.Sprite {
  scene: Phaser.Scene;
  physics: Phaser.Physics.Arcade.ArcadePhysics;
  upKey: Phaser.Input.Keyboard.Key;
  downKey: Phaser.Input.Keyboard.Key;
  movementSpeed: number;
  declare body: Phaser.Physics.Arcade.Body;

  constructor(scene: Phaser.Scene, initForwardSpeed: number) {
    super(scene, 100, internalHeight / 2, "player");
    this.setScale(0.1);
    this.setRotation(Phaser.Math.DegToRad(90));

    this.scene = scene;
    this.physics = scene.physics;
    
    this.scene.add.existing(this); 
    this.physics.add.existing(this);
    this.body.setSize(this.width / 2, this.height / 2);    

    this.upKey = this.scene.input.keyboard.addKey("W");
    this.downKey = this.scene.input.keyboard.addKey("S");

    this.body.setVelocityX(initForwardSpeed)
    this.movementSpeed = 200;
  }

  update(time: number, delta: number) {
    if (this.upKey.isDown) {
      this.body.setVelocityY(-this.movementSpeed)
    }
    else if (this.downKey.isDown) {
      this.body.setVelocityY(this.movementSpeed)
    }
    else {
      this.body.setVelocityY(0)
    }
  }
}
