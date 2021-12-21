
let div = document.querySelector("#tv-list")
let div2 = document.querySelector("#display-info")
let detailsDiv = document.querySelector("#details")
let btnDiv = document.querySelector(".btndiv")
let iframe = document.querySelector("iframe")
let searchBar = document.querySelector(".example")
let tvShows = []

fetch(" http://localhost:3000/tv")
.then(resp => resp.json())
.then(allTvArray => {
    //console.log(allTvArray)

    tvShows = allTvArray
    allTvArray.forEach(tvDisplay => television(tvDisplay))
})


function television(tvDisplay) {
let span = document.createElement("span")
span.innerHTML = tvDisplay.title
span.id = tvDisplay.id
div.append(span)

span.addEventListener("click", (e) => {
    console.log(e)
   
    let h3= document.createElement("h2")
    let h4 = document.createElement("h3")
    let h2 = document.createElement("h1")
    h2.textContent = tvDisplay.title
    iframe.src = tvDisplay.video
    h3.textContent = tvDisplay.contenttype
    h4.textContent = tvDisplay.rating
    
    let iCheck = document.createElement("i")
    iCheck.className = "fa-check"
    iCheck.textContent = "✅ "

    let iTrash = document.createElement("i")
    iTrash.className = "fa-trash"
    iTrash.textContent = "🚮 "
    
    iTrash.addEventListener("click", (event) => { handleTrash(event, tvDisplay)})
    iCheck.addEventListener("click", (event) => { handleCheck(event, tvDisplay)})
    searchBar.addEventListener("submit", (event) => {searchBar(event, tvDisplay)})
    
    detailsDiv.innerHTML = " "
    detailsDiv.append(h2)
    detailsDiv.append(h3)
    detailsDiv.append(h4)

    btnDiv.innerHTML = " "
    btnDiv.append(iCheck)
    btnDiv.append(iTrash)
   })
} 

function handleTrash(event, tvObj){
    console.log(event)
    // use tvID in delete request
   
    const tvId = tvObj.id
    document.getElementById(tvId).remove()
    detailsDiv.innerHTML = " "
    iframe.src = " "
    btnDiv.innerHTML = " "
    fetch(`http://localhost:3000/tv/${tvId}`, {
        method: "DELETE"
    })
}



function handleCheck(event, tvObj){
    console.log(event)
    const tvId = tvObj.id
    // use tvId in patch request
   
    fetch(`http://localhost:3000/tv/${tvId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "watchlist": true
        })
       
    })
    .then(resp => resp.json())
    .then(data => {
    console.log(data)
    })

}


let form = document.querySelector(".add-Movie-form")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    //console.log(e.target[2].value)
   
   
fetch("http://localhost:3000/tv", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "title": e.target[0].value,
        "contenttype": e.target[1].value,
        "rating": e.target[2].value,
        "video": e.target[3].value,
        "watchlist": "false",
    })
})
.then(resp => resp.json())
.then(myMvie =>  television(myMvie))

})


    let select = document.querySelector('#viewlist')
    select.addEventListener("change", (e) => {
    console.log(e.target.value)
    document.querySelector("#tv-list").innerHTML = " "
    if(e.target.value === "watched") {
        tvShows.filter(movie => movie.watchlist === true).forEach(movie => television(movie))
        // .filter the tvShows to get just an array of shows that have watchlist === true
        // iterate (forEach) through the new filtered array and for each show call the television function
    }
    else if(e.target.value === "unwatched") {
        tvShows.filter(movie => movie.watchlist === false).forEach(movie => television(movie))
        // .filter the tvShows to get just an array of shows that have watchlist === false
        // iterate (forEach) through the new filtered array and for each show call the television function
    }else{
        tvShows.forEach(movie => television(movie))
    }
})

// add a checkbutton to update the watchlist to true or false
//  function update(){
//      let check = document.querySelector(".fas fa-check")
//      let trash = document.querySelector(".fas fa-trash")

//  }

function search(event, searchItem){
    event.preventDefault()
    console.log(event.target[0].value)
    const tvTitle = searchItem.title
    if(event.target[0].value === tvTitle){
        return event.target[0].value
    }

}