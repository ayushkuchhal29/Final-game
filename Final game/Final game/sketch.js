var PLAY = 1;
var END = 0;
var gameState = PLAY;

var eren, eren_running, eren_collided, eren_walk,eren_transformation;
var ground, invisibleGround, groundImage;
var backgroundImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;
var score=0;
var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
    eren_running = loadAnimation("sprites/walk1.png","sprites/walk2.png","sprites/walk3.png","sprites/walk 4.png","sprites/walk5.png","sprites/walk6.png","sprites/walk 7.png");
    eren_collided = loadAnimation("sprites/dead.png");
    eren_transformation = loadAnimation("sprites/transformation 1.png","sprites/transformation 2.png","transformation3.png","transformation 4.png","transformation 5.png","transformation 6.png");
    backgroundImage = loadImage("sprites/background.jpg");
    obstacle1 = loadImage("sprites/main tian.png");
    obstacle2 = loadImage("sprites/titan.png");
    obstacle3 = loadImage("sprites/titan2.png");
    gameOverImg = loadImage("sprites/gameOverText.png");
    restartImg = loadImage("sprites/restart.png");
}

function setup(){
    createCanvas(displayWidth - 20, displayHeight-120);
    eren = createSprite(100,180,20,50);
    eren.addAnimation("running",eren_running);
    eren.addAnimation("collided",eren_collided);
    eren.addAnimation("transformation",eren_transformation);

    ground = createSprite(200,180,700,20);
    ground.x = ground.width /2;
    ground.velocityX = -(6 + 3*score/100);

    gameOver = createSprite(300,50);
    gameOver.addImage(gameOverImg);

    restart = createSprite(300,140);
    restart.addImage(restartImg);

    gameOver.scale = 0.5;
    restart.scale = 0.5;

    gameOver.visible = false;
    restart.visible = false;
    
    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;

    obstaclesGroup = new Group();

    textSize(18);

    textFont("Georgia");
    textStyle(BOLD);
    fill("white");
    score = 0;
}

function draw(){
    camera.x = eren.x;
    camera.y = eren.y;
    gameOver.position.x = restart.position.x = camera.x;

    background(backgroundImage);

    textAlign(RIGHT, TOP);
    text("Score: "+ score, 600,5);

    if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        ground.velocityX = -(6 + 3*score/100);
    }

    if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        ground.velocityX = -(6 + 3*score/100);
        
    
        if(keyDown("space") && eren.y >= 159) {
          eren.velocityY = -12;
        }
       
        
        eren.velocityY = eren.velocityY + 0.8
      
        if (ground.x < 0){
          ground.x = ground.width/3;
        }
      
        eren.collide(invisibleGround);
        spawnObstacles();
      
        if(obstaclesGroup.isTouching(eren)){
            gameState = END;
        }
      }
      else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
        
        ground.velocityX = 0;
        eren.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);
        
      
        eren.changeAnimation("collided",eren_collided);
        
        obstaclesGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);
        
        if(mousePressedOver(restart)) {
          reset();
        }
      }

      if(keyDown("k")){
        eren.velocityY = 0;
        ground.velocityX = 0;
        eren.changeAnimation("transformation",eren_transformation);
      }
      
      
      drawSprites();

        

}
