// jshint asi:true

document.addEventListener("DOMContentLoaded", () => {

  const searchButton = document.getElementById('search-button')
  const loadingIcon = document.getElementById('loading-icon')
  const form = document.getElementById('search-form')
  const ul = document.getElementById('results')

  form.addEventListener("submit", function(e){
    e.preventDefault()
    searchButton.classList.add('d-none')
    loadingIcon.classList.remove('d-none')

    // TODO:
      // Change locahost to the heroku server
      // for deployment

      // Send search term to api
    fetch(`https://localhost:3000/api/movies`)
      .then(res => {
        return res.json()
      })
      .then( movies => {
        movies.forEach(movie => {
          const li = document.createElement('li')
          const div = document.createElement('div')
          const img = document.createElement('img')
          const pName = document.createElement('p')
          const pDate = document.createElement('p')

          li.classList.add('list-group-item')
          div.classList.add('row', 'search-results')
          img.src = movie.image
          pName.classList.add('col', 'y-auto')
          pDate.classList.add('my-auto')
          pName.textContent = movie.name
          pDate.textContent = movie.date

          div.appendChild(img)
          div.appendChild(pName)
          div.appendChild(pDate)
          li.appendChild(div)
          ul.appendChild(li)

        })

        searchButton.classList.remove('d-none')
        loadingIcon.classList.add('d-none')
      })
    .catch( e => { throw e })
  })
})
