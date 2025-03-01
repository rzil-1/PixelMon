export interface Pokemon {
   name: string;
   assetKey: string;
   currentHp: number;
   maxHp: number;
   attackIds: number[];
   baseAttack: number;
   type: string;
   level?: number; // Make this optional
   spriteKeyFront?: string; // Make this optional
   spriteKeyBack?: string; // Make this optional
   moves?:[]; // Make this optional
}

export interface BattlePokemonConfig {
   scene: Phaser.Scene;
   _pokemonDetails: Pokemon;
}

export interface Coordinate {
   x: number;
   y: number;
}

export interface Attack {
   id: number;
   name : string;
   animationName: string;
}
