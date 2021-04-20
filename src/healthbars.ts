import Actors from "./Actors";
import AssetManager from "./AssetManager";
import { ORIGINAL_SIZE } from "./Constants";

export default class healthbars{

    private _sprite:createjs.Sprite;
    private stage:createjs.StageGL;

    private XScale:number;
    private YScale:number;

    private x:number;
    private y:number;

    private assetManager:AssetManager;

    private actor:Actors;
    private HealthCounter:createjs.BitmapText;



    constructor(stage:createjs.StageGL, assetManager:AssetManager, animation:string, actor:Actors, x:number, y:number){
    
        this._sprite = assetManager.getSprite("assets", animation);
        this.stage = stage;

        this.actor = actor;
        this.HealthCounter = new createjs.BitmapText("100", assetManager.getSpriteSheet("glyphs"));
        this.HealthCounter.letterSpacing = 2;

        this.Position(x,y);
        this.x = x;
        this.y = y;

        this.assetManager = assetManager;
        
        this.XScale = (2*(innerWidth/4))/ORIGINAL_SIZE;
        this.YScale = (2*(innerHeight/4))/ORIGINAL_SIZE;

        this._sprite.scaleX = this.XScale;
        this._sprite.scaleY = this.YScale;

        this.Visibility(true);
        
        this._sprite.play();

        
        
    }

    public Position(x:number, y:number){
        this.XScale = (2*(innerWidth/4))/ORIGINAL_SIZE;
        this.YScale = (2*(innerHeight/4))/ORIGINAL_SIZE;

        let width = this.sprite.getBounds().width*this.XScale;
        let height = this.sprite.getBounds().height*this.YScale;
        this.sprite.x = (x)*this.XScale;
        this.sprite.y = (y)*this.YScale;
        this.HealthCounter.x = ((x)*this.XScale) + (width/3);
        this.HealthCounter.y = ((y)*this.YScale) + (height/3);

    }

    get sprite(){

        return this._sprite;
    }

    public Visibility(value:boolean):void{
        if(value == true){
            this.stage.addChild(this._sprite);
            this.stage.addChild(this.HealthCounter);
        } else {
            this.stage.removeChild(this._sprite);
            this.stage.removeChild(this.HealthCounter);
        }
    }

    public Update(){
        this.DetectHealth();
        this.XScale = (2*(innerWidth/4))/ORIGINAL_SIZE;
        this.YScale = (2*(innerHeight/4))/ORIGINAL_SIZE;

        this._sprite.scaleX = this.XScale;
        this._sprite.scaleY = this.YScale;
        this.DetectHealth();

        this.Position(this.x, this.y);
        this.HealthCounter.text = String(Math.round(this.actor.health));
    }

    public DetectHealth():void{
        if(this.actor.health < 1){
            this.sprite.gotoAndPlay("Health0");
        } else if(this.actor.health < 25){
            this.sprite.gotoAndPlay("Health25");
        }
        else if(this.actor.health < 50){
            this.sprite.gotoAndPlay("Health50");
        }
        else if(this.actor.health < 75){
            this.sprite.gotoAndPlay("Health75");
        }
        else if(this.actor.health < 100){
            this.sprite.gotoAndPlay("Health100");
        }
        
    }

    public Reset(){
        this.sprite.gotoAndPlay("Health100");
    }
}