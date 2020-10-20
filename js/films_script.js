import {people, planets, starships, species, vehicles} from "./fetch_data.js";
import {findObject, findMovie} from "./fetch_data.js";

/*
people = []
planets = []
residents = []
movies = []
starships = []
species = []
vehicles = []



window.addEventListener('load',  () => {loadMovies('https://swapi.dev/api/films/'); loadPlanets('https://swapi.dev/api/planets/');
    loadPeople('https://swapi.dev/api/people/'); loadSpecies('https://swapi.dev/api/species/'); loadStarships('https://swapi.dev/api/starships/');
    loadVehicles('https://swapi.dev/api/vehicles/')});


function loadMovies(url){

    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setMovies(data)
        })
        .catch((err) => {
            console.error(err)
        })
}

function loadPeople(url) {
    if (!url)
    {
        console.log('done')
        return;
    }
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setPeople(data)
            loadPeople(data.next)
        })
        .catch((err) => {
            console.error(err)
        })
}

function loadPlanets(url){
    if(!url)
        return ;
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setPlanets(data.results)
            loadPlanets(data.next)
        })
        .catch((err) => {
            console.error(err)
        })
}

function loadStarships(url){
    if (!url)
    {
        console.log('done')
        return;
    }
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setStarships(data)
            loadStarships(data.next)
        })
        .catch((err) => {
            console.error(err)
        })
}

function loadSpecies(url){
    if (!url)
    {
        console.log('done')
        return;
    }
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setSpecies(data)
            loadSpecies(data.next)
        })
        .catch((err) => {
            console.error(err)
        })
}

function loadVehicles(url){
    if (!url)
    {
        console.log('done')
        return;
    }
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setVehicles(data)
            loadVehicles(data.next)
        })
        .catch((err) => {
            console.error(err)
        })
}

function setMovies(data){
    this.movies.push(data)
    for (let i=0; i<this.movies[0].results.length; i++)
        document.getElementsByClassName('card-header').item(i).textContent = this.movies[0].results[i].title

}

function setPlanets(data){
    planets.push(data)
}

function setPeople(data){
    people.push(data.results)
}

function setSpecies(data){
    species.push(data.results)
}

function setStarships(data){
    starships.push(data.results)

}

function setResident(data){
    residents.push(data)
}

function setVehicles(data){
    vehicles.push(data.results)
}


function addCharacters(num){
    let title = document.getElementsByClassName('filmTitle')
    title.item(0).textContent = movies[0].results[num].title

    let list = document.getElementsByClassName('list-group')
    list.item(0).innerHTML = ``;

    for(let i =0; i<movies[0].results[num].characters.length; i++){
        let char = findCharacter(movies[0].results[num].characters[i])
        if (char != null) {
            list.item(0).innerHTML += `<li class="list-group-item"><a class="character-link" href="#story">${char.name}</a></li>`;
        }
    }
    checkIfClickedCharacter();
}

function addSpecies(num){
    let list = document.getElementsByClassName('list-group')
    list.item(3).innerHTML = ``
    for(let i =0; i<movies[0].results[num].species.length; i++){
        let s = findSpecies(movies[0].results[num].species[i])
        if (s!=null)
            list.item(3).innerHTML += `<li class="list-group-item"><a href="#story" class="specie-link">${s.name}</a></li>`
    }
    checkIfClickedSpecie()
}

function addPlanets(num){
    let list = document.getElementsByClassName('list-group')
    list.item(1).innerHTML = ``
    for(let i =0; i<movies[0].results[num].planets.length; i++){
        let s = findPlanets(movies[0].results[num].planets[i])
        if (s!=null)
            list.item(1).innerHTML += `<li class="list-group-item"><a href="#story" class="planet-link">${s.name}</a></li>`
    }
    checkIfClickedPlanet();
}

function addStarships(num){
    let list = document.getElementsByClassName('list-group')
    list.item(2).innerHTML = ``
    for(let i =0; i<movies[0].results[num].starships.length; i++){
        let s = findStarships(movies[0].results[num].starships[i])
        if (s!=null)
            list.item(2).innerHTML += `<li class="list-group-item"><a href="#story" class="starship-link">${s.name}</a></li>`
    }
    checkIfClickedStarship()
}

function addVehicles(num){
    let list = document.getElementsByClassName('list-group')
    list.item(4).innerHTML = ``
    for(let i =0; i<movies[0].results[num].vehicles.length; i++){
        let s = findVehicles(movies[0].results[num].vehicles[i])
        if (s!=null)
            list.item(4).innerHTML += `<li class="list-group-item"><a href="#story" class="vehicle-link">${s.name}</a></li>`
    }
    checkIfClickedVehicle()
}



function findMovies(url) {
    let arr = movies[0].results
    for(let i = 0; i < arr.length; i++)
        if(arr[i].url.includes(url))
            return arr[i]

    return null
}

function findCharacter(charUrl) {
    for(let i = 0; i < people.length; i++){
        for(let j = 0; j< people[i].length; j++)
        {
            let arr = people[i]
            if(arr[j].url.includes(charUrl))
                return arr[j]
        }
    }
    return null
}

function findCharacterByName(name) {
    for(let i = 0; i < people.length; i++){
        for(let j = 0; j< people[i].length; j++)
        {
            let arr = people[i]
            if(arr[j].name.includes(name))
                return arr[j]
        }
    }
    return null
}

function findSpecies(speciesURL){
    for(let i = 0; i < species.length; i++)
        for(let j = 0; j< species[i].length; j++)
        {
            let arr = species[i]
            if(arr[j].url.includes(speciesURL))
                return arr[j]
        }

    return null
}

function findSpecieByName(name){
    for(let i = 0; i < species.length; i++){
        for(let j = 0; j< species[i].length; j++)
        {
            let arr = species[i]
            if(arr[j].name.includes(name))
                return arr[j]
        }
    }
    return null
}

function findPlanets(url){
    for(let i = 0; i < planets.length; i++)
        if(planets[i].some(item => item.url === url))
            return planets[i].find(item => item.url === url)

    return null
}

function findPlanetByName(name) {
    for(let i = 0; i < planets.length; i++){
        for(let j = 0; j< planets[i].length; j++)
        {
            let arr = planets[i]
            if(arr[j].name.includes(name))
                return arr[j]
        }
    }
    return null
}

function findStarships(url){
    for(let i = 0; i < starships.length; i++)
        for(let j = 0; j< starships[i].length; j++)
        {
            let arr = starships[i]
            if(arr[j].url.includes(url))
                return arr[j]
        }

    return null
}

function findStarshipByName(name){
    for(let i = 0; i < starships.length; i++){
        for(let j = 0; j< starships[i].length; j++)
        {
            let arr = starships[i]
            if(arr[j].name.includes(name))
                return arr[j]
        }
    }
    return null
}

function findVehicles(url){
    for(let i = 0; i < vehicles.length; i++)
        for(let j = 0; j< vehicles[i].length; j++)
        {
            let arr = vehicles[i]
            if(arr[j].url.includes(url))
                return arr[j]
        }
    return null
}

function findVehicleByName(name){
    for(let i = 0; i < vehicles.length; i++){
        for(let j = 0; j< vehicles[i].length; j++)
        {
            let arr = vehicles[i]
            if(arr[j].name.includes(name))
                return arr[j]
        }
    }
    return null
}

*/


