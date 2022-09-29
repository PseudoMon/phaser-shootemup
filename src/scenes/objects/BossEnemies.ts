import Phaser from "phaser";
import BossEnemy from "./BossEnemy";
import BasicEnemies from "./BasicEnemies";

// There should normally only be one enemy here
// Not sure if I should even use Group for this, but the boilerplate is there so

export default class BossEnemies extends BasicEnemies {
  constructor(scene: Phaser.Scene) {
    super(scene, "enemyboss", BossEnemy);
  }

  spawn() {
    // custom spawn, so don't call super.spawn here
    // TODO
  }
}