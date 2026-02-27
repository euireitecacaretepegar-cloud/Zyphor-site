const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const chat = document.getElementById("chat");
const input = document.getElementById("input");
const face = document.getElementById("face");
const mouth = document.getElementById("mouth");

startBtn.onclick = () => {
  intro.style.display = "none";
  chat.style.display = "flex";
};

// Piscar a cada 4 segundos
setInterval(() => {
  face.src = "images/face_blink.png";
  setTimeout(() => {
    face.src = "images/face_neutral.png";
  }, 400);
}, 4000);

// Perguntas fixas
function respostaFixa(pergunta) {
  pergunta = pergunta.toLowerCase();

  if (pergunta.includes("at3na"))
    return ["explodida em pedaços, porém, o que sobrou foi recuperado.", "psycho"];

  if (pergunta.includes("asmodeus"))
    return ["Shub-niggurath irá matar TODOS, mas tem alguém que não apoia essa escolha.", "angry"];

  if (pergunta.includes("sv"))
    return ["o inferno... MERECEM MUITO PIOR QUE ISSO.", "angry"];

  if (pergunta.includes("nulø"))
    return ["_Principe do Ódio_", "psycho"];

  if (pergunta.includes("poder do nulø"))
    return ["_Quais?_", "smile"];

  if (pergunta.includes("nulø quer"))
    return ["_Dor_", "angry"];

  if (pergunta.includes("lorde do limbo") || pergunta.includes("deus"))
    return ["DEUS destronou o anjo da luz Samuel...", "psycho"];

  return null;
}

input.addEventListener("keypress", async function(e){
  if (e.key === "Enter") {

    const pergunta = input.value;
    const fixa = respostaFixa(pergunta);

    let resposta;
    let emocao = "neutral";

    if (fixa) {
      resposta = fixa[0];
      emocao = fixa[1];
    } else {
      const r = await fetch("/.netlify/functions/zyphor", {
        method:"POST",
        body: JSON.stringify({pergunta})
      });
      const data = await r.json();
      resposta = data.resposta;
    }

    animarBoca();
    mudarExpressao(emocao);

    console.log(resposta);
    input.value="";
  }
});

function animarBoca(){
  let i=0;
  const anim = setInterval(()=>{
    mouth.src = i%2===0 ?
      "images/mouth_open.png" :
      "images/mouth_closed.png";
    i++;
  },200);

  setTimeout(()=>clearInterval(anim),2000);
}

function mudarExpressao(tipo){
  face.src = "images/face_"+tipo+".png";
}