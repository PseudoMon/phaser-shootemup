import Phaser from "phaser";
import BasicEnemy from "./BasicEnemy";
import { internalWidth } from "../../config"

export default class AxeEnemy extends BasicEnemy {
  // This enemy stands still for a while, but rotate to home in
  // on player. It then locks in and launches itself towards the player
  isLaunchingItself: boolean;
  lockedInVelocity: [number, number] | null;

  launchingCutoff: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "enemyaxe");

    this.isLaunchingItself = false;
    this.lockedInVelocity = null;
    this.launchingCutoff = 80;
  }

  rotateTowards(targetx: number, targety: number) {
    const angleInRad = Math.atan2(this.y - targety, this.x - targetx)
    this.setRotation(angleInRad + Phaser.Math.DegToRad(270))
  }  

  lockInIfInPosition(targetx: number, targety: number) {
    const camera = this.scene.cameras.main
    if (this.x <= camera.scrollX + internalWidth - this.launchingCutoff) {
      this.isLaunchingItself = true;
      this.lockedInVelocity = [(targetx - this.x) * 0.8, (targety - this.y) * 0.8];
    }
  }

  launch() {
    if (!this.lockedInVelocity) return // You shouldn't be here...
    if (!(this.body instanceof Phaser.Physics.Arcade.Body)) return;
    
    const [targetx, targety] = this.lockedInVelocity;
    this.body.setVelocityX(targetx);
    this.body.setVelocityY(targety);
  }
}