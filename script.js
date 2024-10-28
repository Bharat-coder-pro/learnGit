let pokI = -1;
let pokImgs = {};
let input = document.getElementById('search-input');
const pokName = document.getElementById('pokemon-name');
const pokId = document.getElementById('pokemon-id');
const form = document.getElementById('inputForm');
const specAttack = document.getElementById('special-attack');
const specDefense = document.getElementById('special-defense');
const pokImg = document.getElementById('sprite');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const hp = document.getElementById('hp');
const speed = document.getElementById('speed');

form.addEventListener('submit',(e)=>{
  e.preventDefault();
 fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon')
.then((res)=>res.json())
.then((data)=>{
 let pokemons = data.results;
 pokI = searchPokemon(pokemons, input.value);
  displayPokemon(pokemons, pokI);
})
.catch((err)=>{
  console.error(err);
});
})

const searchPokemon = (pokemons, input) => {
  if(isNaN(parseInt(input))){
 pokI = pokemons.findIndex((pokemon)=>pokemon.name===input.toLowerCase().trim());
 return pokI;
  } else{
    pokI = pokemons.findIndex((pokemon)=>pokemon.id===parseInt(input));
    return pokI;
  }
}

const displayPokemon = (pokemons, pokI) => {
  if(pokI>=0 && pokI<=pokemons.length-1){
    const gotPoke = pokemons[pokI]; 
    const gotPokeFeats = {};
    const {id,name,url} = gotPoke;
    pokId.textContent = "#"+id;
    pokName.textContent = name.toUpperCase();
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
      height.textContent = data.height;
      pokImgs=data.sprites;
      pokImg.src = data.sprites.front_default;
      let stats = data.stats;
      hp.textContent = stats[0].base_stat;
      attack.textContent = stats[1].base_stat;
      defense.textContent = stats[2].base_stat;
      specAttack.textContent=stats[3].base_stat;
      specDefense.textContent=stats[4].base_stat;
      speed.textContent = stats[5].base_stat;
      types.innerHTML = ``;
      data.types.forEach((typed)=>{
        types.innerHTML += `<span id="type">${typed.type.name}</span>`
      });
      weight.textContent = data.weight;
      input.value = '';
    })
    .catch((err)=>{
      console.error(err)
    })
  }
  else{
    alert("Pokémon not found");
    input.value='';
  }
}
pokImg.addEventListener("click",()=>{
  let keys = Object.keys(pokImgs);
  pokImg.src = pokImgs[keys[Math.floor(Math.random()*keys.length)]];
})
