/* eslint-disable no-case-declarations */
const messages = [];
let lastUserMessage = '';
let botMessage = '';
const botName = 'PLACIDE';
let talking = true;
const sendButton = document.querySelector('#send-btn');

function chatbotResponse() {
  talking = true;

  switch (lastUserMessage) {
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
      const random = [
        'i do not know',
        'feel better',
        'enjoy',
        'interesting',
        'cool',
        'funny',
        'do not worry',
        'collaborate',
      ];
      botMessage = random[Math.floor(Math.random() * random.length)];
      break;
  }
}

function newEntry() {
  if (document.querySelector('#chatbox').value !== '') {
    lastUserMessage = document.querySelector('#chatbox').value;
    document.querySelector('#chatbox').value = '';
    messages.push(
      "<b class='left'><i class='fa fa-user-circle'></i> INNOCENT:&nbsp;</b> " + lastUserMessage,
    );
    chatbotResponse();
    messages.push(
      "<b class='right'><i class='fa fa-user-circle'></i> " + botName + ":</b> " + botMessage,
    );
    Speech(botMessage);
    for (let i = 1; i < 15; i++) {
      if (messages[messages.length - i]) {
        document.querySelector('#chatlog' + i).innerHTML = messages[messages.length - i];
      }
    }
  }
}

function Speech(say) {
  if ('speechSynthesis' in window && talking) {
    const utterance = new SpeechSynthesisUtterance(say);
    speechSynthesis.speak(utterance);
  }
}

document.onkeypress = keyPress;
function keyPress(e) {
  const x = e || window.event;
  const key = x.keyCode || x.which;
  if (key === 13 || key === 3) {
    newEntry();
  }
}

sendButton.addEventListener('click', newEntry);
