import Phaser from "phaser";
import { internalWidth, internalHeight } from "../../config"

export interface AsteroidsType extends Phaser.GameObjects.Group {
  spawn: (currentScrollX: number, currentScrollY: number) => void;
  update: (time: number) => void;
}

export default class Asteroids extends Phaser.GameObjects.Group {
  scene: Phaser.Scene;
  camera: Phaser.Cameras.Scene2D.Camera;
  timeToNextSpawn: number;

  constructor(scene: Phaser.Scene) {
    super(scene, {
      defaultKey: "asteroid1",
    })
    scene.add.existing(this)

    this.scene = scene;
    this.camera = scene.cameras.main;

    this.timeToNextSpawn = 20
  }

  spawn(n: number = 1) {
    console.log("Spawning?")
    // Spawn randomly somewhere in the next screen width
    const xpos =  this.camera.scrollX + internalWidth + Phaser.Math.Between(30, 40);
    const ypos = Phaser.Math.Between(0, internalHeight);

    for (let i = 0; i < n; i++) {
      const newAsteroid = this.get(xpos, ypos);
    }
  }

  update(time: number) {
    if (time >= this.timeToNextSpawn) {
      this.spawn()
      this.timeToNextSpawn = time + 1000 
    }
  }
}