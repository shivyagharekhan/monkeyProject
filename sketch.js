
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,spriteImage
var score,ground;
var survivaltime;
var space;
var PLAY=1;
var END=0;
var gameState=PLAY;



function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
spriteImage=loadAnimation("sprite_1.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
monkey=createSprite(80,350,20,20);  
monkey.addAnimation("moving",monkey_running);
monkey.scale=0.1;
  
ground=createSprite(400,400,900,10);
ground.velocityX=-4;

survivaltime=0;
  FoodGroup=new Group()
  obstacleGroup=new Group()
}


function draw() {
background(0);
  if(gameState===PLAY){
  if(ground.x<0){
    ground.x=ground.width/2;
     }
if(keyDown("Space")){
 monkey.velocityY=-5;
}
monkey.velocityY+=0.2;
    

    
stroke("white");
textSize(20);
fill("black");
text("score:"+score,500,50);
     food();
  spawnobstacles();
stroke("black");
textSize(20);
fill("white");
survivaltime=Math.ceil(frameCount/frameRate());
text("survivaltime:"+survivaltime,100,50);
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    }if(obstacleGroup.isTouching(monkey)){
      gameState=END;
    }
    
  }else if(gameState===END){
    FoodGroup.setVelocityXEach(0);
     obstacleGroup.setVelocityXEach(0);
  text("gameOver",200,200);
    ground.velocityX=0;
  }
   
 monkey.collide(ground);
drawSprites();
}

function food(){
  if(frameCount%80===0){
 banana=createSprite(400,200,900,10);
 banana.addImage(bananaImage); 
 banana.velocityX=-4;
 banana.lifetime=300;
 banana.scale=0.15;
FoodGroup.add(banana)
}
}
function spawnobstacles (){
  if(frameCount%100===0){
   obstacle=createSprite(600,350,10,40);
    obstacle.velocityX=-(4+survivaltime/100);
    //obstacle.lifetime=300;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    obstacleGroup.add(obstacle)
  }
       
}