window.addEventListener('load',  () => {
    loadMovies('https://swapi.dev/api/films/');
});


let movies = []

function loadMovies(url){

    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setMovies(data)
        })
        .catch((err) => {
            console.error(err)
        })
}

function setMovies(data){
    movies.push(data.results)
    console.log(movies)
    for (let i=0; i<movies[0].length; i++)
        document.getElementsByClassName('card-header').item(i).textContent = movies[0][i].title

}

function addItem(num, isCharacter, isPlanet, isStarship, isSpecies, isVehicle){

    if(isCharacter){
        let title = document.getElementsByClassName('filmTitle')
        title.item(0).textContent = movies[0][num].title

        let list = document.getElementsByClassName('list-group')
        list.item(0).innerHTML = ``;

        for(let i =0; i<movies[0][num].characters.length; i++){
            let char = findObject(movies[0][num].characters[i], people, true)
            if (char != null) {
                list.item(0).innerHTML += `<li class="list-group-item"><a class="character-link" href="#story">${char.name}</a></li>`;
            }
        }
        checkIfClickedCharacter();
    }
    else if(isPlanet){
        let list = document.getElementsByClassName('list-group')
        list.item(1).innerHTML = ``
        for(let i =0; i<movies[0][num].planets.length; i++){
            let s = findObject(movies[0][num].planets[i], planets, true)
            if (s!=null)
                list.item(1).innerHTML += `<li class="list-group-item"><a href="#story" class="planet-link">${s.name}</a></li>`
        }
        checkIfClickedPlanet();
    }
    else if(isStarship){
        let list = document.getElementsByClassName('list-group')
        list.item(2).innerHTML = ``
        for(let i =0; i<movies[0][num].starships.length; i++){
            let s = findObject(movies[0][num].starships[i], starships, true)
            if (s!=null)
                list.item(2).innerHTML += `<li class="list-group-item"><a href="#story" class="starship-link">${s.name}</a></li>`
        }
        checkIfClickedStarship()
    }
    else if(isSpecies){
        let list = document.getElementsByClassName('list-group')
        list.item(3).innerHTML = ``
        for(let i =0; i<movies[0][num].species.length; i++){
            let s = findObject(movies[0][num].species[i], species, true)
            if (s!=null)
                list.item(3).innerHTML += `<li class="list-group-item"><a href="#story" class="specie-link">${s.name}</a></li>`
        }
        checkIfClickedSpecie()
    }
    else if(isVehicle){
        let list = document.getElementsByClassName('list-group')
        list.item(4).innerHTML = ``
        for(let i =0; i<movies[0][num].vehicles.length; i++){
            let s = findObject(movies[0][num].vehicles[i], vehicles,true)
            if (s!=null)
                list.item(4).innerHTML += `<li class="list-group-item"><a href="#story" class="vehicle-link">${s.name}</a></li>`
        }
        checkIfClickedVehicle()
    }

}

