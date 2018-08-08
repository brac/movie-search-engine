// jshint asi:true
document.addEventListener("DOMContentLoaded", () => {

  const searchButton = document.getElementById('search-button')
  const loadingIcon = document.getElementById('loading-icon')

  searchButton.addEventListener('click', (e) => {
    e.preventDefault()
    searchButton.classList.add('d-none')
    loadingIcon.classList.remove('d-none')
  })

  loadingIcon.addEventListener('click', (e) => {
    searchButton.classList.remove('d-none')
    loadingIcon.classList.add('d-none')
  })
})
