const mess_div = document.querySelector('.main');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');


let element = document.querySelector('#msg');
const click = new Audio('click.mp3')
const letterClick = new Audio('click-keyboard.mp3')
let setTimer = null;
let state = true;

let msg = "Hello jaskrit."
let msg2 ="I hope you would be okay";

// const msg = fetch("./message.json").then()

startBtn.addEventListener("click", (e)=>{
    click.currentTime = 0;
    click.play();
    // if(state == true ){
    //     startBtn.innerText = "Stop";
    //     state = false;
    // }
    // else{
    //     startBtn.innerText = "Get Code"
    //     state = true;
    // }
    displayMsg(msg);
    // displayMsg(msg2);
    element.innerHTML="";
    
})
resetBtn.addEventListener("click", (e)=>{
    click.currentTime = 0;
    click.play();
    clearInterval(setTimer);
    setTimer = null;
    element.textContent = "";
    

    

})
const displayMsg = (mess)=>{
    let i =0;
    setTimer = setInterval(()=>{
        letterClick.currentTime = 0;
        letterClick.play();
        
        element.append(mess[i]);
        i++;
        if(i == mess.length){

            clearInterval(setTimer)
        }
    },200);
   

}