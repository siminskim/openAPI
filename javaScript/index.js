document.body.style.backgroundColor = 'red'
const apiKey = "live_QCRHWRG1HOZXKIh57YBEFCa2CZ5tn7qUHuxAQSxFK9tbh7dKyElT9D2FNcdXLVZN"

const getRandomDog = async function(randomDog) {
try{
let response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=${apiKey}`)
console.log(response, "fetch")
const randomDog = await response.json()
console.log(randomDog)
for(let dog of randomDog){
console.log(dog)
}
}catch{

}
}
getRandomDog()