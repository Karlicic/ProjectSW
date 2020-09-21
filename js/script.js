var people = []
var planets = []
var residents = []
var movies = []
var starships = []
var species = []
var vehicles = []

function loadMovies(url){
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            movies.push(data)
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

function loadResident(url, i){
    if (i >= url.length)
        return ;
    fetch(url[i])
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setResident(data)
            i += 1
            let details = document.getElementsByClassName('more-info')
            let htmlString = "<span onclick='findPerson("+ i +")'>"+ data.name +", </span>"
            details.item(0).innerHTML += htmlString
            loadResident(url, i)
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

function displayPersonInfo(){
    let name = document.getElementsByTagName('input').item(0).value.trim()
    let value = document.getElementsByClassName('value')
    let personInfo
    let flag = 1
    for (let i = 0; i<people.length; i++)
        if (people[i].some(item => item.name === name)){
            personInfo = people[i].find(item => item.name === name)
            document.getElementsByTagName('table').item(0).innerHTML = `<tbody>
                <tr>
                    <td class="field">Birth Year</td>
                    <td class="value"></td>
                </tr>
                <tr>
                    <td class="field">Height</td>
                    <td class="value"></td>
                </tr>
                <tr>
                    <td class="field">Mass</td>
                    <td class="value"></td>
                </tr>
                <tr>
                    <td class="field">Gender</td>
                    <td class="value"></td>
                </tr>
                <tr>
                    <td class="field">Homeworld</td>
                    <td class="value"><button id="btn-homeworld" type="button">Show</button></td>
                </tr>
                <tr>
                    <td class="field">Eye color</td> 
                    <td class="value"><canvas></canvas></td>          
                </tr>
                </tbody>`
            value.item(0).textContent = personInfo.birth_year
            value.item(1).textContent = personInfo.height
            value.item(2).textContent = personInfo.mass
            value.item(3).textContent = personInfo.gender
            var myCanvas = document.getElementsByTagName('canvas');
            var ctx = myCanvas.item(0).getContext('2d');
            ctx.fillStyle = personInfo.eye_color
            ctx.fillRect(0,0, 500, 500)
            ctx.fill();

            document.getElementById('btn-homeworld').addEventListener('click', function(){ displayPlanetInfo(personInfo.homeworld);})

            flag = 0
        }
    if (flag){
        document.getElementsByTagName('table').item(0).innerHTML = 'Not found!'
    }
}

function displayPlanetInfo(planetUrl){

    let planet = findPlanet(planetUrl)

    let details = document.getElementsByClassName('more-info')
    let name = document.getElementsByTagName('input').item(0).value

    residents.length = 0

    details.item(0).innerHTML = "<h2>" + name + "'s world</h2>"
    details.item(0).innerHTML += "<p> Name: " + planet.name + " <br /> Climate: "+ planet.climate +
        "<br /> Terrain: "+ planet.terrain + "<br /> Population: " + planet.population + "<br/>"+ planet.name + "'s residents:</p>"
    loadResident(planet.residents, 0)
    //details.item(0).innerHTML += "</p>"
}

function displayStarship(){
    let n = Math.floor(Math.random() * (starships.length - 1))
    let n1 = Math.floor(Math.random() * (starships[n].length - 1))
    document.getElementsByClassName('star').item(0).textContent = starships[n][n1].name
}

function displayMoviesInfo(){

    let accordion = document.getElementById('accordion')
    let arr = ['One', 'Two', 'Three', 'Four', 'Five', 'Six']

    for( let i = 0; i<movies[0].count; i++){
        let str1 = "heading" + arr[i]
        let str2 = "collapse" + arr[i]
        let str3 = "#" + str2

        accordion.innerHTML += `

<div class="card">
    <div class="card-header" id=${str1}>
        <h5 class="mb-0">
            <button class="btn text-dark collapsed" data-toggle="collapse" aria-controls=${str2}
            aria-expanded="false"  data-target=${str3} onclick="showPoster(${i+1});" >${movies[0].results[i].title}</button>
        </h5>
    </div>
    <div id=${str2} class="collapse" aria-labelledby=${str1} data-parent="#accordion">
    <div class="card-body">Director: ${movies[0].results[i].director} <br/> Producer: ${movies[0].results[i].producer}
    <br/>Release date: ${movies[0].results[i].release_date}
    <br/>Opening: ${movies[0].results[i].opening_crawl}
    </div>
</div>
</div>`

    }
}

function findPerson(i){
    let inputValue = document.getElementsByTagName("input")
    inputValue.item(0).value = residents[i-1].name
    displayPersonInfo()
}

function findChar(charUrl) {
    for(let i = 0; i < people.length; i++)
        if(people[i].some(item => item.url === charUrl))
            return people[i].find(item => item.url === charUrl)

    return null
}

function findSpecies(speciesURL){
    for(let i = 0; i < species.length; i++)
        if(species[i].some(item => item.url === speciesURL))
            return species[i].find(item => item.url === speciesURL)

    return null
}

function findPlanets(url){
    for(let i = 0; i < planets.length; i++)
        if(planets[i].some(item => item.url === url))
            return planets[i].find(item => item.url === url)

    return null
}

function findStarships(url){
    for(let i = 0; i < starships.length; i++)
        if(starships[i].some(item => item.url === url))
            return starships[i].find(item => item.url === url)

    return null
}

function findVehicles(url){
    for(let i = 0; i < vehicles.length; i++)
        if(vehicles[i].some(item => item.url === url))
            return vehicles[i].find(item => item.url === url)

    return null
}

function showPoster(num){
    let path = "images/film%23"+ num + ".jpg"
    let img = document.getElementById("poster");
    img.src = path;
    img.style.visibility = "visible";
}

function showCardBlockTitle(){
    console.log(movies)
    let card = document.getElementsByClassName('card-block')
    for (let i = 0 ; i< movies[0].count; i ++){
        card.item(i).innerHTML =`<h1><a href="#film">${movies[0].results[i].title}</a></h1>`
    }
}

function addCharacters(num){
    let title = document.getElementsByClassName('filmTitle')
    title.item(0).textContent = movies[0].results[num].title

    let list = document.getElementsByClassName('list-group')
    list.item(0).innerHTML = ``

    for(let i =0; i<movies[0].results[num].characters.length; i++){
        var char = findChar(movies[0].results[num].characters[i])
        console.log(char)
        if (char!=null) {
            list.item(0).innerHTML += `<li class='list-group-item' onclick='characterDescription(${char});'>${char.name}</li>`
        }
    }
}

function addSpecies(num){
    let list = document.getElementsByClassName('list-group')
    list.item(3).innerHTML = ``
    for(let i =0; i<movies[0].results[num].species.length; i++){
        let s = findSpecies(movies[0].results[num].species[i])
        if (s!=null)
            list.item(3).innerHTML += `<li class="list-group-item">${s.name}</li>`
    }
}

function addPlanets(num){
    let list = document.getElementsByClassName('list-group')
    list.item(1).innerHTML = ``
    for(let i =0; i<movies[0].results[num].planets.length; i++){
        let s = findPlanets(movies[0].results[num].planets[i])
        if (s!=null)
            list.item(1).innerHTML += `<li class="list-group-item">${s.name}</li>`
    }
}

function addStarships(num){
    let list = document.getElementsByClassName('list-group')
    list.item(2).innerHTML = ``
    for(let i =0; i<movies[0].results[num].starships.length; i++){
        let s = findStarships(movies[0].results[num].starships[i])
        if (s!=null)
            list.item(2).innerHTML += `<li class="list-group-item">${s.name}</li>`
    }
}

function addVehicles(num){
    let list = document.getElementsByClassName('list-group')
    list.item(4).innerHTML = ``
    for(let i =0; i<movies[0].results[num].vehicles.length; i++){
        let s = findVehicles(movies[0].results[num].vehicles[i])
        if (s!=null)
            list.item(4).innerHTML += `<li class="list-group-item">${s.name}</li>`
    }
}

function findMovies(url){
    for(let i = 0; i < movies.length; i++)
        if(movies[i].some(item => item.url === url))
            return movies[i].find(item => item.url === url)

    return null
}

function characterDescription(character){
    let temp = []
    let title = document.getElementsByClassName('title').item(0)
    title.textContent = character.name
    let description = document.getElementsByClassName('description').item(0)
    description.innerHTML = `${character.name} made an appearance in ${character.films.length} Star Wars movies.`
    for(let i =0 ; i <character.films.length; i++) {
        temp.push(findMovies(character.films[i]))
        console.log(temp)
        description.innerHTML += temp[i].title
    }
}

document.getElementsByClassName('card-block').item(0).addEventListener('click',function (){
        addCharacters(0); addPlanets(0); addStarships(0);addVehicles(0);addSpecies(0);})
document.getElementsByClassName('card-block').item(1).addEventListener('click',function (){
    addCharacters(1); addPlanets(1); addStarships(1);addVehicles(1);addSpecies(1);})
document.getElementsByClassName('card-block').item(2).addEventListener('click',function (){
    addCharacters(2); addPlanets(2); addStarships(2);addVehicles(2);addSpecies(2);})
document.getElementsByClassName('card-block').item(3).addEventListener('click',function (){
    addCharacters(3); addPlanets(3); addStarships(3);addVehicles(3);addSpecies(3);})
document.getElementsByClassName('card-block').item(4).addEventListener('click',function (){
    addCharacters(4); addPlanets(4); addStarships(4);addVehicles(4);addSpecies(4);})
document.getElementsByClassName('card-block').item(5).addEventListener('click',function (){
    addCharacters(5); addPlanets(5); addStarships(5);addVehicles(5);addSpecies(5);})

