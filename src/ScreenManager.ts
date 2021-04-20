import AssetManager from "./AssetManager";
import { ORIGINAL_SIZE, SCALE_X, SCALE_Y } from "./Constants";

export default class ScreenManager {

    private stage:createjs.StageGL;

    private introScreen:createjs.Container;
    private gameScreen:createjs.Container;
    private gameOverScreen:createjs.Container;

    private eventStartGame:createjs.Event;
    private eventResetGame:createjs.Event;
    private eventOverGame:createjs.Event;
    
    private Title:createjs.Sprite;
    private GameOverText:createjs.Sprite;
    private BackdropTitle:createjs.Sprite;
    private BackdropGame:createjs.Sprite;
    private BackdropOver:createjs.Sprite;

    private XScale:number;
    private YScale:number;

    
    constructor(stage:createjs.StageGL, assetManager:AssetManager) {
        this.stage = stage;

        this.introScreen = new createjs.Container();
        this.Title = assetManager.getSprite("assets", "Title", 25, 50);
        
        this.BackdropTitle  = assetManager.getSprite("assets", "Background");
        this.BackdropTitle.scaleX = SCALE_X;
        this.BackdropTitle.scaleY = SCALE_Y;
        this.introScreen.addChild(this.BackdropTitle);
        this.introScreen.addChild(this.Title);


        this.gameScreen = new createjs.Container();
        this.BackdropGame  = assetManager.getSprite("assets", "Background");
        this.BackdropGame.scaleX = SCALE_X;
        this.BackdropGame.scaleY = SCALE_Y;
        this.gameScreen.addChild(this.BackdropGame);


        this.gameOverScreen = new createjs.Container();
        this.BackdropOver  = assetManager.getSprite("assets", "Background");
        this.BackdropOver.scaleX = SCALE_X;
        this.BackdropOver.scaleY = SCALE_Y;
        this.GameOverText = assetManager.getSprite("assets", "GameOver", 25, 50);
        this.gameOverScreen.addChild(this.BackdropOver);
        this.gameOverScreen.addChild(this.GameOverText);

        this.eventResetGame = new createjs.Event("gameReset", true, false);
        this.eventStartGame = new createjs.Event("gameStart", true, false);
        
    }

    // -------------------------------------------------- public methods
    public showIntro():void {        
        // show the intro screen
        this.hideAll();
        console.log("Showing Intro");
        createjs.Sound.stop();
        this.stage.addChildAt(this.introScreen, 0);
        
        // detect click on the stage to remove intro screen and start the game
        this.stage.on("click", (e) => {
            this.stage.dispatchEvent(this.eventStartGame);
        }, this, true);        
    }
    
    public showGame():void {
        // show the game screen
        this.hideAll();
        createjs.Sound.play("Rumble", createjs.Sound.INTERRUPT_ANY, 0, 0, 99).volume = 0.05;
        this.stage.addChildAt(this.gameScreen, 0);
    }

    public showGameOver():void {
        // show the gameover screen
        this.hideAll();
        this.stage.addChildAt(this.gameOverScreen, 0);
        // detect click on the stage to remove gameover screen and return to intro screen
        this.stage.on("click", (e) => {
            this.stage.dispatchEvent(this.eventResetGame);
        }, this, true);        
    }


    private hideAll():void{
        this.stage.removeChild(this.introScreen);
        this.stage.removeChild(this.gameScreen);
        this.stage.removeChild(this.gameOverScreen);
    }

    public Update(){
        this.XScale = (3*(innerWidth/4))/ORIGINAL_SIZE;
        this.YScale = (3*(innerHeight/4))/ORIGINAL_SIZE;

        this.Title.scaleX = this.XScale;
        this.Title.scaleY = this.YScale;

        this.Title.x = (25)*this.XScale;
        this.Title.y = (50)*this.YScale;

        this.GameOverText.scaleX = this.XScale;
        this.GameOverText.scaleY = this.YScale;

        this.GameOverText.x = (25)*this.XScale;
        this.GameOverText.y = (50)*this.YScale;

        this.BackdropTitle.scaleX = this.XScale;
        this.BackdropTitle.scaleY = this.YScale;

        this.BackdropTitle.x = (0)*this.XScale;
        this.BackdropTitle.y = (0)*this.XScale;

        this.BackdropGame.scaleX = this.XScale;
        this.BackdropGame.scaleY = this.YScale;

        this.BackdropGame.x = (0)*this.XScale;
        this.BackdropGame.y = (0)*this.XScale;

        this.BackdropOver.scaleX = this.XScale;
        this.BackdropOver.scaleY = this.YScale;

        this.BackdropOver.x = (0)*this.XScale;
        this.BackdropOver.y = (0)*this.XScale;
    }

}