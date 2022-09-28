import Phaser from 'phaser';
import { internalWidth, internalHeight } from "../config";
import Player from "./objects/Player";
import Asteroids from "./objects/Asteroids";
import SwingingAsteroids from "./objects/SwingingAsteroids";
import PlayerBullets from "./objects/PlayerBullets";
import BasicEnemy from "./objects/BasicEnemy";

export default class Demo extends Phaser.Scene {
   player!: Player;
   playerBullets!: PlayerBullets;
   enemies!: Asteroids[];

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
    this.load.image("bullet", "assets/bullet.png")
  }

  create() {
    const bg = this.add.tileSprite(internalWidth / 2, internalHeight / 2, 3000, internalHeight, "bg");
    
    this.player = new Player(this, this.forwardSpeed);
    this.playerBullets = new PlayerBullets(this);
    this.player.setBulletManager(this.playerBullets);

    this.enemies = [];
    this.enemies.push(new Asteroids(this));
    this.enemies.push(new SwingingAsteroids(this));

    this.enemies.forEach((enemyType) => {
      this.physics.world.addOverlap(enemyType, this.player, () => {
        this.player.onOverlapWithEnemy()
      })

      this.physics.world.addOverlap(enemyType, this.playerBullets, (enemy, bullet) => {
        if (!(enemy instanceof BasicEnemy)) return;
        
        enemy.reduceLife();

        this.playerBullets.killAndHide(bullet);
        this.physics.world.remove(bullet.body);
      })
    })
  }

  update(time: number, delta: number) {
    // Note that time and delta are in miliseconds
    this.player.update();
    this.playerBullets.update(delta);

    this.enemies.forEach(enemyType => enemyType.update(time));

    this.cameras.main.scrollX += delta / 1000 * this.forwardSpeed;
  }
}
