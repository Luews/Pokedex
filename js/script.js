const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__img');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const prev = document.querySelector('.bnt-prev');
const next = document.querySelector('.bnt-next');

let searchPokemon = 1;
// Aqui nós criamos constantes para linkarmos as nossas classes do nosso index.html do nosso site

const fetchPokemon = async (pokemon) => {
     
    //  ERRO const APIResponse = await fetch ('https://pokeapi.co/api/v2/pokemon/${pokemon)');

    // Aqui para conseguirmos pegar as infos da data das tags que a gente quer dessa API

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {

        const data = await APIResponse.json();
        return data;
    }
    

}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data) {
        pokemonImage.style.display ='block'
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

        // DICA MUITO FODA: para referências pra puxar algum data, exemplo.exemplo, vão existir alguns que vão ter traços, underlines etc
        // pra isso você pode passar em forma de colchete e '', assim sendo para fazer caminhos, como você vai
        // passar de uma forma mais direta 


        // Os links para a página html pokeAPI, a tag name e id pegando de info

        input.value = '';
        // aqui é quando nosso input for realizado ele retorne a caixinha de search vazia, MUITO ÚTIL!


        searchPokemon= data.id
        // serve para o valor inicial da data do id atualizar (resumindo bem, caso eu faça uma pesquisa de exemplo 200, ele vai pesquisar certinho
        // porém quando eu clickar pro próximo ele vai me retornar o valor anterior, resumindo bem é para atualizar o valor inical e padrão, para assim
        // no clique de next ele realmente ir pro próximo, de next prev, tanto faz, ATUALIZAÇÃo mesmo 
    }else{
        pokemonImage.style.display ='none'
        pokemonName.innerHTML = 'Not Found :( ';
        pokemonNumber.innerHTML = '';
    }
}


form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    //  aqui nós vamos passar o valor do nosso input ligando o nosso input no nessa const renderPokemon, assim fazendo 
    // que nossa informação passe pela API do pokemon e nos retornte: gif, nome e número
});


prev.addEventListener('click', () => {
    if (searchPokemon >1 ){

        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    }
    
    
})

next.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)
