import Phaser from "phaser";

export default class PlayerBullets extends Phaser.GameObjects.Group {
  // Interval between created bullets in milliseconds
  bulletInterval: number;
  msSinceLastBullet: number;

  // Where to create the bullets
  // If they're null, don't shoot
  xShootPos: number | null; 
  yShootPos: number | null;

  constructor(scene: Phaser.Scene) {
    super(scene, {
      defaultKey: "bullets"
    });
    scene.add.existing(this);

    this.scene = scene;
    this.bulletInterval = 100;
    this.msSinceLastBullet = 0;

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
    this.scene.physics.add.existing(newBullet);
    newBullet.body.setVelocityX(500)
  }

  update(delta: number) {
    this.createBullet();
  }
}