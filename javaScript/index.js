// document.body.style.backgroundColor = 'red'
const apiKey = "live_QCRHWRG1HOZXKIh57YBEFCa2CZ5tn7qUHuxAQSxFK9tbh7dKyElT9D2FNcdXLVZN"

const getRandomDog = async function (params) {
    try{
        // .com/v1/images/search?api_key=YOUR_API_KEY
        let response = await fetch(`  https://api.thedogapi.com/v1/images/search?limit=20&api_key=${apiKey}`)
        // console.log(response)
        let data = await response.json()
        console.log(data)


    }catch(error){
        console.log(error)
    }


    
}
// getRandomDog()
const dogCardTemplate = document.querySelector('[data-dog-template]')
const dogCardContainer = document.querySelector('[data-dog-card-container]')
fetch(`https://api.thedogapi.com/v1/images/search?limit=5&api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        // data = data.filter(img=> img.image?.url!=null)
        data.forEach(dog => {
            
            console.log(dog)
            if(dog.breeds.length >0){
                const card = dogCardTemplate.content.cloneNode(true).children[0]
                const header = card.querySelector("[data-header]")
                const body = card.querySelector("[data-body]")
                const dogImg = card.querySelector('[data-dog-image]')
                dogImg.src = `${dog.url}`
                header.textContent = dog.breeds[0].name
                // body.src = dog.url
                // dogImg.src = `"${dog.url}"`
                dogCardContainer.append(card)
                console.log(dog.url)
            }


        })
    })






// Pembroke Welsh Corgi, "American Bully" Dutch Shepherd American Pit Bull Terrier "Saluki Cocker Spaniel