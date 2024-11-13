const express=require('express'),

app=express(),
PORT=2000,
cors=require('cors')

app.use(cors())
app.use(express.json())



const {sockets,rooms}=require('./data')

let number=123456,
 isExists=true,
 room="",
 player1="",
 board=[],
 currentPlayer="",
 move="",
 Room="",
 socketId="",
 idPlayer1="",
 idPlayer2="",
 win="",
 tie=""
 computersTurn="",
 typeOfGame=""
 


const http=require('http')
const server=http.createServer(app)
let status1=require('./status')


const socketIO=require('socket.io')

const io=new socketIO.Server(server,{
    cors:{
        origin:'*'
    }
})

io.on('connection',(socket)=>{
      
    console.log("connecting  now:",socket.id);
   
    socket.on('Create-Game',(data)=>{
      number+=1
      sockets[socket.id]=number
      idPlayer1=socket.id
      
    
       
       
        socket.emit('awaiting',{ number,data,idPlayer1 })
                 
  })
    socket.on('join-game', (data) => {
            
          let data1=Number(data.id)
           //checking if number of room exists.                                 
     
     isExists=Object.values(sockets).includes(data1)
           room=data.id
         rooms[room]=
           {
            player2:{
             id:socket.id,
             name:data.name,
             avatar:data.image,      
             createdGame:false,
             numberOfWins:0,
             winGame:false
           }
          }
          
          socket.emit('status-join',isExists)
              
       
         if (isExists){
            sockets[socket.id]=data.id
             idPlayer2=socket.id
             socketId=idPlayer2
            

           
           io.emit('found-player')
         
         }

        })

        socket.on('start-game',(data)=>{
           
          idPlayer1=socket.id
          player1={
            player1:{
            id:idPlayer1,
            name:data.name,
            avatar:data.image,
            shape:data.shape,
            numberOfWins:0,
            createdGame:true,
            winGame:false
            }
         }
         board={board:Array.from({ length: 9 })}
         currentPlayer={currentPlayer:'player1'}
         gameResult={status:""}
 

       rooms[room]= {...rooms[room],...player1,...board,...currentPlayer,...gameResult}
           Room=rooms[room]
             
          if(Room["player1"]["shape"]=='X')
          {
            Room["player2"]["shape"]='O'
          }
          else{
            Room["player2"]["shape"]='X'
          }
          
          
         
        if(typeOfGame=='onePlayer')
        {
          
          socket.emit('game-details',rooms[room])
        }
        else{
          io.emit('game-details',rooms[room])
          
          
        }
        })
         
        socket.on('move',(data)=>{
           console.log(sockets)
          typeOfGame=data.typeOfGame
          room=sockets[socket.id]
    
          if(socketId!=socket.id||data.typeOfGame=='onePlayer')

           {
           
     
            socketId=socket.id
            let player
            if(data.secondPlayer)
            {
              Room["currentPlayer"]=data.secondPlayer
              player=data.secondPlayer 
            }
            else
            {
              Room["currentPlayer"]=data.currentPlayer1
              player=data.currentPlayer1 
            }
           
           
           if(player=='player1')
           {
            move=Room["player1"]["shape"]
           
           }
           else{
            move=Room["player2"]["shape"]
           
           }
           //setting "number" to the square that was clicked on
           // and then checking: if that square is empty,the shape should be put there.
          let number=Number(data.squareNumber)
          if( !(Room["board"][number]))
          {
           Room["board"][number]=move
         
          }

          //checking if the game ended with a win or with a tie
          // and then setting the status according to the result.
          win=status1.winning(Room["board"],Room[player]["shape"])
          tie=status1.tie(Room["board"])
          
           if(win){
            
           Room["status"]='win'
           Room[player]["numberOfWins"]++
           }
           else if(tie)
           {
           
            Room["status"]='tie'
           }
           else{
            Room["status"]=""
           }
          
         Room["index"]= status1.computerTurn(Room["board"])
         if(typeOfGame=='onePlayer')
         {
          socket.emit('game-status',Room)
         }
         else
         {
          

          io.emit('game-status',Room)
        
         }
        
        }
        })

        
        socket.on('play-again', () => {
          Room["board"]=Array.from({ length: 9 })
          Room["currentPlayer"]='player2'
          Room["status"]=""
          socketId=idPlayer2
           
          if(typeOfGame=='onePlayer')
            {
             socket.emit('game-status',Room)
            }
            else
            {
              
            io.emit('game-status',Room)
            }

        })

        socket.on('back-main',()=>{
          Room["board"]=Array.from({ length: 9 })
          Room["currentPlayer"]='player2'
          Room["status"]=""
          socketId=idPlayer2
          delete Room
          if(typeOfGame=='onePlayer')
          {
            socket.emit('back')
          }
          else{
           
            io.emit('back')
          }
          
        })
            
        })
       
        
server.listen(PORT,(()=>console.log("#### server is up ####")))