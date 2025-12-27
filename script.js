const APP= {
    ver:"1.1.0",user: {
        id:0
    },
    cfg: {
        mod:true,auto:false,questionSpoof:true,darkMode:true,autoSpeed:620,speedOptions:[1000,800,600,450]
    }
};
async function loadScript(url) {
    const response=await fetch(url);
    const text=await response.text();
    eval(text)
}
async function loadCss(url) {
    return new Promise(resolve=> {
        const link=document.createElement("link");
        link.rel="stylesheet";
        link.type="text/css";
        link.href=url;
        link.onload=resolve;
        document.head.appendChild(link)
    })
}
function sendToast(message,duration=5000,position="bottom") {
    if(typeof Toastify!=="undefined") {
        Toastify( {
            text:message,duration:duration,gravity:position,position:"center",stopOnFocus:true,style: {
                background:"linear-gradient(145deg, #6a0dad, #4b0082)",color:"#ffffff",boxShadow:"0 4px 15px rgba(106, 13, 173, 0.5)"
            }
        })
        .showToast()
    }
    else {
        console.log("Toast:",message)
    }
}
const playAudio=(url)=> {
    new Audio(url).play()
};
class UI {
    static init() {
        const panel=document.createElement("div");
        panel.id="crimson-panel";
        const panelStyle= {
            position:"fixed",top:"10px",right:"15px",width:"220px",background:"linear-gradient(145deg, #2a0a4a, #1a0630)",borderRadius:"12px",display:"flex",flexDirection:"column",padding:"12px",zIndex:"9999",boxShadow:"0 4px 15px rgba(106, 13, 173, 0.5)",border:"1px solid #6a0dad",maxWidth:"90%"
        };
        Object.assign(panel.style,panelStyle);
        panel.innerHTML=`<style>.crimson-header {
            color:#fff;
            font-size:18px;
            font-weight:bold;
            text-align:center;
            margin-bottom:10px;
            padding-bottom:10px;
            border-bottom:1px solid#6a0dad;
            cursor:pointer;
            user-select:none;
            display:flex;
            justify-content:center;
            align-items:center;
            gap:8px
        }
        .crimson-header:after {
            content:"â–¼";
            font-size:12px;
            margin-left:5px;
            transition:transform 0.3s ease;
            color:#b388ff
        }
        .crimson-header.collapsed:after {
            transform:rotate(-90deg)
        }
        .crimson-content {
            transition:max-height 0.3s ease,opacity 0.3s ease;
            max-height:500px;
            opacity:1;
            overflow:hidden
        }
        .crimson-content.collapsed {
            max-height:0;
            opacity:0
        }
        .crimson-version {
            color:#b388ff;
            font-size:12px;
            font-weight:normal
        }
        .crimson-logo {
            height:24px;
            width:24px;
            border-radius:50%;
            object-fit:cover
        }
        .crimson-opt {
            display:flex;
            align-items:center;
            justify-content:space-between;
            color:#fff;
            padding:8px;
            margin:3px 0;
            background:rgba(106,13,173,0.2);
            border-radius:8px;
            transition:all 0.3s ease
        }
        .crimson-opt:hover {
            background:rgba(106,13,173,0.3)
        }
        .switch {
            position:relative;
            display:inline-block;
            width:44px;
            height:22px
        }
        .switch input {
            opacity:0;
            width:0;
            height:0
        }
        .slider {
            position:absolute;
            cursor:pointer;
            top:0;
            left:0;
            right:0;
            bottom:0;
            background-color:#333;
            transition:.4s;
            border-radius:22px
        }
        .slider:before {
            position:absolute;
            content:"";
            height:18px;
            width:18px;
            left:2px;
            bottom:2px;
            background-color:white;
            transition:.4s;
            border-radius:50%
        }
        input:checked+.slider {
            background:linear-gradient(145deg,#6a0dad,#9c27b0)
        }
        input:checked+.slider:before {
            transform:translateX(22px)
        }
        .crimson-credit {
            color:#b388ff;
            font-size:11px;
            text-align:center;
            margin-top:10px;
            padding-top:10px;
            border-top:1px solid#6a0dad
        }
        .speed-slider-container {
            width:100%;
            margin-top:5px;
            padding:0 2px;
            box-sizing:border-box;
            overflow:visible
        }
        .speed-slider {
            -webkit-appearance:none;
            width:100%;
            height:8px;
            border-radius:5px;
            background:#333;
            outline:none;
            margin:10px 0
        }
        .speed-slider::-webkit-slider-thumb {
            -webkit-appearance:none;
            appearance:none;
            width:18px;
            height:18px;
            border-radius:50%;
            background:linear-gradient(145deg,#6a0dad,#9c27b0);
            cursor:pointer
        }
        .speed-slider::-moz-range-thumb {
            width:18px;
            height:18px;
            border-radius:50%;
            background:linear-gradient(145deg,#6a0dad,#9c27b0);
            cursor:pointer;
            border:none
        }
        .speed-value {
            display:none
        }
        .discord-btn {
            display:flex;
            align-items:center;
            justify-content:center;
            gap:6px;
            width:100%;
            padding:8px;
            margin-top:8px;
            background:linear-gradient(145deg,#6a0dad,#4b0082);
            color:white;
            border:none;
            border-radius:8px;
            cursor:pointer;
            font-weight:bold;
            transition:all 0.3s ease
        }
        .discord-btn:hover {
            background:linear-gradient(145deg,#7b1fa2,#5e35b1);
            transform:translateY(-2px)
        }
        .discord-icon {
            width:16px;
            height:16px
        }
        </style><div class="crimson-header"><img src="https://trollchipss.netlify.app/logo-trollchips.png"class="crimson-logo"alt="Logo">CrimsonStrauss<span class="crimson-version">v$ {
            APP.ver
        }
        </span></div><div class="crimson-content"><div class="crimson-opt"><span>Auto Complete</span><label class="switch"><input type="checkbox"id="autoCheck"><span class="slider"></span></label></div><div class="crimson-opt"><span>Question Spoof</span><label class="switch"><input type="checkbox"id="spoofCheck"checked><span class="slider"></span></label></div><div class="crimson-opt"><span>Dark Mode</span><label class="switch"><input type="checkbox"id="darkModeCheck"checked><span class="slider"></span></label></div><div class="crimson-opt"id="speedControlContainer"style="display: none;
        "><span>Velocidade</span><div style="width: 100%;
        display: flex;
        align-items: center;
        padding-left: 10px;
        box-sizing: border-box;
        "><div class="speed-slider-container"><input type="range"min="0"max="3"value="0"class="speed-slider"id="speedSlider"><div class="speed-value"id="speedValue"style="display: none;
        ">750ms</div></div></div></div><button class="discord-btn"id="discordBtn"><svg class="discord-icon"viewBox="0 0 24 24"fill="currentColor"><path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v19.056c0 1.368-1.104 2.472-2.46 2.472H16.44c-1.248 0-2.16-.984-2.16-2.28v-1.224h-2.88v1.224c0 1.296-.912 2.28-2.16 2.28H4.46C3.104 24 2 22.896 2 21.528V2.472C2 1.104 3.104 0 4.46 0h15.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.228.024c-.756.12-1.716.36-2.748.828-.444.192-.708.336-.708.336s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416s.12.072.324.192l.084.06c.036.024.072.036.108.06.6.264 1.02.42 1.464.528.492.132 1.068.216 1.716.24.48.024 1.188-.024 1.956-.144.72-.108 1.452-.312 2.16-.624.444-.168.936-.42 1.452-.756 0 0-.564.936-2.076 1.404.36.456.792.984.792.984zm-5.58-5.604c-.684 0-1.236.6-1.236 1.332 0 .732.552 1.332 1.236 1.332.684 0 1.236-.6 1.236-1.332.012-.732-.552-1.332-1.236-1.332zm4.44 0c-.684 0-1.236.6-1.236 1.332 0 .732.552 1.332 1.236 1.332.684 0 1.236-.6 1.236-1.332 0-.732-.552-1.332-1.236-1.332z"></path></svg>Discord</button><div class="crimson-credit">Made by[@Crimsonstrauss]</div></div>`;
        document.body.appendChild(panel);
        const header=document.querySelector(".crimson-header");
        const content=document.querySelector(".crimson-content");
        header.addEventListener("click",()=> {
            header.classList.toggle("collapsed");
            content.classList.toggle("collapsed");
            const isCollapsed=header.classList.contains("collapsed");
            localStorage.setItem("crimson-collapsed",isCollapsed);
            sendToast(isCollapsed?"Menu recolhido":"Menu expandido",1000)
        });
        const isCollapsed=localStorage.getItem("crimson-collapsed")==="true";
        if(isCollapsed) {
            header.classList.add("collapsed");
            content.classList.add("collapsed")
        }
        document.getElementById("autoCheck").onchange=(e)=> {
            APP.cfg.auto=e.target.checked;
            document.getElementById("speedControlContainer").style.display=APP.cfg.auto?"flex":"none";
            sendToast(APP.cfg.auto?"âœ”ï¸ Auto Complete Enabled":"âœ–ï¸ Auto Complete Disabled",2000)
        };
        const speedSlider=document.getElementById("speedSlider");
        const speedValue=document.getElementById("speedValue");
        const speedIndex=APP.cfg.speedOptions.indexOf(APP.cfg.autoSpeed);
        speedSlider.value=speedIndex>=0?speedIndex:0;
        speedSlider.oninput=()=> {
            const value=parseInt(speedSlider.value);
            const speed=APP.cfg.speedOptions[value];
            APP.cfg.autoSpeed=speed;
            speedValue.textContent=speed+"ms"
        };
        speedSlider.onchange=()=> {
            const value=parseInt(speedSlider.value);
            const speed=APP.cfg.speedOptions[value];
            sendToast("â±Velocidade alterada para "+speed+"ms",2000)
        };
        document.getElementById("spoofCheck").onchange=(e)=> {
            APP.cfg.questionSpoof=e.target.checked;
            sendToast(APP.cfg.questionSpoof?"âœ”ï¸ Question Spoof Enabled":"âœ–ï¸ Question Spoof Disabled",2000)
        };
        document.getElementById("darkModeCheck").onchange=(e)=> {
            APP.cfg.darkMode=e.target.checked;
            if(typeof DarkReader!=="undefined") {
                if(APP.cfg.darkMode) {
                    DarkReader.enable();
                    sendToast("ðŸŒ‘ Dark Mode Enabled",2000)
                }
                else {
                    DarkReader.disable();
                    sendToast("â˜€ï¸ Dark Mode Disabled",2000)
                }
            }
            else {
                console.error("DarkReader nÃ£o estÃ¡ disponÃ­vel");
                sendToast("âš ï¸ Dark Mode nÃ£o disponÃ­vel. Recarregue a pÃ¡gina.",3000)
            }
        };
        document.getElementById("discordBtn").addEventListener("click",()=> {
            window.open("https://discord.gg/H6V7RWzKgV","_blank")
        });
        if(APP.cfg.darkMode&&typeof DarkReader!=="undefined") {
            DarkReader.enable()
        }
    }
}
class Core {
    static init() {
        this.setupMod();
        this.setupAuto()
    }
    static async loadExternalLibraries() {
        try {
            await loadCss("https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css");
            await loadScript("https://cdn.jsdelivr.net/npm/toastify-js");
            await loadScript("https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js");
            if(typeof DarkReader!=="undefined") {
                DarkReader.setFetchMethod(window.fetch);
                if(APP.cfg.darkMode) {
                    DarkReader.enable()
                }
            }
            else {
                console.error("DarkReader nÃ£o foi carregado corretamente")
            }
            if(typeof Toastify!=="undefined") {
                sendToast("â˜ªï¸ EclipseLunar loaded successfully!")
            }
            else {
                console.error("Toastify nÃ£o foi carregado corretamente")
            }
            console.clear()
        }
        catch(error) {
            console.error("Erro ao carregar bibliotecas externas:",error)
        }
    }
    static setupMod() {
        const messages=["ðŸ‘½ Certa resposta?","ðŸ‘» Made by [@Crimsonstrauss]."];
        const originalFetch=window.fetch;
        window.fetch=async function(url,options) {
            const response=await originalFetch.apply(this,arguments);
            const clonedResponse=response.clone();
            try {
                const text=await clonedResponse.text();
                let data=JSON.parse(text);
                if(data?.data?.assessmentItem?.item?.itemData) {
                    let itemData=JSON.parse(data.data.assessmentItem.item.itemData);
                    if(itemData.question.content[0]===itemData.question.content[0].toUpperCase()&&APP.cfg.questionSpoof) {
                        itemData.answerArea= {
                            calculator:false
                        };
                        itemData.question.content=messages[Math.floor(Math.random()*messages.length)]+"[[â˜ƒ radio 1]]";
                        itemData.question.widgets= {
                            "radio 1": {
                                type:"radio",alignment:"default",static:false,graded:true,options: {
                                    choices:[ {
                                        content:"âœ”ï¸",correct:true
                                    }
                                    ],randomize:false,multipleSelect:false,displayCount:null,hasNoneOfTheAbove:false,onePerLine:true,deselectEnabled:false
                                }
                            }
                        };
                        data.data.assessmentItem.item.itemData=JSON.stringify(itemData);
                        sendToast("ðŸ”“ Question Bypassed",1000);
                        return new Response(JSON.stringify(data), {
                            status:response.status,statusText:response.statusText,headers:response.headers
                        })
                    }
                }
            }
            catch(error) {
            }
            return response
        }
    }
    static async setupAuto() {
        const delay=(ms)=>new Promise(resolve=>setTimeout(resolve,ms));
        const buttonClasses=["_1tuo6xk","_ssxvf9l","_1f0fvyce","_rz7ls7u","_1yok8f4","_1e5cuk2a","_s6zfc1u","_4i5p5ae","_1r8cd7xe"];
        const checkButtonSelector="[data-testid="exercise-check-answer"]";
        function clickButton(className) {
            const button=document.getElementsByClassName(className)[0];
            if(button) {
                button.click();
                if(button.textContent==="Mostrar resumo") {
                    sendToast("Exercise completed!",3000);
                    playAudio("https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/4x5g14gj.wav")
                }
            }
            return!!button
        }
        async function autoComplete() {
            if(!APP.cfg.auto)return;
            for(const className of buttonClasses) {
                clickButton(className);
                await delay(APP.cfg.autoSpeed/5)
            }
            const checkButton=document.querySelector(checkButtonSelector);
            if(checkButton) {
                checkButton.click();
                await delay(APP.cfg.autoSpeed/5)
            }
        }
        while(true) {
            await autoComplete();
            await delay(APP.cfg.autoSpeed/3)
        }
    }
}
async function initApp() {
    try {
        await Core.loadExternalLibraries();
        UI.init();
        Core.init();
        console.log("â˜ªï¸ EclipseLunar v"+APP.ver+" iniciado com sucesso!");
        sendToast("â˜ªï¸ EclipseLunar v"+APP.ver+" loaded!",3000)
    }
    catch(error) {
        console.error("Erro ao inicializar â˜ªï¸ EclipseLunar:",error);
        sendToast("âš ï¸ Erro ao inicializar â˜ªï¸ EclipseLunar",5000)
    }
}
initApp();
