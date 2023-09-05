class Game{
    constructor(){
        
    }   

    start(){

        //player object
        player = new Player();
        playerCount = player.getPlayerCount();
        
        //form object
        form = new Form();
        form.display();
        
        //sprites
        spaceship1 = createSprite(250,500);
        spaceship1.shapeColor = "gray"
        spaceship1.addImage("spaceship1",spaceship1Img);
        spaceship1.scale = 0.6;
        
        spaceship2 = createSprite(1100,500);
        spaceship2.shapeColor = "silver"
        spaceship2.addImage("spaceship2",spaceship2Img);
        spaceship2.scale = 0.6;

        spaceship = [spaceship1, spaceship2]
      
        alien = createSprite(250,150);
        alien.shapeColor = "green"
        alien.addImage("alien",alienImg);
        alien.scale = 0.5;
        
    }

    getGameState(){
        database.ref("gameState").on("value",(data)=>{
            gameState = data.val();
        })
    }

    updateGameState(state){
        database.ref("/").update({
          gameState:state
        })
    }

    play(){

        form.hide();
        drawSprites();
        Player.getPlayerInfo();
        var index = 0;
        for(var i in  allPlayerDetails){
         index +=1;
         var x= allPlayerDetails[i].positionX;
       //  var y = allPlayerDetails[i].positionY;

         spaceship[index-1].position.x = x;
       //  spaceship[index-1].position.y = y
        }
        this.playerMovement();
    }

    playerMovement(){
        if(keyIsDown("LEFT_ARROW")){
            player.positionX -= 5
            player.updatePlayerSync()
        }

        if(keyIsDown("RIGHT_ARROW")){
            player.positionX += 5
            player.updatePlayerSync()
        }

    }
}