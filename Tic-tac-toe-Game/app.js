
let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset-btn");
let newGamebtn=document.querySelector("#newgame-btn");
let messagecontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");


let turnX=true; //player X if false then player O
let cnt=0; //for tracking draw

//2D array to store winning patterns
const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const resetGame = () => {
    turnX=true;
    cnt=0;
    enableAllboxes();
    messagecontainer.classList.add("hide");
};

//Add click event listener to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnX){ //player X's turn
            box.innerText="X";
            turnX=false;
        }
        else{ //player O's turn
            box.innerText="O";
            turnX=true;
        }

        box.disabled=true; //disable the box after click
        cnt++;

        let iswinner= checkWinner();

        if(cnt===9 && !iswinner){
            gamedraw();
        }
    });
});

const gamedraw = () => {
    msg.innerText = `Game was a Draw!`;
    messagecontainer.classList.remove("hide");
    disableAllboxes();
};

const enableAllboxes = () => {
    for(let box of boxes){
        box.diabled=false;
        box.innerText="";
    }
};

const disableAllboxes =() => {
    for(let box of boxes){
        box.diabled=true;
    }
};

const showWinner =(winner) => {
    msg.innerText = `Congratulations🎉 ${winner} is winner!`;
    messagecontainer.classList.remove("hide");
    disableAllboxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        //check if all boxes in the pattern are filled with the same symbol

        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;

        if(pos1val!="" && pos2val!="" && pos3val!=""){
            if(pos1val===pos2val && pos2val===pos3val){
                console.log("Winner is", pos1val);
                showWinner(pos1val);
                return true; //winner found
            }
        }
    }
};

newGamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);