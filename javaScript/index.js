// const apiKey = "live_QCRHWRG1HOZXKIh57YBEFCa2CZ5tn7qUHuxAQSxFK9tbh7dKyElT9D2FNcdXLVZN"
// const retrieveBtn = document.getElementById('retrieveBtn')
// const dogCardTemplate = document.querySelector('[data-dog-template]')
// const dogCardContainer = document.querySelector('[data-dog-card-container]')
// retrieveBtn.addEventListener('click', getRandomDog)
// function getRandomDog(){
// fetch(`https://api.thedogapi.com/v1/images/search?limit=5&has_breeds=1&api_key=${apiKey}`)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//         data.forEach(dog => {
//                 let div = document.createElement('div')
//                 const para = document.createElement('p')
//                 const img = document.createElement('img')
//                 img.src = `${dog.url}`
//                 img.style.height = '200px'
//                 img.style.width = '200px'
//                 div.classList.add('card')
//                 para.textContent = dog.breeds[0].name
//                 div.appendChild(para)
//                 div.appendChild(img)
//                 dogCardContainer.appendChild(div)
//         })
//     })
// }
// set my api key to a variable so I don't have to put the whole thing inside of the query

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

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`)};
            return await response.json();
    } catch (error) {
        console.error("Failed to fetch dogs:", error);
    }
}

async function createDogCard(imgUrl, breedName, id) {
    // makes a copy of the html template
    let card = dogCardTemplate.content.cloneNode(true).children[0];
//grab the image tag with theclass dog-img
    let img = card.querySelector(".dog-img");
    let infoDiv = card.querySelector('.infoDiv')
    // grabs the p tag with class of dog-breed
    let para = card.querySelector(".dog-breed");
    let moreInfoH3 = card.querySelector(".moreInfoH3")
    let moreInfoBtn = card.querySelector('.moreInfo')
//sets the src of the 
    img.src = imgUrl;
    //set data-more-info 
    // "data-breed", "Labrador"
   moreInfoBtn.setAttribute('data-id', `${id}` )
    // assiging "breed name to the alt attr"
    img.alt = breedName;
    //setting dog-brred para to breedName
    para.textContent = breedName;

    // Append to container
    dogCardContainer.appendChild(card);
    
    moreInfoBtn.addEventListener('click', async () => {
       let response = await fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${id}&api_key=${apiKey}`)
       console.log(response, "hello")
        let data = await response.json()
        moreInfoH3.textContent = "Bred for:"
        infoDiv.textContent =  data[0].breeds[0].bred_for
        // let bredFor = data.breeds[0].breed_for
        // let id = dog.breeds?.[0]?.id
       console.log(data[0].breeds[0].bred_for)
    })
    // console.log(`${id}`)
//     Array [ {…} ]
// 0: Object { id: "HkC31gcNm", url: "https://cdn2.thedogapi.com/images/HkC31gcNm_1280.png", width: 300, … }
// breeds: Array [ {…} ]
// 0: Object { id: 15, name: "American Pit Bull Terrier", country_code: "US", … }
// length: 1
// <prototype>: Array []
// ​​
// height: 244
// ​​
// id: "HkC31gcNm"
// ​​
// url: "https://cdn2.thedogapi.com/images/HkC31gcNm_1280.png"
// ​​
// width: 300
}
// let moreInfoBtn = ''
// moreInfoBtn.addEventListener('click', moreInfo()) 

// async function moreInfo() {
//     let buton = 
//     // console.log(identifier)
//     // fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${id}&api_key=${apiKey}`)
    
// }
