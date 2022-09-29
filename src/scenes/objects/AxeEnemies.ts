import Phaser from "phaser";
import BasicEnemies from "./BasicEnemies";

export default class AxeEnemies extends BasicEnemies { 
   constructor(scene) {
     super(scene, "enemyaxe");
   }
}