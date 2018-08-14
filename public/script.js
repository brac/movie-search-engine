// jshint asi:true

document.addEventListener("DOMContentLoaded", () => {

  const searchButton = document.getElementById('search-button')
  const loadingIcon = document.getElementById('loading-icon')
  const form = document.getElementById('search-form')

  form.addEventListener("submit", function(e){
    searchButton.classList.add('d-none')
    loadingIcon.classList.remove('d-none')
  });
})
