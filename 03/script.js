const mess_div = document.querySelector('.main');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');


let element = document.querySelector('#text');

let typing = false;

const statusLight = document.getElementById('statusLight');
const statusLabel = document.getElementById('statusLabel');

const click = new Audio('click.mp3');
const letterClick = new Audio('click-keyboard.mp3');

let setTimer = null;

function setStatus(isTyping) {
    if (!statusLight || !statusLabel) return; 
    
    if (isTyping) {
        statusLight.classList.add("typing");
        statusLabel.textContent = "RECEIVING...";
    } else {
        statusLight.classList.remove("typing");
        statusLabel.textContent = "IDLE";
    }
}

startBtn.addEventListener("click", (e) => {
    if ( typing)
    {    
        return;
    }
    typing = true;

    click.currentTime = 0;
    click.play();
    
    clearTimeout(setTimer);
    element.innerHTML = "";
    
    setTimeout(() => {
        setStatus(true);

        fetch("./message.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Could not load message.json. Use a local server like Live Server!");
                }
                return response.json();
            })
            .then((data) => {
                const idx = Math.floor(Math.random() * data.agent.length);
                return displayMsg("Hello " + data.agent[idx])
                    .then(() => data); 
            })
            .then((data) => {
                element.appendChild(document.createElement("br"));
                const idx = Math.floor(Math.random() * data.msg.length);
                return displayMsg(data.msg[idx])
                    .then(() => data); 
            })
            .then((data) => {
                element.appendChild(document.createElement("br"));
                element.appendChild(document.createElement("br"));
                const idx = Math.floor(Math.random() * data.alertMsg.length);
                return displayMsg(data.alertMsg[idx]);
            })
            .then(() => {
                setStatus(false);
            })
            .catch((error) => {
                console.error("Error detected:", error);
                element.innerHTML = "<span style='color: #ff3333;'>ERROR: CONNECTION TERMINATED OR FILE NOT FOUND.</span>";
                setStatus(false); 
            });
            
    }, 1000);
});

resetBtn.addEventListener("click", (e) => {
    click.currentTime = 0;
    click.play();
    
    clearTimeout(setTimer);
    setTimer = null;
    typing= false;
    
    element.textContent = "";
    setStatus(false);
});

function displayMsg(message) {
    return new Promise((resolve) => {
        let i = 0;
        

        function type() {

            if (i >= message.length) {
                setTimeout(()=>{
                    resolve();
                    return;
                }, 500);
            }

            else{
                letterClick.currentTime = 0;
                letterClick.play();

                element.append(message[i]);
                
                i++;
                if(i == message.length - 1)
                {
                    delay = 500;
                }
                setTimer = setTimeout(type, 200); 
            }
        }

        type();
    });
}