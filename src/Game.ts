// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";
// importing game constants
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE, ASSET_MANIFEST, SCALE_X, SCALE_Y, ORIGINAL_SIZE } from "./Constants";
import AssetManager from "./AssetManager";
import TurnManager from "./TurnManager";
import ScreenManager from "./ScreenManager";

// game variables
let stage:createjs.StageGL;
let canvas:HTMLCanvasElement;
// assetmanager object
let assetManager:AssetManager;

let background:createjs.Sprite;

let turnManager:TurnManager;
let screen:ScreenManager;


// --------------------------------------------------- event handlers
function onReady(e:createjs.Event):void {
    console.log(">> adding sprites to game");

    // construct game objects/sprites
    // ...

    background = assetManager.getSprite("assets", "Background");
    background.scaleX = SCALE_X;
    background.scaleY = SCALE_Y;
    //stage.addChild(background);
    screen = new ScreenManager(stage, assetManager);
    screen.showIntro();

    //Manages the turns in the combat system and creates the actors in the combat system
    turnManager = new TurnManager(stage, assetManager);
    turnManager.PlayGame(false);

    
    



    // startup the ticker
    createjs.Ticker.framerate = FRAME_RATE;
    createjs.Ticker.on("tick", onTick);   
    stage.on("gameStart", PlayGame); 
    stage.on("gameReset", GameReset);
    stage.on("gameOver", GameOver);  
    console.log(">> game ready");
}

function PlayGame(e:createjs.Event):void{
    turnManager.PlayGame(true);
    screen.showGame();
}

function GameOver():void{
    turnManager.PlayGame(false);
    screen.showGameOver();
}

function GameReset(e:createjs.Event):void{
    turnManager.PlayGame(false);
    screen.showIntro();
}

function onTick(e:createjs.Event):void {
    // TESTING FPS
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());

    ResizeStage();
    //Manages the actors in the combat system
    turnManager.Update();
    screen.Update();
    

    // update the stage!
    stage.update();
}

function ResizeStage():void{
    background.scaleX = (3*(innerWidth/4))/ORIGINAL_SIZE;
    background.scaleY = (3*(innerHeight/4))/ORIGINAL_SIZE;;
    canvas.width = 3*(innerWidth/4);
    canvas.height = 3*(innerHeight/4);
}

// --------------------------------------------------- main method
function main():void {
    console.log(">> initializing");

    // get reference to canvas
    canvas = <HTMLCanvasElement> document.getElementById("game-canvas");
    // set canvas width and height - this will be the stage size
    canvas.width = STAGE_WIDTH;
    canvas.height = STAGE_HEIGHT;

    // create stage object
    stage = new createjs.StageGL(canvas, { antialias: true });

    // AssetManager setup
    assetManager = new AssetManager(stage);
    stage.on("allAssetsLoaded", onReady, null, true);
    // load the assets
    assetManager.loadAssets(ASSET_MANIFEST);
}

main();