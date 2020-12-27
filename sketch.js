
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var ground

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas (400,400);
  ground = createSprite(200,390,900,20);
  ground.velocityX =-4;
  ground.x = ground.width/2;
  
  monkey = createSprite(50,380,10,10);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  FoodGroup = new Group();
  ObstacleGroup = new Group();
}


function draw() {
   background ("#33FFDC");
  if(ground.x<0){
    ground.x = ground.width/2
  }
  if(keyDown("space")){
    monkey.velocityY = -10;    
  }
  monkey.velocityY = monkey.velocityY+0.8;
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = score+1;
  }
  if(ObstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    ObstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    ObstacleGroup.setLifetimeEach (-1);
    FoodGroup.setLifetimeEach(-1);
  }
  monkey.collide(ground);
  fill ( "#3D33FF");
  textSize (15);
  text("score:"+score,200,50);
  
  spawnFood();
  spawnObstacles();
  drawSprites();
  
}
function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,170));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount%300 === 0){
    obstacle = createSprite(800,360,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    ObstacleGroup.add(obstacle);
  }
}

