import AssetManager from "./AssetManager";
import { MAXHEALTH, ORIGINAL_SIZE, SCALE_X, SCALE_Y } from "./Constants";

export default class Actors {
    private static STATE_IDLE:number = 1;

    
    private _sprite:createjs.Sprite;
    private _state:number;
    private stage:createjs.StageGL;

    protected defense:number;

    private XScale:number;
    private YScale:number;

    private _health:number;

    private _attack:number;

    private animation:string;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, animation:string){
    
        this._sprite = assetManager.getSprite("assets", animation);
        this._sprite.gotoAndPlay(animation);
        this._state = Actors.STATE_IDLE;
        this.stage = stage;

        this._health = MAXHEALTH;

        this.animation = animation;

        this._attack = 26;
        this.defense = 1;


        this.XScale = (3*(innerWidth/4))/ORIGINAL_SIZE;
        this.YScale = (3*(innerHeight/4))/ORIGINAL_SIZE;

        this._sprite.scaleX = this.XScale;
        this._sprite.scaleY = this.YScale;

    }

    public Reset(newAnimation:string):void{
        this._health = MAXHEALTH;
        this._sprite.gotoAndPlay(newAnimation);
        this._state = Actors.STATE_IDLE;
        
    }

    public Visibility(value:boolean):void{
        if(value == true){
            this.stage.addChild(this._sprite);
            console.log("VISIBLE");
        } else {
            this.stage.removeChild(this._sprite);
        }
    }

    public get attack():number{
        return this._attack;
    }
    public set attack(value:number){
        this._attack = value;
    }

    public Position(x:number, y:number){
        this.XScale = (3*(innerWidth/4))/ORIGINAL_SIZE;
        this.YScale = (3*(innerHeight/4))/ORIGINAL_SIZE;
        this.sprite.x = (x)*this.XScale;
        this.sprite.y = (y)*this.YScale;

        
    }

    public Update(){
        this.XScale = (3*(innerWidth/4))/ORIGINAL_SIZE;
        this.YScale = (3*(innerHeight/4))/ORIGINAL_SIZE;

        this._sprite.scaleX = this.XScale;
        this._sprite.scaleY = this.YScale;


    }

    get sprite(){

        return this._sprite;
    }

    get health(){
        return this._health;
    }

    get Stage(){
        return this.stage;
    }


    set health(value:number){
        this._health = value;
    }

    

    public TakeDamage(damage:number):void{
        this._health = this._health - (damage/this.defense);

        if(this._health < 0){
            this._health = 0;
        }
    }

    public Heal(heal:number):void{
        this._health = this._health + heal;

        if(this._health > MAXHEALTH){
            this._health = MAXHEALTH;
        }
    }
}