import Phaser from "phaser";
import Asteroids from "./Asteroids";
import { internalWidth, internalHeight } from "../../config"


export default class SwingingAsteroids extends Asteroids {
  // These are basically Asteroids that can randomly move vertically
  speed: number;

  constructor(scene: Phaser.Scene) {
    super(scene);
    this.initialLives = 1000;
    this.timeDeltaSpawn = 4000;
    this.speed = 100
  }

  spawn() {
    super.spawn();
    const newAsteroid = this.getLast(true);

    newAsteroid.body.setVelocityY(-this.speed);
    newAsteroid.body.setVelocityX(-this.speed / 2);

    this.scene.tweens.add({
      targets: newAsteroid,
      repeat: -1,
      rotation: Phaser.Math.PI2,
      duration: 10000,
    })
  }

  update(time: number) {
    super.update(time);

    this.getChildren().forEach((asteroid) => {
      if (!isSprite(asteroid)) return;
      
      if (asteroid.y < this.camera.scrollY + asteroid.height) {
        asteroid.body.setVelocityY(this.speed);
        // asteroid.body.setVelocityX(
        //   Phaser.Math.RND.pick([this.speed / 2, -this.speed / 2])
        // );
      }
      else if (asteroid.y > internalHeight - asteroid.height) {
        asteroid.body.setVelocityY(-this.speed);
        // asteroid.body.setVelocityX(
        //   Phaser.Math.RND.pick([this.speed / 2, -this.speed / 2])
        // );
      }
    })
  }
}

function isSprite(
  objToTest: Phaser.GameObjects.GameObject
): objToTest is Phaser.GameObjects.Sprite {
  return objToTest instanceof Phaser.GameObjects.Sprite 
}