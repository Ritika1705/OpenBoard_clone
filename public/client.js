let nme;

let textarea = $("#textarea").emojioneArea;

console.log(textarea);
let messageArea = document.querySelector('.message_area');

do{
    nme = prompt('Please Enter Your Name: ');
}while(!nme)

$("#textarea").emojioneArea({
  events: {
      keyup: function(editor, event) {
      if(event.key === "Enter"){
        sendMessage(this.getText());

        console.log($("#textarea").data("emojioneArea").getText());   
      }
    }
  }
});

function sendMessage(masg){
    console.log(nme);
    let msg = {
        user: nme,
        message: masg.trim()
    }

    //append
    appendMessage(msg,'outgoing');
    $("#textarea").data("emojioneArea").setText('');
    scrollToBottom();

    //Send to server
    socket.emit('message',msg);
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className,'message');

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML= markup

    messageArea.appendChild(mainDiv);
}

//Receive msg
socket.on('message',(msg) => {
    appendMessage(msg,'incoming');
    scrollToBottom();
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}


function openchatwindow(){
   $(".chatbox").toggle(300);
}

function closechatwindow()
{
    $(".chatbox").hide(300);
}