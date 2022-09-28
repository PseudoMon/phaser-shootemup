import Phaser from "phaser";
import BasicEnemy from "./BasicEnemy"
import { internalWidth, internalHeight } from "../../config"

// TODO uses BasicEnemies instead

export default class Asteroids extends Phaser.GameObjects.Group {
  scene: Phaser.Scene;
  camera: Phaser.Cameras.Scene2D.Camera;
  timeToNextSpawn: number;
  timeDeltaSpawn: number;
  initialLives: number;

  constructor(scene: Phaser.Scene) {
    super(scene, {
      defaultKey: "asteroid1",
      classType: BasicEnemy,
    })
    scene.add.existing(this)

    this.scene = scene;
    this.camera = scene.cameras.main;

    this.timeToNextSpawn = 20;
    this.timeDeltaSpawn = 1000;

    this.initialLives = 50;
  }

  spawn(n: number = 1) {
    // Spawn randomly somewhere outside of the camera range
    const xpos =  this.camera.scrollX + internalWidth + Phaser.Math.Between(30, 40);
    const ypos = Phaser.Math.Between(0, internalHeight);

    for (let i = 0; i < n; i++) {
      //const newAsteroid = this.get(xpos, ypos);
      let newAsteroid = this.getFirstDead();
      if (!newAsteroid) {
        newAsteroid = new BasicEnemy(this.scene, xpos, ypos, this.defaultKey, this.initialLives);
        this.add(newAsteroid)
      }
      
      newAsteroid.setPosition(xpos, ypos);
      newAsteroid.setRotation(Phaser.Math.Between(0, Phaser.Math.PI2))
      
      this.scene.physics.add.existing(newAsteroid);

      newAsteroid.active = true;
      newAsteroid.visible = true;
    }
  }

  update(time: number) {
    if (time >= this.timeToNextSpawn) {
      this.spawn()
      this.timeToNextSpawn = time + this.timeDeltaSpawn;
    }

    this.getChildren().forEach((asteroid) => {
      if (!isSprite(asteroid)) return; // Typeguard
      if (!asteroid.active) return;

      if (
        asteroid.x + asteroid.width < this.camera.scrollX  
      ) {
        asteroid.active = false;
        asteroid.visible = false;
      }
    })

    
  }
}

function isSprite(
  objToTest: Phaser.GameObjects.GameObject
): objToTest is Phaser.GameObjects.Sprite {
  return objToTest instanceof Phaser.GameObjects.Sprite 
}

