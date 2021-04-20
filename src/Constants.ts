// game constants
export const STAGE_WIDTH:number = 3*(innerWidth/4);
export const STAGE_HEIGHT:number = 3*(innerHeight/4);

//export const STAGE_WIDTH:number = 200;
//export const STAGE_HEIGHT:number = 200;

export const FRAME_RATE:number = 30;
export const ORIGINAL_SIZE:number = 200;
export const SCALE_X:number = STAGE_WIDTH/ORIGINAL_SIZE;
export const SCALE_Y:number = STAGE_HEIGHT/ORIGINAL_SIZE;

export const MAXHEALTH:number = 100;

//export const SCALE_X:number = 1;
//export const SCALE_Y:number = 1;

export const ASSET_MANIFEST:Object[] = [
    {
        type:"json",
        src:"./lib/spritesheets/assets.json",
        id:"assets",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/assets.png",
        id:"assets",
        data:0
    },
    {
        type:"json",
        src:"./lib/spritesheets/glyphs.json",
        id:"glyphs",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/glyphs.png",
        id:"glyphs",
        data:0
    },
    {
        type:"sound",
        src:"./lib/sounds/Rumble.ogg",
        id:"Rumble",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/Attack.ogg",
        id:"Attack",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/Block.ogg",
        id:"Block",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/Heal.ogg",
        id:"Heal",
        data:4
    }         
];
