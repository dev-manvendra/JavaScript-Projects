const mess_div = document.querySelector('.main');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');

// Target #text instead of #msg so the cursor is never overwritten
let element = document.querySelector('#text');

const statusLight = document.getElementById('statusLight');
const statusLabel = document.getElementById('statusLabel');

const click = new Audio('click.mp3');
const letterClick = new Audio('click-keyboard.mp3');

let setTimer = null;

function setStatus(isTyping) {
    if (!statusLight || !statusLabel) return; // Safety check prevents crashes if HTML element is missing
    
    if (isTyping) {
        statusLight.classList.add("typing");
        statusLabel.textContent = "RECEIVING...";
    } else {
        statusLight.classList.remove("typing");
        statusLabel.textContent = "REST";
    }
}

startBtn.addEventListener("click", (e) => {
    click.currentTime = 0;
    click.play().catch(() => {}); // Catch prevents script freeze if audio fails to load
    
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
    
    element.textContent = "";
    setStatus(false);
});

function displayMsg(message) {
    return new Promise((resolve) => {
        let i = 0;

        function type() {
            if (i >= message.length) {
                resolve();
                return;
            }

            letterClick.currentTime = 0;
            letterClick.play();

            element.append(message[i]);
            
            i++;
            setTimer = setTimeout(type, 150); // Slightly faster typing speed (150ms)
        }

        type();
    });
}