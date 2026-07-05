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


startBtn.addEventListener("click", (e)=>{
    click.currentTime = 0;
    click.play();
    setTimeout(()=>{
        fetch("./message.json")
        .then(response => response.json())
        .then((data) => {
            const idx = Math.floor(Math.random() * data.agent.length);

            return displayMsg("Hello "+data.agent[idx])
                .then(() => data); 
        })
        .then((data) => {
            element.innerHTML+= "<br>";
            const idx = Math.floor(Math.random() * data.msg.length);
            return displayMsg(data.msg[idx])
                .then(() => data); 
        })
        .then((data) => {
            element.innerHTML+= "<br><br>";

            const idx = Math.floor(Math.random() * data.alertMsg.length);

            return displayMsg(data.alertMsg[idx]);
        })
        .catch((error) => {
            console.log(error);
        });
        
        
        element.innerHTML="";
        
    },1000)
})


resetBtn.addEventListener("click", (e)=>{
    click.currentTime = 0;
    click.play();
    clearInterval(setTimer);
    setTimer = null;
    element.textContent = "";
    

    

})

function displayMsg(message){

    return new Promise((resolve)=>{

        let i = 0;

        function type(){

            if(i >= message.length){

                resolve();

                return;

            }

            letterClick.currentTime = 0;
            letterClick.play();

            element.append(message[i]);
            
            i++;

            setTimeout(type,200);

        }

        type();

    });

}



