var score = 0;
var PLAY = 1;
var END = 0;
var girl,girlimg;
var ground,groundimg,invisibleGround;
var gameState = PLAY;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4;
var coin;
var reset,resetimg;
var gameOver,gameOverimg;
var armybomb;
var getScoreGroup;
var hint,hintimg;
var playbtn,playbtnimg;
var girlsleeping,girlsleepingimg;
var girlsad,girlsadimg;
var girlsleep,girlsleepimg;







function preload(){

  girlimg = loadAnimation("images/girl1.png","images/girl2.png","images/girl3.png","images/girl4.png","images/girl5.png","images/girl6.png","images/girl7.png","images/girl8.png",)
  groundimg = loadImage("images/bg.jpg");
  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.png");
  obstacle3 = loadImage("images/obstacle3.png");
  obstacle4 = loadImage("images/obstacle4.png");
  resetimg = loadImage("images/restart.png");
  gameOverimg = loadImage("images/gameOver.png");
  armybomb = loadImage("images/armybomb.png");
  coin = loadImage("images/goldcoin.png");
  playbtnimg = loadImage("images/play.png");
  hintimg = loadImage("images/hint.png");
  girlsadimg = loadAnimation("images/sad1.png","images/sad2.png","images/sad3.png","images/sad4.png","images/sad5.png","images/sad6.png","images/sad7.png","images/sad8.png","images/sad9.png","images/sad10.png","images/sad11.png","images/sad12.png",);
 
}

function setup(){

  createCanvas(1000,600);

  ground = createSprite(500,250,10,10);
  ground.addImage(groundimg);
  ground.scale = 2.5;
  ground.x = ground.width /1;
  
  girl = createSprite(200,390,10,10);
  girl.addAnimation("girl",girlimg);
  girl.scale = 0.6;
  girl.visible = false;

  girlsad = createSprite(200,370,10,10);
  girlsad.addAnimation("girlsad",girlsadimg);
  girlsad.scale = 0.6;
  girlsad.visible = false;

  
  
  invisibleGround = createSprite(500,500,1000,10);
  invisibleGround.visible = false;

  reset = createSprite(500,350,10,10);
  reset.addImage(resetimg);
  reset.scale =  0.2;
  reset.visible = false;
  
  gameOver = createSprite(500,150,10,10);
  gameOver.addImage(gameOverimg);
  gameOver.scale =  0.7;
  gameOver.visible = false;

  /*playbtn = createSprite(650,420,10,10);
  playbtn.addImage(playbtnimg);
  playbtn.scale =  0.2;
  playbtn.visible = true; 

  hint = createSprite(600,200,10,10);
  hint.addImage(hintimg);
  hint.scale =  0.6;
  hint.visible = true; */

  obstaclesGroup = createGroup();
  getScoreGroup = createGroup();
 

  girl.setCollider("rectangle",0,0,10,390);
  girl.debug = false;

  //coin.setCollider("rectangle",0,0,10,390);
  //coin.debug = true;

  
}

function draw(){
  background(7);

  

 
  //ground.depth = score.depth;
  //score.depth = score.depth+1;
 

  
  if(gameState === PLAY){

    gameOver.visible = false;
    reset.visible = false;
    //score.visible = true;
    girl.visible =  true;
    girlsad.visible = false;
   ground.velocityX = -(3.5+ 3* score/1000);
   obstaclesGroup.visible = true;
   
    
    if (ground.x < 0){
      ground.x = ground.width/1;
    }
    
    
    if(keyDown("space")&& girl.y >= 100) {
        girl.velocityY = -12;
        
    }
    
    girl.velocityY = girl.velocityY + 0.8
    spawnObstacles();
    getScore();
    
   
    if(obstaclesGroup.isTouching(girl)){
      
     // jumpSound.play();
      gameState = END;
      //dieSound.play()
    
  }
  }


  
   else if (gameState === END) {
      gameOver.visible = true;
      reset.visible = true;
      //girl.visible = false;
      ground.velocityX = 0;
      girl.velocityY = 0
      getScoreGroup.setLifetimeEach(-1);
      getScoreGroup.setVelocityXEach(0);
      girl.changeAnimation(girlsad);
      girlsad.visible = true;
      girl.visible = false;
     // getScoreGroup.visible = false;
     // obstaclesGroup.visible = false;
      //obstaclesGroup.visible = false;

      obstaclesGroup.setLifetimeEach(-1);
      obstaclesGroup.setVelocityXEach(0);
   }

   if(mousePressedOver(reset)) {
    restart();
  }

 
  if(girl.isTouching(getScoreGroup)){
    score = score+1;
   

}
   
  girl.collide(invisibleGround);

  
 
  drawSprites();
  textSize(25);
  fill("black");
  text("score:"+score,50,50);

  textSize(25);
  fill("black");
  text("Collect ArmyBombs & Coins",50,90);

}

function restart(){
  score = 0;
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  girl.changeAnimation(girl);
  obstaclesGroup.destroyEach();
  getScoreGroup.destroyEach();
 

}



function spawnObstacles(){
  if (frameCount % 200 === 0){
    var obstacle = createSprite(1000,460,10,40);
    
    obstacle.velocityX = -(6 + score/100);
    
     
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
      
       default: break;
     }
    
            
     obstacle.scale = 0.2;
     obstacle.lifetime = 300;
    
   
     obstaclesGroup.add(obstacle);
  }
 }

 function getScore(){
  if (frameCount % 100 === 0){
    var scores = createSprite(800,200,10,40);
    
    scores.velocityX = -(6 + score/100);
    
     
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: scores.addImage(coin);
               break;
       case 2: scores.addImage(armybomb);
               break;
      
       default: break;
     }
    
            
     scores.scale = 0.03;
     scores.lifetime = 100;
    
   
     getScoreGroup.add(scores);
     
  }
 }

 