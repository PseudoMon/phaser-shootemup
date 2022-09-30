import Phaser from "phaser";
import Player from "./Player";
import BossEnemy from "./BossEnemy";
import BasicEnemies from "./BasicEnemies";
import { internalWidth, internalHeight } from "../../config";

// There should normally only be one enemy here
// Not sure if I should even use Group for this, but the boilerplate is there so

export default class BossEnemies extends BasicEnemies {
  player: Player;

  constructor(scene: Phaser.Scene, player: Player) {
    super(scene, "enemyboss", BossEnemy);
    this.player = player;
  }

  spawn() {
    // custom spawn, so don't call super.spawn here
    const xpos =  this.camera.scrollX + internalWidth + 40;
    const ypos = internalHeight / 2;
    let newEnemy = this.getFirstDead();
    if (!newEnemy) {
      newEnemy = new BossEnemy(this.scene, xpos, ypos, this.player);
      this.add(newEnemy);
    }
    else {
      newEnemy.setPosition(xpos, ypos);
      newEnemy.reset();
    }

    this.scene.physics.add.existing(newEnemy);

    newEnemy.active = true;
    newEnemy.visible = true;
  }

  update(time: number, delta: number) {
    super.update(time);
    this.getChildren().forEach(child => child.update(delta))
  }
}