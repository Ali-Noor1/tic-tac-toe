let boxes = document.querySelectorAll('.box');
let resetbnt =  document.querySelector('.reset-btn');
let newGamebtn = document.querySelector('.new-button');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('.msg')

let turnO = true; // PlayerX ,  PlayerO

let count = 0; // To count the number of moves


// 2D array 

const winPatterns = [
  [0 , 1 , 2],
  [0 , 3 , 6],
  [0 , 4 , 8],
  [1 , 4 , 7],
  [2 , 5 , 8],
  [2 , 4 , 6],
  [3 , 4 , 5],
  [6 , 7 , 8]
];

const resetGame = () =>{
turnO = true;
count = 0;
enabledboxes();
msgContainer.classList.add('hide')
}

boxes.forEach((box)=>{
box.addEventListener("click" , ()=>{

  if(turnO){
    box.innerText = `O`;//O
    box.classList.add('o-color');
    box.classList.remove('x-color');
    turnO = false;
  }else{ //X
    box.innerText = "X";
    box.classList.add('x-color');
    box.classList.remove('o-color');
    turnO = true;
  }
  box.disabled = true; 
  count++;
  checkWinner();
})
});

const disabledboxes = () =>{

  for(let box of boxes){
    box.disabled = true;
  }

}
const enabledboxes = () =>{

  for(let box of boxes){
    box.disabled = false;
    box.innerText = "";
    box.classList.remove('o-color', 'x-color');
  }

}

const showWinner = (winner) =>{
  msg.innerText = `Congratulation , winner is ${winner}`
  msgContainer.classList.remove("hide");
  disabledboxes();
}

const showDraw = () => {
  msg.innerText = `It's a Draw!`;
  msgContainer.classList.remove("hide");
  disabledboxes();
}

const checkWinner = () =>{

  let winnerFound = false;
  for(let pattern of winPatterns){
      let pos1Val =  boxes[pattern[0]].innerText;
      let pos2Val =  boxes[pattern[1]].innerText;
      let pos3Val =  boxes[pattern[2]].innerText;

      if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
        if(pos1Val === pos2Val && pos2Val === pos3Val){
          showWinner(pos1Val);
          winnerFound = true;
          break;
        }
      }
  }

  if (!winnerFound && count === 9) {
    showDraw();
  }
};

newGamebtn.addEventListener('click' , resetGame);
resetbnt.addEventListener('click' , resetGame);

