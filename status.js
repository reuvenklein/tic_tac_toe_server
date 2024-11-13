

function winning(board,shape){
    let winner=false
   if(board[0]==shape &&board[1]==shape&&board[2]==shape

   ||board[3]==shape &&board[4]==shape&&board[5]==shape
   ||board[6]==shape &&board[7]==shape&&board[8]==shape
   ||board[0]==shape &&board[3]==shape&&board[6]==shape
   ||board[1]==shape &&board[4]==shape&&board[7]==shape
   ||board[2]==shape &&board[5]==shape&&board[8]==shape
   ||board[0]==shape &&board[4]==shape&&board[8]==shape
   ||board[2]==shape &&board[4]==shape&&board[6]==shape)
   {
    winner=true
   }


   return winner

   
}

function tie(board){
    
  let tie1=true

  board.map(element => {
      if (!element)
      {
        tie1=false
      }
  })

  return tie1
   
}

function computerTurn(board){

  let index
  board.map((element,i) => {
    if (!element)
    {
      index=i     
    }   
})
  
   return index
}


module.exports={winning,tie,computerTurn}