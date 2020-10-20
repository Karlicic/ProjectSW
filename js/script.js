import {findObject, findMovie, movies, people, starships} from "./fetch_data.js";

let residents = []

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
            let htmlString = "<span class='search-resident'>"+ data.name +"</span>"
            details.item(0).innerHTML += htmlString
            checkIfClickedResident()
            loadResident(url, i)
        })
        .catch((err) => {
            console.error(err)
        })

}

function loadMovies(url){
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
            setMovies(data)
        })
        .catch((err) => {
            console.error(err)
        })

}

function setResident(data){
    residents.push(data)
}

function setMovies(data){
    movies.push(data.results)
    displayMoviesInfo()

}

function displayPersonInfo(){
    checkIfClickedResident()
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
            let myCanvas = document.getElementsByTagName('canvas');
            let ctx = myCanvas.item(0).getContext('2d');
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

    let planet = findObject(planetUrl, planets, true)

    let details = document.getElementsByClassName('more-info')
    let name = document.getElementsByTagName('input').item(0).value

    residents.length = 0

    details.item(0).innerHTML = "<h2>" + name + "'s world</h2>"
    details.item(0).innerHTML += "<p> Name: " + planet.name + " <br /> Climate: "+ planet.climate +
        "<br /> Terrain: "+ planet.terrain + "<br /> Population: " + planet.population + "<br/>"+ planet.name + "'s residents:</p>"
    loadResident(planet.residents, 0)
}

function displayStarship(){
    let n = Math.floor(Math.random() * (starships.length - 1))
    let n1 = Math.floor(Math.random() * (starships[n].length - 1))
    document.getElementsByClassName('star').item(0).textContent = starships[n][n1].name
}

function showPoster(num){
     let path = "images/film%23"+ num + ".jpg"
     let img = document.getElementById("poster");
     img.src = path;
     img.style.visibility = "visible";
 }

function displayMoviesInfo(){

    let accordion = document.getElementById('accordion')
    let arr = ['One', 'Two', 'Three', 'Four', 'Five', 'Six']

    for( let i = 0; i<movies[0].length; i++){
        let str1 = "heading" + arr[i]
        let str2 = "collapse" + arr[i]
        let str3 = "#" + str2

        accordion.innerHTML += `
<div class="card">
    <div class="card-header" id=${str1}>
        <h5 class="mb-0">
            <button class="btn text-dark collapsed" data-toggle="collapse" aria-controls=${str2}
            aria-expanded="false"  data-target=${str3} onclick="showPoster(${i+1});" >${movies[0][i].title}</button>
        </h5>
    </div>
    <div id=${str2} class="collapse" aria-labelledby=${str1} data-parent="#accordion">
    <div class="card-body">Director: ${movies[0][i].director} <br/> Producer: ${movies[0][i].producer}
    <br/>Release date: ${movies[0][i].release_date}
    <br/>Opening: ${movies[0][i].opening_crawl}
    </div>
</div>
</div>`

    }
    checkIfClicked()

}

function checkIfClicked(){
    [...document.querySelectorAll('.collapsed')].forEach(function(item) {
        item.addEventListener('click', function() {
            let i = findMovie(item.innerHTML)
            showPoster(i+1);
        });
    });
}

function findPerson(name){
    let inputValue = document.getElementsByTagName("input")
    inputValue.item(0).value = name
    displayPersonInfo()
}

function checkIfClickedResident(){
    [...document.querySelectorAll('.search-resident')].forEach(function(item) {
        item.addEventListener('click', function() {
            findPerson(item.innerHTML)
        });
    });
}

window.addEventListener('load',  () => {
    loadMovies('https://swapi.dev/api/films/');
});
document.getElementsByClassName('search-character').item(0).addEventListener('click', displayPersonInfo)
document.getElementsByClassName('search-starship').item(0).addEventListener('click', displayStarship)


