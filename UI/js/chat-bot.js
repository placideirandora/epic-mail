
 let messages = [];
 let lastUserMessage = "";
 let botMessage = "";
 let botName = 'PLACIDE';
 let talking = true; 
 let sendButton = document.querySelector('#send-btn');

function chatbotResponse() {
    talking = true;

    switch(lastUserMessage)
    {
        case 'hi':
        botMessage = 'hi!';
        break;

        case 'hello':
        botMessage = 'hello! ';
        break;

        case 'what is your name?':
        botMessage = botName;
        break;

        case 'where do you live?':
        botMessage = 'i live at kacyiru! ';
        break;

        case 'do you know andela?':
        botMessage = 'of course! i like it.';
        break;

        default:
        const random = ["i don't know", "feel better", "enjoy",
         "interesting", "cool", "funny", "don't worry", "collaborate"]
        botMessage = random[Math.floor(Math.random()*(random.length))];;
        break;
    }
  
  }
  
  function newEntry() {
    
    if (document.querySelector("#chatbox").value != "")
     {
        lastUserMessage = document.querySelector("#chatbox").value;
        document.querySelector("#chatbox").value = "";
        messages.push("<b class='left'><i class='fa fa-user-circle'></i> INNOCENT:&nbsp;</b> " + lastUserMessage); 
        chatbotResponse();
        messages.push("<b class='right'><i class='fa fa-user-circle'></i> " + botName + ":</b> " + botMessage);
        Speech(botMessage);
        for (var i = 1; i < 15; i++) {
            if (messages[messages.length - i])
            document.querySelector("#chatlog" + i).innerHTML = messages[messages.length - i];
      }
    }
  }
  
  function Speech(say) {
    if ('speechSynthesis' in window && talking) {
      var utterance = new SpeechSynthesisUtterance(say);
      speechSynthesis.speak(utterance);
    }
  }
  
  document.onkeypress = keyPress;
  function keyPress(e) {
    var x = e || window.event;
    var key = (x.keyCode || x.which);
    if (key == 13 || key == 3) {
      newEntry();
    }
  }

  sendButton.addEventListener("click", newEntry);