class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("skyBlue")

    //write code to show a heading for showing the result of Quiz
    textSize(25)
    text("result of the quiz",350,60)

    //call getContestantInfo( ) here
    Contestant.getContestantInfo()
    console.log(allContestants)
    //write condition to check if contestantInfor is not undefined
    if(allContestants!== undefined){
      fill("yellow");
      textSize(20);
      text("Note: Contestants who answered correct are highlighted in green", 130, 230)

      var yPos=240
      for (var plr in allContestants){
        var correctAnswer = 2
        if(correctAnswer==allContestants[plr].answer){
          fill("green")
        }
        else{fill("red")}
        yPos=yPos+30
        textSize(20)
        text(allContestants[plr].name+":"+ allContestants[plr].answer, 200,yPos)
      }
    }
    //write code to add a note here

    //write code to highlight contest who answered correctly

    
  }

}
