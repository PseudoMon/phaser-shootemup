import Phaser from 'phaser';
import { internalWidth, internalHeight } from "../config";
import Backgrounds from "./objects/Backgrounds";
import Player from "./objects/Player";
import BasicEnemies from "./objects/BasicEnemies";
import Asteroids from "./objects/Asteroids";
import SwingingAsteroids from "./objects/SwingingAsteroids";
import PlayerBullets from "./objects/PlayerBullets";
import BasicEnemy from "./objects/BasicEnemy";
import HomingEnemies from "./objects/HomingEnemies";
import AxeEnemies from "./objects/AxeEnemies";
import BossEnemies from "./objects/BossEnemies";

export default class Demo extends Phaser.Scene {
   bgContainer!: Phaser.GameObjects.Group;
   player!: Player;
   playerBullets!: PlayerBullets;
   enemies!: (BasicEnemies | BossEnemies)[];
   bossEnemies!: BossEnemies;

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
    this.load.image("bullet", "assets/bullet.png");
    this.load.image("enemy3b", "assets/enemy3b.png");
    this.load.image("enemyaxe", "assets/enemyaxe.png");
    this.load.image("enemyboss", "assets/enemyboss.png");
    this.load.image("enemybullet", "assets/enemybullet.png");
  }

  create() {
    this.bgContainer = new Backgrounds(this);

    this.player = new Player(this, this.forwardSpeed);
    this.playerBullets = new PlayerBullets(this);
    this.player.setBulletManager(this.playerBullets);

    this.enemies = [];
    this.bossEnemies = new BossEnemies(this, this.player);
    this.enemies.push(new Asteroids(this));
    this.enemies.push(new SwingingAsteroids(this));
    this.enemies.push(new HomingEnemies(this, this.player));
    this.enemies.push(new AxeEnemies(this, this.player));
    this.enemies.push(this.bossEnemies);

    // Add collider for each enemy with player and player's bullets
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

    // Debug helpers
    const keys = ["ONE", "TWO", "THREE", "FOUR", "FIVE"];
    this.enemies.forEach((enemyType, idx) => {
      this.input.keyboard.addKey(keys[idx]).on("down", () => {
        console.log("Spawning enemy",  idx);
        enemyType.spawn();
      })
    })
  }

  update(time: number, delta: number) {
    // Note that time and delta are in miliseconds
    this.bgContainer.update();
    this.player.update();
    this.playerBullets.update(delta);

    this.enemies.forEach(enemyType => enemyType.update(time, delta));

    this.cameras.main.scrollX += delta / 1000 * this.forwardSpeed;
  }
}
