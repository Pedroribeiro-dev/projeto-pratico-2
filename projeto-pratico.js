let paginaAtualUrl = 'https://rickandmortyapi.com/api/character'


window.onload = async () => {
    try {
        await loadCharacters(paginaAtualUrl); //funçao ta chamando a api que esta dentro de uma variavel
    } catch (error) {
        console.log(error);
    }

    const proximoBotao = document.getElementById('proximo');
    const botaoAnterior = document.getElementById('voltar');

    proximoBotao.addEventListener('click', carregarProxPag)
    botaoAnterior.addEventListener('click', carregarPagAnterior)


};
/*ao carregar a pagina vai executar essa funçao que executa uma funçao de callback ,
 onde se der tudo certo carrega os personagens, caso contrario vai apresentar o erro */

async function loadCharacters(url) {                  // essa vai ser a composiçao da funcao loadCharacter que executamos acima.
    const charactersContent = document.getElementById('characters-content');
    charactersContent.innerHTML = '' /*aqui toda vez que carregar a funçao ele vai limpar os filhos de characters content.
    e como eu logo apos no try crio esse filhos atraves do for each, ou seja toda vez que alterar a pagina da api
    ele vai criar de novo os cards com os personagens da pagina atual*/


    try {
        const resposta = await fetch(url);
        const conversao = await resposta.json();

        conversao.results.forEach((character, item) => {
            const card = document.createElement('div')
            card.style.backgroundImage = `url(https://rickandmortyapi.com/api/character/avatar/${character.image.replace(/\D/g, "")}.jpeg)`;
            //aqui eu estou pegando a url de image e colocando que atraves do replace é pra pegar o numero do id do personagem autal da iteraçao pra mostrar a imagem dele
            card.className = 'cards';

            const boxName = document.createElement('div');
            boxName.className = 'name-characters-box';



            const name = document.createElement('span');
            name.className = 'characters-name';
            name.innerText = character.name;

            boxName.appendChild(name)
            card.appendChild(boxName)

            card.onclick = infoModal
            charactersContent.appendChild(card)
            card.dataset.characterposition = item
            card.dataset.id = character.id


        });

        const proximoBotao = document.getElementById('proximo');
        const botaoAnterior = document.getElementById('voltar');

        proximoBotao.disabled = !conversao.info.next
        botaoAnterior.disabled = !conversao.info.prev

        botaoAnterior.style.visibility = conversao.info.prev ? 'visible' : 'hidden'

        paginaAtualUrl = url /* aqui eu digo que a variavel é igual ao parametro que vai receber um argumento que vai ser uma paginaçao da api,
        quando eu faço isso eu altero de forma dinamica a variavel com a pagina que estamos atualmente,como alteramos conforme usamos os botoes,
        temos que atualizar pra api comprender  qual pagina estamos e qual deve ser a proxima ou anterior */



    } catch (error) {
        console.log(error)
        console.log('erro ao carregar')
    }

};

async function carregarProxPag() {
    if (!paginaAtualUrl) return;
    try {

        const resposta = await fetch(paginaAtualUrl); /* como logo acima eu digo que a pagina atual é igual a url, quando eu faço a requisiçao fetch aqui 
        eu ja nao estou fazendo mais pra pagina inicial necessariamente eu to fazendo pra pagina em que ele estiver */
        const conversao = await resposta.json();



        await loadCharacters(conversao.info.next)
        console.log(paginaAtualUrl)

    } catch (error) {
        console.log(error, 'erro ao carregar proxima pagina')
    }
}

async function carregarPagAnterior() {
    if (!paginaAtualUrl) return;
    try {
        const resposta = await fetch(paginaAtualUrl);
        const conversao = await resposta.json();



        await loadCharacters(conversao.info.prev)


    } catch (error) {
        console.log(error, 'erro ao carregar pagina anterior')
    }
}

function escondeModal() {
    const modal = document.getElementById('modal')
    modal.style.visibility = 'hidden'

}

async function infoModal(cards) {
    const modal = document.getElementById('modal')
    modal.style.visibility = 'visible'
    const modalContent = document.getElementById('modal-content')
    const cardEspecifico = cards.target.dataset.characterposition
    const idEspecifico = cards.target.dataset.id
    modalContent.innerHTML = ''
    console.log(cards.target)
    try {
        const resposta = await fetch(paginaAtualUrl);
        const conversao = await resposta.json();

        const image = document.createElement('div');
        image.style.backgroundImage = `url(https://rickandmortyapi.com/api/character/avatar/${idEspecifico}.jpeg)`;
        image.className = 'image-modal';
        modalContent.appendChild(image)
        console.log(image.style.backgroundImage)

        const name = document.createElement('span');
        name.innerText = `Nome: ${conversao.results[cardEspecifico].name}`;
        name.className = 'data-modal';
        console.log(name.innerText)
        modalContent.appendChild(name)

        const species = document.createElement('span');
        if (conversao.results[cardEspecifico].species === 'Human') {
            species.innerText = 'Especie: Humano';
        }
        if (conversao.results[cardEspecifico].species === 'Alien') {
            species.innerText = 'Especie: Alien';
        }
        if (conversao.results[cardEspecifico].species === 'Humanoid') {
            species.innerText = 'Especie: Humanoide';
        }
        if (conversao.results[cardEspecifico].species === 'Mythological Creature') {
            species.innerText = 'Especie: Criatura Mitologica';
        }
        if (conversao.results[cardEspecifico].species === 'Animal') {
            species.innerText = 'Especie: Animal';
        }
        if (conversao.results[cardEspecifico].species === 'Robot') {
            species.innerText = 'Especie: Robo';
        } if (conversao.results[cardEspecifico].species === 'Disease') {
            species.innerText = 'Especie: doenca';
        }
        species.className = 'data-modal';
        console.log(species.innerText)
        modalContent.appendChild(species)

        const gender = document.createElement('span');
        if (conversao.results[cardEspecifico].gender === 'Female') {
            gender.innerText = `Genero: Femea`;
        }
        if (conversao.results[cardEspecifico].gender === 'Male') {
            gender.innerText = `Genero: Macho`;
        }
        if (conversao.results[cardEspecifico].gender === 'Genderless') {
            gender.innerText = `Genero: Sem Genero`;
        } if (conversao.results[cardEspecifico].gender === 'unknown') {
            gender.innerText = `Genero: Desconhecido`;
        }
        gender.className = 'data-modal';
        modalContent.appendChild(gender)

        const status = document.createElement('span');
        status.innerText = `Status: ${conversao.results[cardEspecifico].status}`;
        status.className = 'data-modal';
        modalContent.appendChild(status);

        const location = document.createElement('span');
        location.innerText = `localizacao: ${conversao.results[cardEspecifico].location.name}`;
        location.className = 'data-modal';
        modalContent.appendChild(location);


    } catch (error) {
        console.log('deu erro na modal', error)
    }

};
