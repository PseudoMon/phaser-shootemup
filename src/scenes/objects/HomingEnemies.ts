import Phaser from "phaser";
import type Player from "./Player";
import BasicEnemy from "./BasicEnemy";
import BasicEnemies from "./BasicEnemies";

export default class HomingEnemies extends BasicEnemies {
  player: Player;

  constructor(scene: Phaser.Scene, player: Player) {
    super(scene, "enemy3b");

    this.timeToNextSpawn = 4000;
    this.timeDeltaSpawn = 9000;
    this.initialLives = 280;

    this.player = player
  }

  spawn() {
    super.spawn();
    const newEnemy = this.getLast(true);
    newEnemy.setRotation(Phaser.Math.DegToRad(270));
    newEnemy.setScale(0.15)  
  } 

  update(time: number) {
    super.update(time);

    this.getChildren().forEach(enemy => {
      // TODO: Typeguarding 

      if (enemy.y < this.player.y - 2) {
        enemy.body.setVelocityY(120)
        enemy.body.setAccelerationY(15)
      }
      else if (enemy.y > this.player.y + 2) {
        enemy.body.setVelocityY(-120)
        enemy.body.setAccelerationY(-15)
      }
      else {
        enemy.body.setVelocityY(0)
      }
    })
  }
}