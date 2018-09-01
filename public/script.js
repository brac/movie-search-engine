// jshint asi:true
document.addEventListener('DOMContentLoaded', () => {
  const searchButton  = document.getElementById('search-button')
  const loadingIcon   = document.getElementById('loading-icon')
  const form          = document.getElementById('search-form')
  const ul            = document.getElementById('results')
  const searchInput   = document.getElementById('search-input')
  const historyButton = document.getElementById('history')

  historyButton.addEventListener('click', function(e) {
    e.preventDefault()
    ul.innerHTML = ''

    // For heroku Deployment, swap the following fetch calls
    // fetch(`https://localhost:3000/api/history/`)
    fetch(`https://dry-wildwood-46109.herokuapp.com/api/history/`)
      .then( res => {
        return res.json()
      })
      .then( history => {
        history.forEach(movie => {
          const li = createLi(movie)
          ul.appendChild(li)
        })
      })
    .catch(e => { throw e })
  })

  form.addEventListener('submit', function(e){
    e.preventDefault()

    let searchTerm = searchInput.value

    searchButton.classList.add('d-none')
    loadingIcon.classList.remove('d-none')

    ul.innerHTML = ''
    searchInput.value = ''

    // For heroku Deployment, swap the following fetch calls
    // fetch(`https://localhost:3000/api/movies/${searchTerm}`)
    fetch(`https://dry-wildwood-46109.herokuapp.com/api/movies/${searchTerm}`)
      .then(res => {
        return res.json()
      })
      .then( movies => {
        movies.forEach(movie => {
          const li = createLi(movie)
          ul.appendChild(li)
        })

        searchButton.classList.remove('d-none')
        loadingIcon.classList.add('d-none')
      })
    .catch( e => { throw e })
  })

  function createLi(movie) {

    const li = document.createElement('li')
    const div = document.createElement('div')
    const pName = document.createElement('p')
    const pDate = document.createElement('p')

    if (movie.image) {
      const img = document.createElement('img')
      img.src = movie.image
      div.appendChild(img)
    }

    li.classList.add('list-group-item')
    div.classList.add('row', 'search-results')
    pName.classList.add('col', 'y-auto')
    pDate.classList.add('my-auto')
    pName.textContent = movie.name
    pDate.textContent = movie.date

    div.appendChild(pName)
    div.appendChild(pDate)
    li.appendChild(div)

    return li
  }
})
