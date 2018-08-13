// jshint asi:true

document.addEventListener("DOMContentLoaded", () => {

  const searchButton = document.getElementById('search-button')
  const loadingIcon = document.getElementById('loading-icon')

  form.addEventListener("submit", function(e){
    searchButton.classList.add('d-none')
    loadingIcon.classList.remove('d-none')
  });
})
