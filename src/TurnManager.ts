import ActionButton from "./ActionButton";
import Actors from "./Actors";
import AssetManager from "./AssetManager";
import { ORIGINAL_SIZE, SCALE_X, SCALE_Y, STAGE_HEIGHT, STAGE_WIDTH } from "./Constants";
import Enemy from "./Enemy";
import healthbars from "./healthbars";
import Player from "./Player";

export default class TurnManager {

    private player:Player;
    private enemy:Enemy;
    
    private playerHealth:healthbars;
    private enemyHealth:healthbars;

    private currentTurn:number;

    private stage:createjs.StageGL;

    private turnStarted:boolean;

    private attacksDone:number;

    private actions:ActionButton;

    private PlayerCanAttack:boolean;
    private EnemyCanAttack:boolean;

    private ScoreKills:createjs.BitmapText;
    private killCount:number;

    private EnemyIcon:createjs.Sprite;
    private PlayerIcon:createjs.Sprite;

    private FrameCounter:number;
    private KillCountText:createjs.Sprite;



    private static TURN_START_ROUND:number = 1;
    private static TURN_PLAYER:number = 2;
    private static TURN_ENEMY:number = 3;
    private static TURN_END_ROUND:number = 4;
    private static TURN_SETUP:number = 5;

    private gameRunning:boolean;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){

        // Sets up the manager's basics
        this.currentTurn = TurnManager.TURN_SETUP;
        this.gameRunning = false;
        
        this.stage = stage;
        
        
        //Prepares the icons for the actions
        this.PlayerIcon = assetManager.getSprite("assets", "AttackIcon");
        this.PlayerIcon.y = (150)*(SCALE_Y);
        this.PlayerIcon.x = 50*(SCALE_X);
        this.PlayerIcon.scaleX = 1*(SCALE_X/4)
        this.EnemyIcon = assetManager.getSprite("assets", "AttackIcon");
        this.EnemyIcon.y = (150)*(SCALE_Y);
        this.EnemyIcon.x = 100*(SCALE_X);
        this.EnemyIcon.scaleX = -1*(SCALE_X/4)
        
        
        //Prepares the actors, their health, and the player actions
        this.player = new Player(stage, assetManager);
        this.enemy = new Enemy(stage, assetManager);
        
        this.playerHealth = new healthbars(stage, assetManager, "Health100", this.player, 0, 175);
        
        this.enemyHealth = new healthbars(stage, assetManager, "Health100", this.enemy, 175, 165);
        
        this.actions = new ActionButton(stage, assetManager, this.player);
        this.actions.acted = true;
        
        
        //Sets up the kills and kill counter
        this.ScoreKills = new createjs.BitmapText("0", assetManager.getSpriteSheet("glyphs"));
        this.ScoreKills.letterSpacing = 2;
        this.KillCountText = assetManager.getSprite("assets", "EnemyKilled");
        


}

