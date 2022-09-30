import Phaser from "phaser";
import { internalWidth } from "../../config";

export default class PlayerBullets extends Phaser.GameObjects.Group {
  camera: Phaser.Cameras.Scene2D.Camera;

  // Interval between created bullets in milliseconds
  bulletInterval: number;
  msSinceLastBullet: number;

  bulletSpeed: number;

  // Where to create the bullets
  // If they're null, don't shoot
  xShootPos: number | null; 
  yShootPos: number | null;

  constructor(scene: Phaser.Scene, texture: string = "bullet") {
    super(scene, {
      defaultKey: texture,
    });
    scene.add.existing(this);
    this.camera = scene.cameras.main;

    this.scene = scene;
    this.bulletInterval = 50;
    this.msSinceLastBullet = 0;

    this.bulletSpeed = 300;

    this.xShootPos = null;
    this.yShootPos = null;
  }

  setShootPosition(x: number, y: number) {
    this.xShootPos = x;
    this.yShootPos = y;
  }

  stopShooting() {
    this.xShootPos = null;
    this.yShootPos = null;
  }

  createBullet() {
    if (this.xShootPos === null || this.yShootPos === null) return;
    
    const newBullet = this.get(this.xShootPos, this.yShootPos);
    newBullet.setScale(0.5);
    newBullet.active = true;
    newBullet.visible = true;
    
    this.scene.physics.add.existing(newBullet);
    newBullet.body.setVelocityX(this.bulletSpeed)
  }

  update(delta: number) {
    this.msSinceLastBullet += delta;

    if (this.msSinceLastBullet >= this.bulletInterval) {
      this.msSinceLastBullet = 0;
      this.createBullet();
    }

    // Deactivate bullet if it's off-screen
    // So it can be easily reused
    this.getChildren().forEach((bullet) => {
      if (bullet.x > this.camera.scrollX + internalWidth) {
        this.killAndHide(bullet);
      }
    })
  }
}