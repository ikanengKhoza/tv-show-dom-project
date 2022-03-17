//You can edit ALL of the code here
//globbal variables
const getInput = document.getElementById("site-search");
const searchCount = document.getElementById("display-episode-count");
const selectElem = document.getElementById("select");
const selectedOption = document.getElementById("showId")



function setup() {
    myFetchedData()
    inputSearch()
    onChangeSelect()
    const allShows = getAllShows();
    makePageForShowList(allShows);
    selectShow(allShows)
    selectOption()
  
}


//displays all episodes on the page
function makePageForEpisodes(episodeList) {
  episodeList.forEach(function (episode) {
  console.log(episode)  
  const rootElem = document.getElementById("root")
  const headingName = document.createElement("h3")
  const pTag = document.createElement("p") 
  const image = document.createElement("img")
  const eachEpisodeContainer = document.createElement("div")
  
  headingName.innerText = `${episode.name} - S0${episode.season}E0${episode.number}`
  pTag.innerHTML = `${episode.summary}`
  image.src = `${episode.image.medium}`
  
  
  eachEpisodeContainer.appendChild(headingName)
  eachEpisodeContainer.appendChild(image)
  eachEpisodeContainer.appendChild(pTag)

  eachEpisodeContainer.className = "episodes"  
  rootElem.appendChild(eachEpisodeContainer)
  })
}

//make page for shows
function makePageForShowList(episodeList) {
  episodeList.forEach(function (show) {
   //console.log(show) 
  const rootElem = document.getElementById("root")
  const headingName = document.createElement("h3")
  const pTag = document.createElement("p") 
  const image = document.createElement("img")
  const eachShowContainer = document.createElement("div")
  
  headingName.innerText = `${show.name} 
 \n premired: ${show.premiered} \n runtime: ${show.runtime} \n `
  pTag.innerHTML = `${show.summary} \n \ngenres: ${show.genres}`
  image.src = `${show.image.medium}`
  
  
  eachShowContainer.appendChild(headingName)
  eachShowContainer.appendChild(image)
  eachShowContainer.appendChild(pTag)

  eachShowContainer.className = "showlist"  
  rootElem.appendChild(eachShowContainer)
  })
}



//displays searched episode and episode-count inside eventlisterner
function inputSearch()  {
  getInput.addEventListener("keyup", (e) => {
    const searchedEpisode = e.target.value.toLowerCase()
    const filteredInput = currentEpisodes.filter((e) => {
    return (
      e.name.toLowerCase().includes(searchedEpisode) ||
      e.summary.toLowerCase().includes(searchedEpisode)
   )  
 });
   
    const filteredCount = filteredInput.length;
    const allCount = currentEpisodes.length;
    const countEpisode = `displaying ${filteredCount} / ${allCount}`;
    searchCount.innerText = countEpisode;
    
    const rootElem = document.getElementById("root");
    rootElem.innerHTML = "";
    
    makePageForEpisodes(filteredInput);
    })
    const displayEpisodeSearch = document.getElementById("display-episode-count")
}



//episode dropdown options
function selectOption (options) {
  options.forEach(element => {
    const optionElem = document.createElement("option");
    selectElem.appendChild(optionElem)
    optionElem.innerHTML = `S0${element.season}E0${element.number} - ${element.name}`
  })
}

// show dropdown options
function selectShow(show) {
  show.forEach(element => {
    const showSelOption = document.createElement("option");
    selectedOption.appendChild(showSelOption)
    showSelOption.innerHTML = `${element.name}`
  })
}


function onChangeSelect(){
  selectedOption.addEventListener('change', (event) => {
  const clickedEpisode = currentEpisodes.filter((e) => {
  const result =  event.target.value; 
    console.log(result)

    return (
      e.id.result 
   )      
});
makePageForShowList(clickedEpisode);
})
}


//showlist show list dropdown
function selectShowList() {
 fetch(`https://api.tvmaze.com/shows`)
  .then(res => res.json())
  .then(data => {
    
  selectShow(data)
  })

  .catch((e) => console.log(e));
   
}


//fetch for episodes
function myFetchedData() {
 fetch(`https://api.tvmaze.com/shows/82/episodes`)
  .then(response => response.json())  
  .then(data => {

   makePageForEpisodes(data)
   selectOption(data)
   selectShowList(data)
  makePageForShowList(data)
   currentEpisodes = data
   onChangeSelect(data)
   
   
  })

  .catch((e) => console.log(e));
  }




window.onload = setup;
