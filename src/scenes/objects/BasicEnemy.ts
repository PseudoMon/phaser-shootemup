import Phaser from "phaser";

/*  BasicEnemy is just a Sprite with lives attached.
    You can probably make the initial life into a parameter, to facilitate
    multiple different kinds of enemies.
*/

export default class BasicEnemy extends Phaser.GameObjects.Sprite {
  initialLives: number;
  currentLives: number;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, initialLives: number = 20) {
    super(scene, x, y, texture);
    this.initialLives = initialLives;
    this.currentLives = this.initialLives; 
    scene.add.existing(this)

    this.setInteractive();
    this.on("pointerdown", () => console.log(this))
  }

  get isAlive(): boolean {
    return this.currentLives > 0;
  }

  reduceLife(livesToReduce: number = 1) {
    this.currentLives -= livesToReduce;
    if (this.currentLives <= 0) {
      this.killAndHide()
    }
  }

  reset() {
    // Reset lives
    this.currentLives = this.initialLives;
  }

  killAndHide() {
    this.active = false;
    this.visible = false;
    this.scene.physics.world.remove(this.body);
  }
}