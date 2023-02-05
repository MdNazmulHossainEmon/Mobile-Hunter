

// ------------Slider Create -----------------------

var Image = ["img-1.jpg", "img-2.jpg", "img-3.jpg"]

var my_image = document.getElementById("myImage")

var countImageIndex = 0

function myImageChange() {
  countImageIndex++

  if (countImageIndex >= Image.length) {
    countImageIndex = 0
    my_image.src = Image[countImageIndex]
  }
  else {
    my_image.src = Image[countImageIndex]

  }

  setTimeout("myImageChange()", 1000)
}

window.onload = myImageChange()



// --------- All Search Phone ---------------


const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  const res = await fetch(url)
  const data = await res.json()
  displayPhones(data.data, dataLimit)

}

const displayPhones = (phones, dataLimit) => {

  const phonesContainer = document.getElementById("phones-container")

  phonesContainer.textContent = ""

  // Display 9 phones only show
  const showAll = document.getElementById("show-all")
  if (dataLimit && phones.length > 9) {
    phones = phones.slice(0, 9)

    showAll.classList.remove("d-none")
  }
  else {
    showAll.classList.add("d-none")

  }


  // Display No Phones Found

  const noPhone = document.getElementById("no-found-message")

  if (phones.length === 0) {
    noPhone.classList.remove("d-none")
  }
  else {
    noPhone.classList.add("d-none")
  }

  // Display All Phones
  phones.forEach(phone => {

    //  console.log(phone)

    const phoneDiv = document.createElement("div")
    phoneDiv.classList.add("col")

    phoneDiv.innerHTML = `

      <div class="card">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">A mobile phone is a wireless handheld device that allows users to make and receive calls. While the earliest generation of mobile phones could only make and receive calls, today's mobile phones do a lot morea systems.</p>
        <button onClick="loadPhoneDetails('${phone.slug}')" class="btn btn-info " data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>


      </div>
    </div>

      `
    phonesContainer.appendChild(phoneDiv)
  })
  // Stop Loader 
  toogleSpinner(false)
}

// Handle Search Button Click

document.getElementById("btn-search").addEventListener('click', function () {

  // Start Loader 
  processSearch(10)

  // console.log(searchText)

})

// search input field enter key handler 

document.getElementById("search-field").addEventListener("keypress", function (e) {

  if (e.key === "Enter") {
    processSearch(10)
  }
})

// Loader Set Show And Hide 

const toogleSpinner = isLoading => {
  const loaderDiv = document.getElementById("loader")

  if (isLoading) {
    loaderDiv.classList.remove("d-none")
  } else {
    loaderDiv.classList.add("d-none")
  }

}

// Show All Button

document.getElementById("show-btn-all").addEventListener("click", function () {
  processSearch()
})


const processSearch = (dataLimit) => {
  toogleSpinner(true)

  const searchField = document.getElementById("search-field")

  const searchText = searchField.value

  loadPhones(searchText, dataLimit)

}


const loadPhoneDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`

  const res = await fetch(url)
  const data = await res.json()
  displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone => {
  console.log(phone)
  const modalTitle = document.getElementById("phoneDetailModalLabel")
  modalTitle.innerText = phone.name

  const phoneDetails = document.getElementById("phone-details")
  phoneDetails.innerHTML = `
<img src="${phone.image}">
  <p>Release Date : ${phone.releaseDate}</p>
  <p>Storage : ${phone.mainFeatures.storage}</p>
  <p>chipset : ${phone.mainFeatures.chipSet}</p>
  <p>DisplaySize : ${phone.mainFeatures.displaySize}</p>
  <p>Memory : ${phone.mainFeatures.memory}</p>

  `
}

// loadPhones()
