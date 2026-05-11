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