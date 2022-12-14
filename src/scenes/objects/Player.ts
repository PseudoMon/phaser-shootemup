import Phaser from "phaser";
import PlayerBullets from "./PlayerBullets";
import { internalHeight, internalWidth } from "../../config";

export default class Player extends Phaser.GameObjects.Sprite {
  scene: Phaser.Scene;
  physics: Phaser.Physics.Arcade.ArcadePhysics;
  upKey: Phaser.Input.Keyboard.Key;
  downKey: Phaser.Input.Keyboard.Key;
  leftKey: Phaser.Input.Keyboard.Key;
  rightKey: Phaser.Input.Keyboard.Key;
  shootKey: Phaser.Input.Keyboard.Key;

  forwardSpeed: number;
  movementSpeed: number;

  declare body: Phaser.Physics.Arcade.Body;

  isInvincible: boolean;

  bulletManager: PlayerBullets | null;
  isShooting: boolean;

  constructor(scene: Phaser.Scene, initForwardSpeed: number) {
    super(scene, 100, internalHeight / 2, "player");
    this.setScale(0.1);
    this.setRotation(Phaser.Math.DegToRad(90));

    this.scene = scene;
    this.physics = scene.physics;
    
    this.scene.add.existing(this); 
    this.physics.add.existing(this);
    this.body.setSize(this.width / 2, this.height / 2);    

    this.upKey = this.scene.input.keyboard.addKey("UP");
    this.downKey = this.scene.input.keyboard.addKey("DOWN");
    this.shootKey = this.scene.input.keyboard.addKey("Z");
    this.rightKey = this.scene.input.keyboard.addKey("RIGHT");
    this.leftKey = this.scene.input.keyboard.addKey("LEFT");

    this.body.setVelocityX(initForwardSpeed)

    this.forwardSpeed = initForwardSpeed;
    this.movementSpeed = 200;

    this.isInvincible = false;

    this.bulletManager = null;
    this.isShooting = false;

    this.shootKey.on("down", () => this.isShooting = true)
    this.shootKey.on("up", () => this.isShooting = false)
  }

  onOverlapWithEnemy() {
    if (this.isInvincible) return;
    this.isInvincible = true;
    this.scene.tweens.add({
      targets: this,
      alpha: { from: 1, to: 0},
      duration: 200,
      repeat: 2,
      yoyo: true,
      onComplete: (tween, target) => {
        this.isInvincible = false;
      }
    }) 
  }

  setBulletManager(bulletManager: PlayerBullets) {
    this.bulletManager = bulletManager;
  }



  update() {
    if (this.upKey.isDown && this.y > 0) {
      this.body.setVelocityY(-this.movementSpeed)
    }
    else if (this.downKey.isDown && this.y <= internalHeight) {
      this.body.setVelocityY(this.movementSpeed)
    }
    else {
      this.body.setVelocityY(0)
    }

    const scrollX = this.scene.cameras.main.scrollX;

    if (this.leftKey.isDown && this.x > scrollX) {
      this.body.setVelocityX(-this.movementSpeed);
    }
    else if(this.rightKey.isDown && this.x <= scrollX + internalWidth) {
      this.body.setVelocityX(this.movementSpeed + this.forwardSpeed);
    }
    else {
      this.body.setVelocityX(this.forwardSpeed);
    }

    if (this.isShooting && this.bulletManager) {
      this.bulletManager.setShootPosition(this.x, this.y);
    }
    if (!this.isShooting && this.bulletManager) {
      this.bulletManager.stopShooting();
    }
   
  }
}
