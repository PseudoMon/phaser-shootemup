import Phaser from 'phaser';

export const internalWidth: number = 640;
export const internalHeight: number = 360;

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#33A5E7',
  width: internalWidth,
  height: internalHeight,
  scale: {
    width: internalWidth,
    height: internalHeight,
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: "arcade",
    arcade: { debug: true },
  }
};

