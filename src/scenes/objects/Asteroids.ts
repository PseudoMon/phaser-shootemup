import Phaser from "phaser";
import BasicEnemies from "./BasicEnemies";

export default class Asteroid extends BasicEnemies {
  constructor(scene: Phaser.Scene) {
    super(scene, "asteroid1");
  } 

  spawn() {
    super.spawn();
    const newAsteroid = this.getLast(true); // Get newly created enemy
    const newRotation: number = Phaser.Math.Between(0, Phaser.Math.PI2);
    newAsteroid.setRotation(newRotation);
  }
}