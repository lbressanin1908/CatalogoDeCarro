let prevButton = document.querySelector(".arrow_left > button")
let nextButton = document.querySelector(".arrow_right > button")
let indicatorsNumber = document.querySelector(".indicators > .number")
let indicatorsList = document.querySelector(".indicators > ul")
let carousel = document.querySelector(".carosel > ul")

let carsData = []

fetch("../assets/data/cars/cars.json")
  .then((response) => response.json())
  .then((data) => {
    carsData = data
    console.log("Data loaded:", carsData)
  })
  .catch((error) => console.error("Error loading data:", error))

let active = 0
let firstPosition = 0
let lastPosition = carsData.length - 1
indicatorsNumber.innerHTML = 0

nextButton.addEventListener("click", () => {
  if (active + 1 > carsData.length - 1) {
    active = 0
    setItem(active)
    return
  }

  active++
  setItem(active)
})
prevButton.addEventListener("click", () => {
  if (active - 1 < 0) {
    active = carsData.length - 1

    setItem(active)
    return
  }

  active--
  setItem(active)
})

window.addEventListener("load", () => {
  setItem(0)
})

function setItem(active) {
  console.log("active", active)

  const { name = "", image = "" } = carsData[active]
  indicatorsNumber.innerHTML = String(active + 1).padStart(2, "0")
  setIndicators(active)
  let item = `
  <li> 
    <div class="car_img">
      <img src="${image}" alt="imagem carro" />
    </div>
    <div class="content">
        <p class="car-information">Unico Dono</p>
        <h2>
          ${name}
        </h2>
       
    </div>
  </li>

`
  carousel.innerHTML = item
}

function setIndicators(active) {
  const indicators = carsData.map((_, index) => {
    if (index === active)
      return `<li class="active"></li>`
    return `<li></li>`
  }).join("")
  indicatorsList.innerHTML = indicators
}
