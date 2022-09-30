import Phaser from "phaser";
import PlayerBullets from "./PlayerBullets";

// I should probably make a basic Bullet class and 
// derive Player and Boss Bullets from that.
// Ehhhh maybe eventually

export default class BossBullets extends PlayerBullets {
  constructor(scene: Phaser.Scene) {
    super(scene, "enemybullet");

    this.bulletInterval = 800;
    this.bulletSpeed = 300
  }

   createBullet() {
    // don't call super, we use different logic here
    // you know in retrospect this shouldn't extend PlayerBullets at all huh
    if (this.xShootPos === null || this.yShootPos === null) return;

    // Make 12 bullets to spread in a circular direction

    for (let degrees = 90; degrees > -90; degrees -= 180 / 12) {
      const newBullet = this.get(this.xShootPos, this.yShootPos);
      newBullet.setScale(0.2);
      newBullet.active = true;
      newBullet.visible = true;
      this.scene.physics.add.existing(newBullet);

      const velX = Math.cos(Phaser.Math.DegToRad(degrees)) * -this.bulletSpeed;
      const velY = Math.sin(Phaser.Math.DegToRad(degrees)) * -this.bulletSpeed;
      newBullet.body.setVelocityX(velX);
      newBullet.body.setVelocityY(velY);
    }
  }

  update(delta: number) {
    super.update(delta);
  }
}