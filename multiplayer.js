// var socket = io("https://sigma-server-six.vercel.app/", {
var socket = io("http://localhost:3000", {
  transports: ["websocket"] 
});
const USER_ID = crypto.randomUUID();

let rooms = []
let currentRoom = "singleplayer"

function createRoom(){
    code = generateCode()
    currentRoom = code;
    setInterval(() => {
        socket.emit('chat message',`
        {
        "user":"${USER_ID}",
        "id":"${currentRoom}",
        "type":"SGRoom",
        "data":
                {
                "roomID":"${currentRoom}",
                "hostID":"${USER_ID}"
                }
        }   
            ` );
    }, 3000);
}
setInterval(testConnection,5000);

function testConnection(){
    socket.emit("chat message",`
        {
        "user":"${USER_ID}",
        "id":"${currentRoom}",
        "type":"testConnection"
        }
        `);
}


/*
{
"id":"000000",
"type":
"data":{}


types:
start, submit, chatMsg, end, join

}


*/

  socket.on('chat message', function(msg) {
    console.log(msg);
      message =  JSON.parse(msg)
            switch(message.type){
             case ("testConnection"):
                break;
             case ("submit"):
                break;
            case ("SGRoom"):
                if (!rooms.includes(message.id)){
                    rooms.push(message.id);
                    }
                break;
                
            }


  });
