//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}



function makePageForEpisodes(episodeList) {
  
  episodeList.forEach(function (episode) {
  const rootElem = document.getElementById("root")
  const headingName = document.createElement("h3")
  const pTag = document.createElement("p") 
  const image = document.createElement("img")
  const eachEpisodeContainer = document.createElement("div")
  
  
  headingName.innerText = `${episode.name} - S0${episode.season}E0${episode.number}`
  
  pTag.innerHTML = `${episode.summary}`
  image.src = `${episode.image.medium}`
  
  //appending h3 and paragraph in our newly creadted div eachEpisodeContainer
  eachEpisodeContainer.append(headingName)
  eachEpisodeContainer.append(image)
  eachEpisodeContainer.append(pTag)

  eachEpisodeContainer.className = "episodes"
  
  
  //append eachEpisodeContainer to root div that was provided
  rootElem.appendChild(eachEpisodeContainer)
    
  })



// searchInput = document.getElementById("site-search")
// console.log(searchInput)

// searchInput.addEventListener("keyup", episodeList => {
//   searchedString = e.target.value
//   filteredEpisodes = episodeList.filter(episode => {
//     return episode.name.includes(searchedString).toLowerCase() || episode.summary.includes(searchedString).toLowerCase()

//   });
//   console.log(filteredEpisodes)
// })

}

function onSearchKeyUp(event) {
  const searchTerm = event.target.value.toLowerCase();
  const allEpisodes = getAllEpisodes();

  const filteredEpisodes = allEpisodes.filter((e) => {
    const episodeName = e.name.toLowerCase();
    const episodeSummary = e.summary.toLowerCase();
    return (
      episodeName.includes(searchTerm) || episodeSummary.includes(searchTerm)
    );
  });

  const filteredCount = filteredEpisodes.length;
  const allCount = allEpisodes.length;

  const countString = `Displaying ${filteredCount} / ${allCount}`;

  searchCount.innerText = countString;
  makePageForEpisodes(filteredEpisodes);
}




window.onload = setup;

