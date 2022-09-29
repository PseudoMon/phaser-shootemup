import Phaser from "phaser";
import BasicEnemy from "./BasicEnemy";
import Player from "./Player";
import { internalWidth } from "../../config";

export default class BossEnemy extends BasicEnemy {
  // Boss enemy that, once spawned, will stay at some specific x
  // in front of the player 
  player: Player;
  distanceFromPlayer: number;

  constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
    super(scene, x, y, "enemyboss");
    this.setScale(0.5);

    this.player = player;
    this.distanceFromPlayer = internalWidth - 200;
  }

  update() {
    this.setX(this.player.x + this.distanceFromPlayer)
  }
}