// Grupos de imagens a serem exibidas
const GRUPOS = {
    '0': [1, 3, 5, 7, 9, 11, 13, 15],
    '1': [2, 3, 6, 7, 10, 11, 14, 15],
    '2': [4, 5, 6, 7, 12, 13, 14, 15],
    '3': [8, 9, 10, 11, 12, 13, 14, 15]
};

// Variáveis de controle
let ETAPA = 0;
let n = 0;
let TEMA = 'airlines'

// Função para gerar um número aleatório, dados um valor mínimo e um máximo
function numAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para gerar uma cópia embaralhada de um array
function embaralhar(arrayOriginal) {
    let arrayEmbaralhado = [];
    let indices = [];
    for (let i = 0; i < arrayOriginal.length; i++) indices.push(i);
    while (arrayEmbaralhado.length < arrayOriginal.length) {
        let indice = numAleatorio(0, indices.length - 1);
        arrayEmbaralhado.push(arrayOriginal[indices[indice]]);
        indices.splice(indice, 1);
    }
    return arrayEmbaralhado;
}

// Função que retorna um array com os números de 1 até 15, para facilitar a exibição de todas as imagens
function todas() {
    let arr = [];
    for (let i = 1; i <= 15; i++) {
        arr.push(i);
    }
    return arr;
}

// Função que define a mensagem que será exibida
function mensagem(texto) {
    document.getElementById(`mensagem`).textContent = texto;
}

// Função que exibe as imagens, dado um array de números referentes a elas
function exibeImagens(numeros_imagens) {
    let display = document.getElementById('imagens');
    display.innerHTML = '';
    let imagens = embaralhar(numeros_imagens);
    (imagens.length == 15) ? display.style.width = '700px': display.style.width = '560px';
    imagens.forEach((el) => {
        let img = document.createElement('img');
        img.setAttribute('src', `img/${TEMA}/${el}.jpg`);
        display.appendChild(img);
    });
}

// Função que exibe a imagem escolhida ao final
function exibeImagemEscolhida(numero) {
    let display = document.getElementById('imagens');
    display.innerHTML = '';
    display.classList.add('img_escolhida');
    let img = document.createElement('img');
    img.setAttribute('src', `img/${TEMA}/${numero}.jpg`);
    display.appendChild(img);
}

// Inicia o jogo
function iniciar() {
    mensagem('A figura escolhida é uma destas?');
    document.getElementById('iniciar').hidden = true;
    document.getElementById('sim').hidden = false;
    document.getElementById('nao').hidden = false;
    exibeImagens(GRUPOS[ETAPA]);
}

// Finaliza o jogo mostrando o resultado
function finalizar(soma) {
    if (soma > 0) {
        mensagem('Você escolheu essa imagem!');
        exibeImagemEscolhida([n]);
        document.getElementById('sim').hidden = true;
        document.getElementById('nao').hidden = true;
        document.getElementById('reiniciar').hidden = false;
    } else {
        mensagem('Você não escolheu nenhuma imagem, ou não jogou justo!');
    }
}

// Computa a resposta do usuário, se a imagem está ou não no grupo mostrado, e segue o jogo
function resposta(sim) {
    (sim) ? n += 2 ** ETAPA++: ETAPA++;
    if (ETAPA === 4) {
        finalizar(n);
    } else {
        exibeImagens(GRUPOS[ETAPA]);
    }
}

// Abre o modal com as escolhas
const openModal = function () {
    document.querySelector('.modal').classList.remove('hidden');
    document.querySelector('.overlay').classList.remove('hidden');
};

// Fecha o modal
const closeModal = function () {
    document.querySelector('.modal').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
};

// Define o tema escolhido e inicia o jogo
function escolherTema(tema) {
    mensagem('Memorize uma imagem:');
    document.getElementById('iniciar').hidden = false;
    TEMA = tema;
    closeModal();
    exibeImagens(todas());
}

// Função de inicialização da página e reinício do jogo
function init() {
    openModal();
    document.getElementById('sim').hidden = true;
    document.getElementById('nao').hidden = true;
    document.getElementById('reiniciar').hidden = true;
    document.getElementById('airlines').addEventListener('click', () => escolherTema('airlines'));
    document.getElementById('cachorros').addEventListener('click', () => escolherTema('cachorros'));
    mensagem('');
    document.getElementById('imagens').innerHTML = "";
}
init()