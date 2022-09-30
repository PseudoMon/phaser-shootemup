import Phaser from "phaser";
import BasicEnemy from "./BasicEnemy";
import Player from "./Player";
import BossBullets from "./BossBullets";
import { internalWidth } from "../../config";

export default class BossEnemy extends BasicEnemy {
  // Boss enemy that, once spawned, will stay at some specific x 
  // in front of the screen. No vertical movement please thank you.
  // Will periodically fire bullet (circular spread bullets? weee).
  player: Player;
  distanceFromRightCamera: number;
  declare body: Phaser.Physics.Arcade.Body;
  bulletManager: BossBullets;

  constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
    super(scene, x, y, "enemyboss", 9001);
    this.setScale(0.5);
    this.setRotation(Phaser.Math.DegToRad(270));

    this.player = player;
    this.distanceFromRightCamera = 200;
    this.bulletManager = new BossBullets(scene);
  }

  update(delta: number) {
    const camera = this.scene.cameras.main;
    const targetX = camera.scrollX + internalWidth - this.distanceFromRightCamera;

    // Always shooting
    this.bulletManager.setShootPosition(this.x, this.y);
    this.bulletManager.update(delta);

    if (this.x > targetX) {
      this.body.setVelocityX(-80)
    }
    else if (this.x <= targetX) {
      this.body.setVelocityX(50)
    }
  }
}