function characterDescription(characterName) {
    let temp = []
    let character = findObject(characterName, people, false);
    let specie = findObject(character.species, species, true);
    let planet = findObject(character.homeworld, planets, true);
    let title = document.getElementsByClassName('title').item(0)
    let description = document.getElementsByClassName('description').item(0)
    let pronoun;

    if(character.gender === "male")
        pronoun = "He";
    else if(character.gender === "female")
        pronoun = "She";
    else
        pronoun = "It";

    title.textContent = character.name
    description.innerHTML = `${character.name}, a ${specie.name.toLowerCase()}`
    if(character.birth_year !== "unknown")
            description.innerHTML += ` born in ${character.birth_year}`
    description.innerHTML += `, comes from the planet <a class="planet-link">${planet.name}</a>. ${pronoun} made an appearance in ${character.films.length} Star Wars movies: `
    for(let i =0 ; i <character.films.length; i++) {
        let obj = findObject(character.films[i], movies, true)
        temp.push(obj)
        if (i === character.films.length - 1){
            description.innerHTML += temp[i].title + ". "
        }else {
            description.innerHTML += temp[i].title + ", "
        }
    }
    let arrVehicles = []
    if(character.vehicles.length !== 0){
        for(let i= 0; i <character.vehicles.length; i++){
            arrVehicles[i] = findObject(character.vehicles[i], vehicles, true);
        }
    }
    let arrStarships = []
    if(character.starships.length !== 0){
        for(let i= 0; i <character.starships.length; i++){
            arrStarships[i] = findObject(character.starships[i], starships, true);
        }
    }
    if(character.vehicles.length !== 0 && character.starships.length !== 0){
        description.innerHTML += characterName + ` owns ${character.vehicles.length} vehicles `
        for(let i= 0; i <character.vehicles.length; i++){
            description.innerHTML += `<a class="vehicle-link">${arrVehicles[i].name}</a>, `
        }
        description.innerHTML +=`  and ${character.starships.length} starships `
        for(let i= 0; i <character.starships.length; i++){
            if( i === character.starships.length - 1){
                description.innerHTML += `<a class="starship-link">${arrStarships[i].name}</a>. `
            }
            else
                description.innerHTML += `<a class="starship-link">${arrStarships[i].name}</a>, `
        }
    }
    else if(character.vehicles.length === 0 && character.starships.length === 0){
        description.innerHTML += characterName + ` doesn't own any vehicles nor starships.`
    }
    else if(character.vehicles.length !== 0 && character.starships.length === 0){
        description.innerHTML += characterName + ` owns ${character.vehicles.length} vehicles `
        for(let i= 0; i <character.vehicles.length; i++){
            description.innerHTML += `<a class="vehicle-link">${arrVehicles[i].name}</a>, `
        }
        description.innerHTML += `and doesn't own any starships.`
    }
    else if(character.vehicles.length === 0 && character.starships.length !== 0){
        description.innerHTML += characterName + ` owns ${character.starships.length} starships `
        for(let i= 0; i <character.starships.length; i++){
            description.innerHTML += `<a class="starship-link">${arrStarships[i].name}</a>, `
        }
        description.innerHTML += ` and doesn't own any vehicles.`
    }
    checkIfClickedPlanet()
    checkIfClickedVehicle()
    checkIfClickedStarship()
}

