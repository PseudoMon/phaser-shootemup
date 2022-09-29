import Phaser from "phaser";
import BasicEnemy from "./BasicEnemy";
import BasicEnemies from "./BasicEnemies";
import Player from "./Player";
import AxeEnemy from "./AxeEnemy";

export default class AxeEnemies extends BasicEnemies { 
  player: Player;

  constructor(scene: Phaser.Scene, player: Player) {
    super(scene, "enemyaxe", AxeEnemy);
    this.spawnWithTime = false;
    this.player = player;
  }
  
  moveMembers() {
    this.getChildren().forEach((enemy) => {
      if (!(enemy instanceof AxeEnemy)) return;
      
      if (!enemy.isLaunchingItself) {
        enemy.rotateTowards(this.player.x, this.player.y);
        enemy.lockInIfInPosition(this.player.x, this.player.y);
      }

      else {
        enemy.launch();
      }
    })
  }

  update(time: number) {
    super.update(time);

    this.moveMembers();
  }
}