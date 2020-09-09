var people = []
var planet = []
var residents = []
var movies = []
var starship = []

function loadMovies(url){
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            movies.push(data)
            console.log(movies)
        })
        .catch((err) => {
            console.error(err)
        })
}

function loadData(url) {
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
            setData(data)
            loadData(data.next)
        })
        .catch((err) => {
            console.error(err)
        })

}

function loadPlanet(url){
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setPlanet(data)
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

function loadStarship(url){
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setStarship(data)
        })
        .catch((err) => {
            console.error(err)
        })
}

function displayPersonInfo(){
    let name = document.getElementsByTagName('input').item(0).value
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
                    <td class="value"><button type="button" onclick="displayPlanetInfo()">Show</button></td>
                </tr>

                </tbody>`
            value.item(0).textContent = personInfo.birth_year
            value.item(1).textContent = personInfo.height
            value.item(2).textContent = personInfo.mass
            value.item(3).textContent = personInfo.gender
            flag = 0
            loadPlanet(personInfo.homeworld)
        }
    if (flag){
        document.getElementsByTagName('table').item(0).innerHTML = 'Not found!'
    }
}

function setPlanet(data){
    planet= data
}

function setData(data){
    people.push(data.results)
}

function displayPlanetInfo(){
    let details = document.getElementsByClassName('more-info')
    let name = document.getElementsByTagName('input').item(0).value

    residents.length = 0

    details.item(0).innerHTML = "<h2>" + name + "'s world</h2>"
    details.item(0).innerHTML += "<p> Name: " + planet.name + " <br /> Climate: "+ planet.climate +
        "<br /> Terrain: "+ planet.terrain + "<br /> Population: " + planet.population + "<br/>"+ planet.name + "'s residents:"
    loadResident(planet.residents, 0)
    details.item(0).innerHTML += "</p>"
}

function setResident(data){
    residents.push(data)
}

function findPerson(i){
    let inputValue = document.getElementsByTagName("input")
    inputValue.item(0).value = residents[i-1].name
    displayPersonInfo()
}

function displayMovies(){
    let card = document.getElementsByClassName('card')

    for( let i = 0; i<movies[0].count; i++){
        card.item(0).innerHTML += `<div class="card-header">
                    <h5 class="mb-0">
                        <button aria-expanded="true" class="btn text-dark"
                                type="button">`+ movies[0].results[i].title + `</button>
                    </h5>
                </div>
                    <div class="card-body">Director: `+ movies[0].results[i].director + `<br/>Release date:` +
            movies[0].results[i].release_date  + `<br/>Opening :` + movies[0].results[i].opening_crawl + `</div>`
    }
    document.getElementsByClassName('btn').item(0).disabled = true
}

function setStarship(data){
    starship = data
}

function displayStarship(){
    let n = Math.floor(Math.random() * 36) + 1
    loadStarship('https://swapi.dev/api/starships/' + n.toString() + '/')

    let show = document.getElementsByClassName('star')
    show.item(0).textContent = starship.name
    console.log(starship)
}