function planetDescription(planetName){
    let planet = findObject(planetName, planets, false)
    let title = document.getElementsByClassName('title').item(0)
    let description = document.getElementsByClassName('description').item(0)
    title.textContent = planetName
    description.innerHTML = `${planetName} is a planet with rotation period of ${planet.rotation_period} and 
    orbital period of ${planet.orbital_period}. It's diameter is ${planet.diameter}. The climate in ${planetName} 
    is ${planet.climate} and the terrain is ${planet.terrain}. There are ${planet.population} residents on this planet. `
    if(planet.residents.length !== 0){
        description.innerHTML += `${planet.residents.length} of ${planetName}'s residents makes an appearance: `
        for(let i = 0; i<planet.residents.length; i++){
            if(i === planet.residents.length- 1)
            {
                description.innerHTML += `<a class="character-link">${findObject(planet.residents[i], people, true).name}</a>. `
                continue
            }
            description.innerHTML += `<a class="character-link">${findObject(planet.residents[i], people, true).name}</a>, `

        }
    }
    checkIfClickedCharacter()
}

function starshipDescription(starshipName){
    let starship = findObject(starshipName, starships, false)
    let title = document.getElementsByClassName('title').item(0)
    let description = document.getElementsByClassName('description').item(0)
    title.textContent = starshipName
    description.innerHTML = `${starshipName}'s characteristics 
<br> Model: ${starship.model} 
<br> Manufacturer: ${starship.manufacturer}
<br> Cost in credits: ${starship.cost_in_credits}
<br> Max atmosphering speed: ${starship.max_atmosphering_speed}
<br> Crew: ${starship.crew}
<br> Passengers: ${starship.passengers}
<br> Cargo capacity: ${starship.cargo_capacity}
<br> Starship class: ${starship.starship_class}
<br> Seen in ${starship.films.length} Star Wars movies: <br>`
    for(let i =0 ; i<starship.films.length; i++){
        description.innerHTML += findObject(starship.films[i], movies, true).title + `<br>`
    }

}

