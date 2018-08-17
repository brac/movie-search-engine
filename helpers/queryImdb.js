// jshint asi:true
const rp        = require('request-promise')
const cheerio = require('cheerio')

const queryImdb = (searchParam) => {
  searchParam = searchParam.split(' ').join('+')

  return new Promise((resolve, reject) => {
    let options = {
      uri: `https://www.imdb.com/find?ref_=nv_sr_fn&q=${searchParam}&s=all`,
      transform: body => cheerio.load(body),
    }

    rp(options)
      .then( $ => {
        let movies = $('[name=tt]')
          .closest('.findSection')
          .find('.result_text')

          .map((i, elem) => {
            return {
              name: $(elem).text().split('(')[0],
              date: $(elem).text().split('(')[1].trim().slice(0,-1)
            }
          })
          .toArray()

        let images = $('[name=tt]')
          .closest('.findSection')
          .find('.primary_photo')
          .map((i, elem) => {
            return {
              image: $.html($(elem).find('img')),
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