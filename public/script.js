// jshint asi:true

document.addEventListener("DOMContentLoaded", () => {

  const searchButton = document.getElementById('search-button')
  const loadingIcon = document.getElementById('loading-icon')
  const form = document.getElementById('search-form')

  form.addEventListener("submit", function(e){
    e.preventDefault()
    searchButton.classList.add('d-none')
    loadingIcon.classList.remove('d-none')

    // TODO:
      // Change locahost to the heroku server
      // for deployment

    fetch(`https://localhost:3000/api/movies`)
      .then(res => {
        return res.json()
      })
      .then( movies => {
        console.log(movies)
      })
    .catch( e => { throw e })
  })
})
