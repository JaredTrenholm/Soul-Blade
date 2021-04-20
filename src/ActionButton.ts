import Actors from "./Actors";
import AssetManager from "./AssetManager";
import { ORIGINAL_SIZE } from "./Constants";
import Player from "./Player";

export default class ActionButton{



    public choice:number = 0; // 0 = attack, 1 = heal, 2 = counter, 3 = block

    public acted:boolean = false;
    private stage:createjs.StageGL;
    private assetManager:AssetManager;
    private player:Player;

    private XScale:number;
    private YScale:number;

    private attackSprite:createjs.Sprite;
    private healSprite:createjs.Sprite;
    private counterSprite:createjs.Sprite;
    private defendSprite:createjs.Sprite;
    constructor(stage:createjs.StageGL, assetManager:AssetManager,player:Player){

        this.stage = stage;
        this.assetManager = assetManager;
        this.player = player;

        this.attackSprite = assetManager.getSprite("assets", "buttonAttack");
        this.Position(25,75,this.attackSprite);
        this.stage.addChild(this.attackSprite);

        this.attackSprite.on("click", (e:createjs.Event) =>{
        this.choice = 0;
        this.acted = true;            
            }, this);

            this.healSprite = assetManager.getSprite("assets", "buttonHeal");
        this.Position(75,75,this.healSprite);
        this.stage.addChild(this.healSprite);

        this.healSprite.on("click", (e:createjs.Event) =>{
        this.choice = 1;
        this.acted = true;            
            }, this);


            this.counterSprite = assetManager.getSprite("assets", "buttonCounter");
        this.Position(125,75,this.counterSprite);
        this.stage.addChild(this.counterSprite);

        this.counterSprite.on("click", (e:createjs.Event) =>{
        this.choice = 2;
        this.acted = true;            
            }, this);


            this.defendSprite = assetManager.getSprite("assets", "buttonBlock");
        this.Position(65,100,this.defendSprite);
        this.stage.addChild(this.defendSprite);

        this.defendSprite.on("click", (e:createjs.Event) =>{
        this.choice = 3;
        this.acted = true;            
            }, this);


    }

    public Position(x:number, y:number, sprite:createjs.Sprite){
        this.XScale = (3*(innerWidth/4))/ORIGINAL_SIZE;
        this.YScale = (3*(innerHeight/4))/ORIGINAL_SIZE;
        sprite.x = (x)*this.XScale;
        sprite.y = (y)*this.YScale;
        this.XScale = (2*(innerWidth/4))/ORIGINAL_SIZE;
        this.YScale = (2*(innerHeight/4))/ORIGINAL_SIZE;
        sprite.scaleX = this.XScale;
        sprite.scaleY = this.YScale;
    }

    public Update():void{
        this.Position(25,75,this.attackSprite);
        this.Position(75,75,this.healSprite);
        this.Position(125,75,this.counterSprite);
        this.Position(65,100,this.defendSprite);
    }

    public HideMe():void{
        this.stage.removeChild(this.attackSprite);
        this.stage.removeChild(this.healSprite);
        this.stage.removeChild(this.counterSprite);
        this.stage.removeChild(this.defendSprite);
    }
    public ShowMe():void{
        this.stage.addChild(this.attackSprite);
        this.stage.addChild(this.healSprite);
        this.stage.addChild(this.counterSprite);
        this.stage.addChild(this.defendSprite);
    }
}