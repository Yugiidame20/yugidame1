let atual = 0;


const capImg = document.getElementById("cap_img");
const capNum = document.getElementById("cap_num");
const capTitulo = document.getElementById("cap_titulo");
const capDesc = document.getElementById("cap_desc");
const capBtn = document.getElementById("cap_btn");

function carregarCapitulo(index) {
    
    const card =
        document.querySelector(".cap_card");
    
    card.style.opacity = 0;
    
    card.style.transform =
        "translateX(20px)";
    
    setTimeout(() => {
        
        const cap = capitulos[index];
        
        capImg.src = cap.imagem;
        
        capNum.innerText = cap.numero;
        
        capTitulo.innerText = cap.titulo;
        
        capDesc.innerText = cap.descricao;
        
        capBtn.href =
    `leitor.html?id=${cap.id}`;
        
        atualizarDots();
        
        card.style.opacity = 1;
        
        card.style.transform =
            "translateX(0px)";
        
    }, 180);
    
}

function atualizarDots(){

    const dotsContainer =
    document.querySelector(".cap_dots");

    dotsContainer.innerHTML = "";

    capitulos.forEach((_, i)=>{

        const dot =
        document.createElement("span");

        dot.classList.add("dot");

        if(i === atual){
            dot.classList.add("ativo");
        }

        dot.addEventListener("click", ()=>{

            atual = i;

            carregarCapitulo(atual);

        });

        dotsContainer.appendChild(dot);

    });

}

carregarCapitulo(atual);


const card =
document.querySelector(".cap_card");

let startX = 0;
let endX = 0;

card.addEventListener("touchstart", (e)=>{

    startX = e.touches[0].clientX;

});

card.addEventListener("touchend", (e)=>{

    endX = e.changedTouches[0].clientX;

    handleSwipe();

});

function handleSwipe(){

    let diff = startX - endX;

    /* deslizou para esquerda */
    if(diff > 50){

        atual++;

        if(atual >= capitulos.length){
            atual = 0;
        }

        carregarCapitulo(atual);
    }

    /* deslizou para direita */
    else if(diff < -50){

        atual--;

        if(atual < 0){
            atual = capitulos.length - 1;
        }

        carregarCapitulo(atual);
    }

}


const personagensHome = document.getElementById("personagens_home");

const modal = document.getElementById("personagem_modal");
const fecharModal = document.getElementById("fechar_modal");

const modalImg = document.getElementById("modal_img");
const modalNome = document.getElementById("modal_nome");
const modalSubtitulo = document.getElementById("modal_subtitulo");
const modalIntro = document.getElementById("modal_intro");
const modalBtn = document.getElementById("modal_btn");

function carregarPersonagensHome(){

  personagens.forEach(personagem => {

    const card = document.createElement("div");
    card.classList.add("personagem-card");

    card.innerHTML = `
      <img src="${personagem.imagem}" alt="${personagem.nome}">

      <div class="personagem-card-info">
        <h2>${personagem.nome}</h2>
        <p>${personagem.subtitulo}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      abrirModalPersonagem(personagem);
    });

    personagensHome.appendChild(card);

  });

}

function abrirModalPersonagem(personagem){

  modalImg.src = personagem.imagem;
  modalNome.innerText = personagem.nome;
  modalSubtitulo.innerText = personagem.subtitulo;
  modalIntro.innerText = personagem.intro;

  modalBtn.href = `personagens/personagem.html?id=${personagem.id}`;

  modal.classList.add("ativo");
}

fecharModal.addEventListener("click", () => {
  modal.classList.remove("ativo");
});

modal.addEventListener("click", (e) => {
  if(e.target === modal){
    modal.classList.remove("ativo");
  }
});

carregarPersonagensHome();



const abrirMenu = document.getElementById("abrir_menu");
const fecharMenu = document.getElementById("fechar_menu");
const menuLateral = document.getElementById("menu_lateral");
const menuOverlay = document.getElementById("menu_overlay");
const menuItens = document.querySelectorAll(".menu-item");

abrirMenu.onclick = abrirMenuLateral;
fecharMenu.onclick = fecharMenuLateral;
menuOverlay.onclick = fecharMenuLateral;

function abrirMenuLateral(){
  menuLateral.classList.add("ativo");
  menuOverlay.classList.add("ativo");
}

function fecharMenuLateral(){
  menuLateral.classList.remove("ativo");
  menuOverlay.classList.remove("ativo");
}

menuItens.forEach(item => {
  item.addEventListener("click", () => {
    menuItens.forEach(i => i.classList.remove("ativo"));
    item.classList.add("ativo");

    const section = item.dataset.section;
    carregarPainelMenu(section);
  });
});

/* ========================= */
/* SUBMENUS */
/* ========================= */

const menuGrupos =
document.querySelectorAll(".menu-grupo");

menuGrupos.forEach(grupo => {

  const botao =
  grupo.querySelector(".menu-item");

  botao.addEventListener("click", () => {

    const aberto =
    grupo.classList.contains("aberto");

    menuGrupos.forEach(g => {

      g.classList.remove("aberto");

      g.querySelector(".menu-item")
      .classList.remove("ativo");

    });

    if(!aberto){

      grupo.classList.add("aberto");

      botao.classList.add("ativo");

    }

  });

});


/* HISTÓRIA */

const submenuHistoria =
document.getElementById("submenu-historia");

submenuHistoria.innerHTML =
capitulos.map(cap => `

<a href="leitor.html?id=${cap.id}">

${cap.numero} — ${cap.titulo}

</a>

`).join("");



/* PERSONAGENS */

const submenuPersonagens =
document.getElementById("submenu-personagens");

submenuPersonagens.innerHTML =
personagens.map(p => `

<a href="personagens/personagem.html?id=${p.id}">

${p.nome}

</a>

`).join("");

carregarPainelMenu("inicio");