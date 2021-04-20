import Actors from "./Actors";
import AssetManager from "./AssetManager";

export default class Player extends Actors{

    public choice:number = 0;
    constructor(stage:createjs.StageGL, assetManager:AssetManager,){
        //basic player setup
        super(stage, assetManager, "PlayerIdle");

        this.Position(1,135);
        this.Visibility(true);
        this.choice = 0;
        console.log("Player Done.")

}
public Update():void{
    super.Update();
    this.Position(1,135);


    //makes it so if the player faded out, it comes back
    if(this.health <= 0){
        this.sprite.alpha = this.sprite.alpha + 0.05;
    }

}

public Attack():void{
    
    //handles the player attack animations
    this.sprite.gotoAndPlay("PlayerAttack");

    this.sprite.on("animationend", (e:createjs.Event) => {
        this.Stage.dispatchEvent("PlayerTurnEnd");
        this.sprite.gotoAndPlay("PlayerIdle");
    },true);
}

public Reset():void{
    super.Reset("PlayerIdle");
    this.sprite.alpha = 1;
}

}