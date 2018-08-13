// jshint asi:true
const rp        = require('request-promise')
const cheerio = require('cheerio')

const queryImdb = (searchParam) => {
  return new Promise((resolve, reject) => {
    let options = {
      uri: `http://www.imdb.com/find?ref_=nv_sr_fn&q=${searchParam}&s=all`,
      transform: body => cheerio.load(body),
    }

    rp(options)
      .then( $ => {
        let movies = $('.findSection')
          .first()
          .find('.result_text')
          .map((i, elem) => {
            return {
              name: $(elem).text().split('-')[0].split(' (')[0].trim(),
              date: $(elem).text().split('-')[0].split(' (')[1].trim().slice(0, -1)
            }
          })
          .toArray()

        let images = $('.findSection')
          .first()
          .find('.primary_photo')
          .map((i, elem) => {
            return {
              image: $(elem).find('img'),
            }
          })
          .toArray()

          movies.forEach((movie, i) => {
            movie.image = images[i].image
          })

        resolve(movies)
      })
    .catch(e => reject(e) )
  })
}

module.exports = queryImdb