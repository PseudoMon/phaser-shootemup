import Phaser from 'phaser';
import { internalWidth, internalHeight } from "../config";

export default class Demo extends Phaser.Scene {
   player!: Phaser.GameObjects.Sprite;
   forwardSpeed: number;

  constructor() {
    super('GameScene');
    this.player;
    this.forwardSpeed = 50;
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.image("bg", "assets/bg.png")
    this.load.image("player", "assets/player.png")
  }

  create() {
    const bg = this.add.tileSprite(internalWidth / 2, internalHeight / 2, 3000, internalHeight, "bg");
    const player = this.make.sprite({
      x: 100,
      y: internalHeight / 2, 
      key: "player",
      scale: { x: 0.1, y: 0.1 },
      angle: 90,
    }); 
    this.player = player;

    this.physics.add.existing(player);
    player.body.setSize(player.width / 2, player.height / 2);

    const upKey = this.input.keyboard.addKey("W");
    const downKey = this.input.keyboard.addKey("S");
    this.upKey = upKey;
    this.downKey = downKey;

    this.player.body.setVelocityX(this.forwardSpeed)
  }

  update(time: number, delta: number) {
    // Note that time and delta are in miliseconds
    const playerSpeed = 200

    if (this.upKey.isDown) {
      this.player.body.setVelocityY(-playerSpeed)
    }
    else if (this.downKey.isDown) {
      this.player.body.setVelocityY(playerSpeed)
    }
    else {
      this.player.body.setVelocityY(0)
    }

    this.cameras.main.scrollX += delta / 1000 * this.forwardSpeed;
  }
}
