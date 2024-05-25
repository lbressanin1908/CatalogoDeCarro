let prevButton = document.querySelector(".arrow_left > button")
let nextButton = document.querySelector(".arrow_right > button")
let indicatorsNumber = document.querySelector(".indicators > .number")
let indicatorsList = document.querySelector(".indicators > ul")
let carousel = document.querySelector(".carosel > ul")
let caroselItem = document.querySelector(".carosel > li")

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

window.addEventListener("load", () => {
  // setItem(0)
  const data = carsData.map((car) => {
    return `
    <li class="carosel-item" draggable="false"> 
      <div class="car_img ">
        <img draggable="false" src="${car.image}" alt="imagem carro" />
      </div>
      <div class="content">
          <p class="car-information">Unico Dono</p>
          <h2>
            ${car.name}
          </h2>
         
      </div>
    </li>
    `
  })
  setIndicators(0)
  carousel.innerHTML = data.join("")
})

nextButton.addEventListener("click", () => {
  if (active + 1 > carsData.length - 1) {
    active = 0
    setScroll(active)
    return
  }

  active++
  setScroll(active)
})
prevButton.addEventListener("click", () => {
  if (active - 1 < 0) {
    active = carsData.length - 1

    setScroll(active)
    return
  }

  active--
  setScroll(active)
})

function setScroll(active) {
  carousel.scrollLeft = (960 * active) + (active * 40)
  setIndicators(active)
}

function setIndicators(active) {
  indicatorsNumber.innerHTML = String(active + 1).padStart(2, "0")
  const indicators = carsData
    .map((_, index) => {
      if (index === active) return `<li class="active"></li>`
      return `<li></li>`
    })
    .join("")
  indicatorsList.innerHTML = indicators
}

window.addEventListener("keyup", (e) => {
  e.preventDefault()
  console.log(e.key)
  if (e.key === "ArrowRight" || e.key === "ArrowUp") {
    nextButton.click()
  }
  if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
    prevButton.click()
  }
})

carousel.addEventListener("wheel", (e) => {
  e.preventDefault()

}, { passive: false })
document.addEventListener("contextmenu", e => e.preventDefault())

setInterval(() => {
  nextButton.click()

}, 2500)