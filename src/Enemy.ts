import Actors from "./Actors";
import AssetManager from "./AssetManager";
import { randomMe } from "./Toolkit";

export default class Enemy extends Actors{

    
    public choice:number = 0; 
    private type:number = 0;
    constructor(stage:createjs.StageGL, assetManager:AssetManager,){
        //basic enemy setup
        super(stage, assetManager, "ArmoredEnemyIdle");

        this.Position(100,130);
        this.Visibility(true);

        console.log("Enemy Done.");
        this.Reset();
        this.ChooseEnemy();

    }
    public Update():void{
        super.Update();
        this.Position(100,130);


        //makes the enemy fades when dead, and comes back to after fading out
        if(this.health <= 0){
            this.sprite.alpha = this.sprite.alpha - 0.1;
        } else if ((this.health == 100)&&(this.sprite.alpha  < 1)){
            this.sprite.alpha = this.sprite.alpha + 0.2;
        }

    }

    public Reset():void{
        super.Reset(this.EnemyAnimation());
        this.ChooseEnemy();
    }

    private ChooseEnemy():void{
        //this selects the enemy to fight
        for(let x:number = 1; x < 1;){
            this.type = randomMe(0,2);
            if(this.type == 0){
                x = 1;
                this.defense = 1;
                this.sprite.gotoAndPlay("SlimeIdle");
            } else if(this.type == 1){
                x = 1;
                this.defense = 2;
                this.sprite.gotoAndPlay("ArmoredEnemyIdle");
            } else if(this.type == 2){
                x = 1;
                this.defense = 3;
                this.attack = 35;
                this.sprite.gotoAndPlay("AgressiveEnemy");
            }else {
                this.type = randomMe(0,2);
            }
        }
    }

    private EnemyAnimation():string{
        this.type = randomMe(0,2);

        //plays the idle animation based on the enemy type (see above)

        if(this.type == 0){
            return("SlimeIdle");
        }else if(this.type == 2){
            return ("AgressiveEnemy");
        } else{
            return("ArmoredEnemyIdle");
        }
    }

    

    public ChooseAttack():void{
        this.choice = randomMe(0,2);  //0 = attack, 1 = counter

        //selects attack or counter
        for(let x:number = 1; x < 1;){
            if(this.choice == 0){
                x = 1;
            } else if(this.choice == 1){
                x = 1;
            } else {
                this.choice = randomMe(0,2);
            }
        }
    }

    public Attack():void{
        // Plays the attack and switches back after
        if(this.type == 0){
            this.sprite.gotoAndPlay("SlimeAttack");
        } else if(this.type == 2){
            this.sprite.gotoAndPlay("AgressiveEnemyAttack");
        }else{
            this.sprite.gotoAndPlay("ArmoredEnemyAttack");
        }
        
    
        this.sprite.on("animationend", (e:createjs.Event) => {
            this.Stage.dispatchEvent("EnemyTurnEnd");
            if(this.type == 0){
                this.sprite.gotoAndPlay("SlimeIdle");
            }else if(this.type == 2){
                this.sprite.gotoAndPlay("AgressiveEnemy");
            } else{
                this.sprite.gotoAndPlay("ArmoredEnemyIdle");
            }
        },true);
    }
}