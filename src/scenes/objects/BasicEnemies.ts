import Phaser from "phaser";
import BasicEnemy from "./BasicEnemy"
import { internalWidth, internalHeight } from "../../config"

export default class  BasicEnemies extends Phaser.GameObjects.Group {
  scene: Phaser.Scene;
  camera: Phaser.Cameras.Scene2D.Camera;

  spawnWithTime: boolean;
  timeToNextSpawn: number;
  timeDeltaSpawn: number;
  initialLives: number;

  constructor(scene: Phaser.Scene, textureKey: string, classType: any = BasicEnemy) {
    super(scene, {
      defaultKey: textureKey,
      classType: classType,
    })
    scene.add.existing(this)

    this.scene = scene;
    this.camera = scene.cameras.main;

    this.spawnWithTime = false;
    this.timeToNextSpawn = 20;
    this.timeDeltaSpawn = 1000;

    this.initialLives = 50;
  }

  spawn(n: number = 1) {
    // Spawn randomly somewhere outside of the camera range
    const xpos =  this.camera.scrollX + internalWidth + Phaser.Math.Between(30, 40);
    const ypos = Phaser.Math.Between(0, internalHeight);

    for (let i = 0; i < n; i++) {
      let newEnemy = this.getFirstDead();
      if (!newEnemy) {
        // Yes there's a typescript error but it still works so idk why
        newEnemy = new this.classType(this.scene, xpos, ypos, this.defaultKey, this.initialLives);
        this.add(newEnemy)
      }
      else {
        // Reset lives etc for reused enemy
        newEnemy.reset();
      }

      newEnemy.setPosition(xpos, ypos);
      //newEnemy.setRotation(Phaser.Math.Between(0, Phaser.Math.PI2))
      
      this.scene.physics.add.existing(newEnemy);

      newEnemy.active = true;
      newEnemy.visible = true;
    }
  }

  update(time: number) {
    if (this.spawnWithTime) {
      // Spawn every relevant time
      if (time >= this.timeToNextSpawn) {
        this.spawn()
        this.timeToNextSpawn = time + this.timeDeltaSpawn;
      }
    }

    // Check if enemy is safely outside of the viewing frame
    // Disable it so it can be reused
    this.getChildren().forEach((enemy) => {
      if (!(enemy instanceof BasicEnemy)) return; // Typeguard
      if (!enemy.active) return;

      if (
        enemy.x + enemy.width < this.camera.scrollX  
      ) {
        enemy.active = false;
        enemy.visible = false;
      }
    })
  }
}