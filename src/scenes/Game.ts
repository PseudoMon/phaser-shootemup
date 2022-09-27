import Phaser from 'phaser';
import { internalWidth, internalHeight } from "../config";
import Player from "./objects/Player";
import Asteroids from "./objects/Asteroids";
import SwingingAsteroids from "./objects/SwingingAsteroids";

export default class Demo extends Phaser.Scene {
   player!: Player;
   asteroids!: Asteroids;
   swingingAsteroids!: SwingingAsteroids;
   forwardSpeed: number;

  constructor() {
    super('GameScene');
    this.player;
    this.forwardSpeed = 50;
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.image("bg", "assets/bg.png");
    this.load.image("player", "assets/player.png");
    this.load.image("asteroid1", "assets/asteroid1.png");
  }

  create() {
    const bg = this.add.tileSprite(internalWidth / 2, internalHeight / 2, 3000, internalHeight, "bg");
    this.player = new Player(this, this.forwardSpeed);
    this.asteroids = new Asteroids(this);
    this.swingingAsteroids = new SwingingAsteroids(this)

    this.physics.world.addOverlap(this.player, this.asteroids, () => {
      this.player.onOverlapWithEnemy()
    })
  }

  update(time: number, delta: number) {
    // Note that time and delta are in miliseconds
    this.player.update();
    this.asteroids.update(time);
    this.swingingAsteroids.update(time);
    this.cameras.main.scrollX += delta / 1000 * this.forwardSpeed;
  }
}