function vehicleDescription(vehicleName){
    let vehicle = findObject(vehicleName, vehicles, false)
    let title = document.getElementsByClassName('title').item(0)
    let description = document.getElementsByClassName('description').item(0)
    title.textContent = vehicleName
    description.innerHTML = `${vehicleName}'s characteristics 
<br> Model: ${vehicle.model} 
<br> Manufacturer: ${vehicle.manufacturer}
<br> Cost in credits: ${vehicle.cost_in_credits}
<br> Max atmosphering speed: ${vehicle.max_atmosphering_speed}
<br> Crew: ${vehicle.crew}
<br> Passengers: ${vehicle.passengers}
<br> Cargo capacity: ${vehicle.cargo_capacity}
<br> Vehicle class: ${vehicle.vehicle_class}
<br> Seen in ${vehicle.films.length} Star Wars movies: <br>`
    for(let i =0 ; i<vehicle.films.length; i++){
        description.innerHTML += findObject(vehicle.films[i], movies, true).title + `<br>`
    }
}

function specieDescription(speciesName){
    let specie = findObject(speciesName, species, false)
    let title = document.getElementsByClassName('title').item(0)
    let description = document.getElementsByClassName('description').item(0)
    title.textContent = speciesName
    description.innerHTML = `${speciesName}s are classified as ${specie.classification}.
    Their average height is ${specie.average_height}. The average ${speciesName} lives around ${specie.average_lifespan}. `
    let str = specie.skin_colors.split(',')
    if(str.length >= 2){
        description.innerHTML +=`These species have variety of races ${specie.skin_colors}.`
    }
    else{
        description.innerHTML +=`Their race is ${specie.skin_colors}.`
    }
    description.innerHTML +=` They come from the homeworld <a class="planet-link">${findObject(specie.homeworld, planets, true).name}</a>. 
    In the Star Wars films we meet with ${specie.people.length} ${speciesName}s: `
    for(let i =0 ; i<specie.people.length; i++){
        if(i === specie.people.length -1){
            description.innerHTML += `<a class="character-link">${findObject(specie.people[i], people, true).name}</a>. `
        }
        else {
            description.innerHTML += `<a class="character-link">${findObject(specie.people[i], people, true).name}</a>, `
        }
    }
    description.innerHTML +=`Their language is ${specie.language}. `
    checkIfClickedCharacter()
    checkIfClickedPlanet()
}

function checkIfClickedMovie(){
    [...document.querySelectorAll('.card-header')].forEach(function(item) {
        item.addEventListener('click', function() {
            let i = findMovie(item.innerHTML)

            console.log(item.innerHTML)
            console.log(i)
            addItem(i, true, false, false, false, false)
            addItem(i, false, true, false, false, false)
            addItem(i, false, false, true, false, false)
            addItem(i, false, false, false, true, false)
            addItem(i, false, false, false, false, true)
        });
    });
}

function checkIfClickedCharacter(){
    [...document.querySelectorAll('.character-link')].forEach(function(item) {
        item.addEventListener('click', function() {
            characterDescription(item.innerHTML)
        });
    });
}

function checkIfClickedPlanet(){
    [...document.querySelectorAll('.planet-link')].forEach(function(item) {
        item.addEventListener('click', function() {
            planetDescription(item.innerHTML)
        });
    });
}

function checkIfClickedStarship(){
    [...document.querySelectorAll('.starship-link')].forEach(function(item) {
        item.addEventListener('click', function() {
            starshipDescription(item.innerHTML)
        });
    });
}

function checkIfClickedVehicle(){
    [...document.querySelectorAll('.vehicle-link')].forEach(function(item) {
        item.addEventListener('click', function() {
            vehicleDescription(item.innerHTML)
        });
    });
}

function checkIfClickedSpecie(){
    [...document.querySelectorAll('.specie-link')].forEach(function(item) {
        item.addEventListener('click', function() {
            specieDescription(item.innerHTML)
        });
    });
}

checkIfClickedMovie()

export {checkIfClickedPlanet, checkIfClickedCharacter, checkIfClickedStarship,checkIfClickedSpecie, checkIfClickedVehicle}