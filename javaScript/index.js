let apiKey = "live_QCRHWRG1HOZXKIh57YBEFCa2CZ5tn7qUHuxAQSxFK9tbh7dKyElT9D2FNcdXLVZN";
//selectiong the retrive button
let retrieveBtn = document.getElementById("retrieveBtn");
//selecting the html template
let dogCardTemplate = document.querySelector("[data-dog-template]");
//selecting the container the cards will go in
let dogCardContainer = document.querySelector("[data-dog-card-container]");
//when buttion is clicked getRandomDogs is called
retrieveBtn.addEventListener("click", getRandomDogs);
async function getRandomDogs() {
    //When button is clicked clear the pag for new dogs, this way they don;t just stack on top of each other
    dogCardContainer.innerHTML = "";
    //waiting for fetch response comes back
    let dogs = await fetchDogs();
    console.log(dogs)
    // looping through each object in the array
    dogs.forEach(dog => {
        //variable to store the breed in. The ? checks to see if breeds exist, if it doesnt it is skipped and no error thrown
        // the ? is similar to an if statement
        let breedName = dog.breeds?.[0]?.name;
        //url for the src=
        let imgUrl = dog.url
        let id = dog.breeds?.[0]?.id
        //passing data from the fetch 
        createDogCard(imgUrl, breedName, id);
    });
}
async function fetchDogs() {
    try {
                                    //should only return 6 dogs with the breed 
        let response = await fetch(`https://api.thedogapi.com/v1/images/search?limit=6&has_breeds=1&bred_for=1&api_key=${apiKey}`);
        if(!response.ok){
            throw new Error(`HTTP error. Status: ${response.status}`)
        }
            return await response.json();
    } catch (error) {
        console.error("Failed to fetch dogs:", error);
        return []
    }
}
async function createDogCard(imgUrl, breedName, id) {
    // makes a copy of the html template
    let card = dogCardTemplate.content.cloneNode(true).children[0];
//grab the image tag with theclass dog-img
    let img = card.querySelector(".dog-img");
    let bredForPara = card.querySelector('.bredForPara')
    let lifeH = card.querySelector('.lifeH')
    let lifePara = card.querySelector('.lifePara')
    // grabs the p tag with class of dog-breed
    let para = card.querySelector(".dog-breed");
    let bredForH = card.querySelector(".bredForH")
    let moreInfoBtn = card.querySelector('.moreInfo')
//sets the src of the 
    img.src = imgUrl;
   moreInfoBtn.setAttribute('data-id', `${id}` )
    // assiging "breed name to the alt attr"
    img.alt = breedName;
    //setting dog-brred para to breedName
    para.textContent = breedName;
    // Append to container
    dogCardContainer.appendChild(card);
    moreInfoBtn.addEventListener('click', async () => {
       let response = await fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${id}&api_key=${apiKey}`)
       let data = await response.json()
        if(data[0]?.breeds?.[0]?.bred_for){
            bredForH.textContent = "Bred for:"
            bredForPara.textContent =  data[0].breeds[0].bred_for
    }else{
        bredForH.textContent = "Bred for:"
        bredForPara.textContent =  'Error retrieving data'
    }
    if(data[0]?.breeds?.[0]?.life_span){
        lifeH.textContent = "Life span:"
        lifePara.textContent= data[0].breeds[0].life_span
    }else{
        
        lifeH.textContent = "Life span:"
        lifePara.textContent= 'Error retrieving data'
    }
    })
}