public PlayGame(value:boolean):void{
    //enables and disables the game
    this.gameRunning = value;


    this.player.Reset();
    this.enemy.Reset();
    this.playerHealth.Reset();
    this.enemyHealth.Reset();
    this.currentTurn = TurnManager.TURN_SETUP;
    this.attacksDone = 0;
    this.turnStarted = false;
    this.EnemyCanAttack = false;
    this.PlayerCanAttack = false;


    if(this.gameRunning == false){
        this.player.Visibility(false);
        this.enemy.Visibility(false);
        this.actions.HideMe();
        this.playerHealth.Visibility(false);
        this.enemyHealth.Visibility(false);
        this.stage.removeChild(this.ScoreKills);
        this.stage.removeChild(this.KillCountText);
    } else {
        this.player.Visibility(true);
        this.enemy.Visibility(true);
        this.actions.ShowMe();
        this.playerHealth.Visibility(true);
        this.enemyHealth.Visibility(true);
        this.stage.addChild(this.ScoreKills);
        this.stage.addChild(this.KillCountText);
        this.killCount = 0;
        this.ScoreKills.text = String(this.killCount);

    }
}


    public Update():void{
        //Only updates if the game is running
        if(this.gameRunning == true){
            this.player.Update();
            this.enemy.Update();
            this.playerHealth.Update();
            this.enemyHealth.Update();
            this.actions.Update();

           let XScale = (2*(innerWidth/4))/ORIGINAL_SIZE;
           let YScale = (2*(innerHeight/4))/ORIGINAL_SIZE;

        this.ScoreKills.x = (30)*XScale;
        this.ScoreKills.y = (7)*YScale;

        this.PlayerIcon.scaleX = 1*(XScale/2);
        this.EnemyIcon.scaleX = -1*(XScale/2);

        XScale = this.stage.getBounds().width/ORIGINAL_SIZE;
        YScale = this.stage.getBounds().height/ORIGINAL_SIZE;
        
        this.PlayerIcon.y = (150)*(YScale);
        this.PlayerIcon.x = 50*(XScale);
        this.EnemyIcon.y = (150)*(YScale);
        this.EnemyIcon.x = 100*(XScale);

        this.KillCountText.scaleX = (XScale/4);
        this.KillCountText.scaleY = (YScale/4);
        this.KillCountText.x = (0)*XScale;
        this.KillCountText.y = (0)*YScale;

        console.log("Player Health: " + this.player.health + "             Enemy Health:" + this.enemy.health);
            
            


            
        if(this.player.sprite.alpha <= 0){
            this.player.Reset();
            this.playerHealth.Reset();
        }
            
        this.continueTurn();

        if(this.actions.acted == true){
            this.actions.HideMe();
            this.ChangeTurnPhase();
            this.actions.acted = false;
            this.turnStarted = false;
            this.attacksDone = 0;
        }
        }
    }
    
    private continueTurn():void{

        //This determines the turns and what is done on the said turn

        let GoodToGo = false;
        switch(this.currentTurn){
            case(TurnManager.TURN_SETUP):
                
                //only runs if the game is now setting up
                this.HideIcons();
                if(this.player.health ==0){
                    if(this.player.sprite.alpha <= 0){
                        this.player.Reset();
                        this.enemy.Reset();
                        this.enemyHealth.Reset();
                        this.playerHealth.Reset();
                        GoodToGo = true;
                    }
                    
                } else if(this.enemy.health == 0){
                    if(this.enemy.sprite.alpha <= 0){
                        this.enemy.Reset();
                        this.enemyHealth.Reset();
                        this.killCount += 1;
                        this.ScoreKills.text = String(this.killCount);
                        GoodToGo = true;
                    }
                }

                if(GoodToGo == true){
                this.ChangeTurnPhase();
                }

                break;

                case(TurnManager.TURN_START_ROUND):
                    //just prepares the turn and heads to the player turn
                    this.HideIcons();
                    this.ChangeTurnPhase();

                break;

                case(TurnManager.TURN_END_ROUND):
                    //last phase of the turn, handles the attacks and the effects
                    if(this.turnStarted == false){
                        this.FrameCounter = 0;
                        this.SetIcons();
                        this.turnStarted = true;
                        console.log("Broadcasted End Round");
                        if(this.attacksDone == 0){
                            this.PlayerCanAttack = true;
                            this.EnemyCanAttack = true;
                            this.enemy.Attack();
                            if((this.actions.choice == 0)||(this.actions.choice == 2)){
                        this.player.Attack();
                        this.stage.on("PlayerTurnEnd", (e:createjs.Event) => {
                            this.playerAttack();
                        },true);
                    } else{
                            this.playerAttack();
                    }

                        this.stage.on("EnemyTurnEnd", (e:createjs.Event) => {
                            this.enemyAttack();
                        },true);
                        }
                    }


                    if(this.attacksDone >= 2){
                        if(this.FrameCounter >= 15){
                            this.HideIcons();
                            this.ChangeTurnPhase();
                        } else {
                            this.FrameCounter +=1;
                            console.log(this.FrameCounter)
                        }
                    }

                    break;

                case(TurnManager.TURN_PLAYER):
                    //this allows the player to choose their action and the game is basically stalled until an action is done
                    this.actions.ShowMe();
                
                 

                break;

                case(TurnManager.TURN_ENEMY):
                    //the Enemy chooses their action and attacks
                    this.enemy.ChooseAttack();
                    this.ChangeTurnPhase();

                break;
        }
    }

    private enemyAttack():void{

        //this method is just running the code for the attack and dealing damage appropriately based on the actions

        if(this.EnemyCanAttack == true){
            createjs.Sound.play("Attack");
        this.attacksDone += 1;
        this.EnemyCanAttack = false;
        console.log("Broadcasted Enemy Attack");
        if(this.enemy.choice == 0){
            if(this.actions.choice == 1){
                    this.player.TakeDamage(this.enemy.attack); 
            }else if(this.actions.choice == 2){
                    this.player.TakeDamage(this.enemy.attack/2);
            }  else if(this.actions.choice == 3){
                createjs.Sound.play("Block");
            }else {
                    this.player.TakeDamage(this.enemy.attack);
            
            }
        } else {
            if(this.actions.choice == 1){
                this.player.TakeDamage(this.enemy.attack/2); 
        }else if(this.actions.choice == 2){
                this.player.TakeDamage(this.enemy.attack/4);
        }  else if(this.actions.choice == 3){
            createjs.Sound.play("Block");
        }else {
                this.player.TakeDamage(this.enemy.attack/2);
        
        }
        }
    }
}

    private playerAttack():void{

        //this method is just running the code for the attack and dealing damage appropriately based on the actions

        if(this.PlayerCanAttack == true){
            this.attacksDone += 1;
            this.PlayerCanAttack = false;
            
            if(this.actions.choice == 0){
                createjs.Sound.play("Attack");
                if(this.enemy.choice == 1){
                    this.enemy.TakeDamage(this.player.attack/2);
                } else {
                    this.enemy.TakeDamage(this.player.attack);
                }
            } else if(this.actions.choice == 1){
                createjs.Sound.play("Heal");
                this.player.Heal(this.player.attack*2);
            } else if (this.actions.choice == 2){
                this.enemy.TakeDamage(this.player.attack/2);
                
            } else{

            }
         
        }  else{

        }  
    }

    private ChangeTurnPhase():void{
        
        //ends the current phase and moves to the next phase for the turn

        switch(this.currentTurn){

                case(TurnManager.TURN_SETUP):
                this.enemy.Reset();
                console.log("Enemy Reset");
                this.currentTurn = TurnManager.TURN_START_ROUND;

                break;

                case(TurnManager.TURN_START_ROUND):
                this.currentTurn = TurnManager.TURN_PLAYER;

                break;

                case(TurnManager.TURN_END_ROUND):
                
                
                if(this.enemy.health == 0){
                    this.currentTurn = TurnManager.TURN_SETUP;
                    
                } else if(this.player.health > 0){
                    this.currentTurn = TurnManager.TURN_START_ROUND;
                } 
                else{
                    this.stage.dispatchEvent("gameOver");
                    this.gameRunning = false;
                }

                break;

                case(TurnManager.TURN_PLAYER):
                this.currentTurn = TurnManager.TURN_ENEMY;

                break;

                case(TurnManager.TURN_ENEMY):
                this.currentTurn = TurnManager.TURN_END_ROUND;

                break;
        }
    }

    private SetIcons():void{

        //Displays the icons for the player's actions and enemy's attack
        if(this.actions.choice == 0){
            this.PlayerIcon.gotoAndPlay("AttackIcon");

        } else if (this.actions.choice == 1){
            this.PlayerIcon.gotoAndPlay("HealIcon");
        } else if(this.actions.choice == 2){
            this.PlayerIcon.gotoAndPlay("AttackIcon");
        } else if (this.actions.choice == 3){
            this.PlayerIcon.gotoAndPlay("DefendIcon");
        }
        this.EnemyIcon.gotoAndPlay("AttackIcon");
        this.stage.addChild(this.PlayerIcon);
        this.stage.addChild(this.EnemyIcon);
    }

    private HideIcons():void{
        this.stage.removeChild(this.PlayerIcon);
        this.stage.removeChild(this.EnemyIcon);
    }


}