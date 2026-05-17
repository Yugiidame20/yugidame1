const params =
new URLSearchParams(window.location.search);

const id =
parseInt(params.get("id"));

const capitulo =
capitulos.find(c => c.id === id);

let atual = 0;

const page =
document.getElementById("page");

function renderizarPagina(){

    const pagina =
    capitulo.paginas[atual];
    
    document.body.classList.remove(
    "modo-texto",
    "modo-imagem"
    );

   /* CAPA */

if(pagina.tipo === "capa"){

    page.innerHTML = `

    <div class="capa">

        <img
        src="${pagina.imagem}"
        class="img_capa">

    </div>

    `;

}

    /* SUMÁRIO */
    else if(pagina.tipo === "sumario"){

        page.innerHTML = `

        <div class="sumario">

            <h1>SUMÁRIO</h1>

            ${pagina.itens.map(item =>
            `<p>${item}</p>`).join("")}

        </div>
        `;
    }

/* TEXTO */
else if(pagina.tipo === "texto"){
    
    document.body.classList.add(
    "modo-texto"
    );
    
    page.innerHTML = `

    <div class="texto-container">

        <div class="texto">

            ${pagina.conteudo.map(paragrafo =>

            `<p>${paragrafo}</p>`

            ).join("")}

        </div>

        <div class="rodape-leitura">

            <div class="linha"></div>

            <div class="info-rodape">

                <span class="livro">
                Yugidame
                </span>

                <span class="numero-pagina">
                ${atual + 1}
                </span>

            </div>

        </div>

    </div>
    `;
}

    /* IMAGEM */
    else if(pagina.tipo === "imagem"){
        
        document.body.classList.add(
"modo-imagem"
);

        
        page.innerHTML = `

        <div class="imagem">

            <img src="${pagina.imagem}">

        </div>
        `;
    }

}

renderizarPagina();

/* SWIPE */

let startX = 0;

let endX = 0;

page.addEventListener("touchstart", e => {

    startX =
    e.touches[0].clientX;

});

page.addEventListener("touchend", e => {

    endX =
    e.changedTouches[0].clientX;

    let diff = startX - endX;

    /* PRÓXIMA */

    if(diff > 50){

        if(atual <
        capitulo.paginas.length -1){

            atual++;

            renderizarPagina();
        }

    }

    /* ANTERIOR */

    else if(diff < -50){

        if(atual > 0){

            atual--;

            renderizarPagina();
        }

    }

});