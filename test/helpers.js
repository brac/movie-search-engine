// jshint asi:true
const client = require('../database/client')

const clearDatabase = () => {
  return deleteAllUsersSearches()
    .then(() => deleteAllSearches)
    .then(() => deleteAllUsers)
    .catch(console.error)
}

const deleteAllUsers = () => {
  return client.none(`DELETE from users;`)
}

const deleteAllSearches = () => {
  return client.none(`DELETE from searches;`)
}

const deleteAllUsersSearches =() => {
  return client.none(`DELETE from users_searches;`)
}

const insertUserFixtures = () =>   {
  return client.none(`
    INSERT INTO users (users_name, password) values
      ('Ben Bracamonte', 'password'),
      ('Jenna Wieden', 'password'),
      ('Homer Newark', 'password'),
      ('Tessy Colthard', 'password'),
      ('Grata Hingeley', 'password'),
      ('Elnore Ianelli', 'password'),
      ('Paulie Littlecote', 'password'),
      ('Brandie Trotman', 'password'),
      ('Sophia Simkin', 'password'),
      ('Emlynne Laxen', 'password'),
      ('Karin Lancashire', 'password'),
      ('Cam Baxill', 'password'),
      ('Locke Baillie', 'password'),
      ('Lauretta Ferby', 'password'),
      ('Margo Devorill', 'password'),
      ('Alvis Abyss', 'password'),
      ('Noella Blades', 'password'),
      ('Fitz Goodbar', 'password'),
      ('Alvinia Dumini', 'password'),
      ('Almira Beadnall', 'password'),
      ('Deloris Verissimo', 'password'),
      ('Rhodia Lindenbluth', 'password'),
      ('Katuscha Grunwall', 'password'),
      ('Stefanie Paddell', 'password'),
      ('Idaline Anker', 'password'),
      ('Katusha Lundbech', 'password'),
      ('Brita Donnell', 'password'),
      ('Henka Appleby', 'password'),
      ('Zsazsa Allred', 'password'),
      ('Haroun Birmingham', 'password'),
      ('Karyn Nelane', 'password'),
      ('Robbert Crowne', 'password'),
      ('Yurik Fidgeon', 'password'),
      ('Terrie Lisciandri', 'password'),
      ('Cassy Curphey', 'password'),
      ('Issiah Clohissy', 'password'),
      ('Laurie Shervington', 'password'),
      ('Colan Boldero', 'password'),
      ('Becky Jamot', 'password'),
      ('Forrester Spracklin', 'password'),
      ('Adorne Gaynsford', 'password'),
      ('Philly Fearney', 'password'),
      ('Clint Sirl', 'password'),
      ('Karol Nethercott', 'password'),
      ('Rustin Kiddy', 'password'),
      ('Gabriele Strother', 'password'),
      ('Julie Felder', 'password'),
      ('Shea Ascough', 'password'),
      ('Vale Morales', 'password'),
      ('Niccolo Blankman', 'password'),
      ('Sunny Cambling', 'password'),
      ('Stephanus Ortiga', 'password'),
      ('Modestia Brunsdon', 'password'),
      ('Babette Symcox', 'password'),
      ('Rachael Crowd', 'password'),
      ('Evelina Penman', 'password'),
      ('Gabbie Saywell', 'password'),
      ('Maren Shorey', 'password'),
      ('Rollie McLice', 'password'),
      ('Benji Packham', 'password'),
      ('Aylmer Buxton', 'password'),
      ('Papageno Hadrill', 'password'),
      ('Jeniffer Windaybank', 'password'),
      ('Mercy Furniss', 'password'),
      ('Bernadina Happs', 'password'),
      ('Jacquette Rennie', 'password'),
      ('Lauralee Willowby', 'password'),
      ('Ax Dahl', 'password'),
      ('Kat Francescotti', 'password'),
      ('Brenna Rapkins', 'password'),
      ('Gun Swatten', 'password'),
      ('Rowe Mingey', 'password'),
      ('Karena Wyon', 'password'),
      ('Drew Everil', 'password'),
      ('Oralie Teresi', 'password'),
      ('Alisa Barfford', 'password'),
      ('Lawry Godridge', 'password'),
      ('Clim Oguz', 'password'),
      ('Livvie Ruslen', 'password'),
      ('Felicia Warke', 'password'),
      ('Web Richardes', 'password'),
      ('Doll Mangeney', 'password'),
      ('Benito Fortnam', 'password'),
      ('Courtney Risbrough', 'password'),
      ('Mason Rhydderch', 'password'),
      ('Tremayne O''Quin', 'password'),
      ('Evania Stidston', 'password'),
      ('Jolee Scheffler', 'password'),
      ('Gina Tootin', 'password'),
      ('Jourdan Belfit', 'password'),
      ('Alisa Aldersey', 'password'),
      ('Ben Brideaux', 'password'),
      ('Rozelle Sola', 'password'),
      ('Gilemette Beeke', 'password'),
      ('Tristam Whitebrook', 'password'),
      ('Corette Persehouse', 'password'),
      ('Vanya Bentzen', 'password'),
      ('Hoyt Berthel', 'password'),
      ('Bessie Bisley', 'password'),
      ('Clarance Bosdet', 'password');
  `)
  .catch(e => console.error)
}

const insertSearchFixtures = () =>   {
  return client.none(`
    INSERT INTO searches (search_term) values
      ('The Matrix'),
      ('The Joy Luck Club'),
      ('Godzilla'),
      ('Leaving Las Vegas'),
      ('Jurassic Park'),
      ('The Lord of the Rings'),
      ('Rambo'),
      ('Robocop'),
      ('Her'),
      ('Requiem for a Dream'),
      ('Frozen'),
      ('Dora the Explora'),
      ('Star Wars'),
      ('Bugs Bunny'),
      ('Daffy Duck'),
      ('Spiderman'),
      ('Transfomers'),
      ('Snow Piercer'),
      ('Mortal Kombat'),
      ('Mario Bros');
  `)
  .catch(e => console.error)
}

const insertUserSearchesFixtures = () =>   {
  return client.none(`
    INSERT INTO users_searches (users_id, searches_id) values
      (1, 1),
      (1, 2),
      (2, 1),
      (4, 3),
      (3, 4),
      (5, 3),
      (2, 5),
      (3, 6),
      (6, 10),
      (7, 15),
      (6, 14),
      (62, 11),
      (3, 12),
      (1, 8),
      (4, 7),
      (25, 5),
      (27, 2),
      (53, 3),
      (44, 3),
      (22, 1);
  `)
  .catch(e => console.error)
}

const resetSequences =() => {
  // sets all id series back to 1 so that we can deterministically work with ids
  return client.any('ALTER SEQUENCE "users_id_seq" RESTART WITH 1;')
    .then(() => client.any('ALTER SEQUENCE "searches_id_seq" RESTART WITH 1;'))
    .then(() => client.any('ALTER SEQUENCE "users_searches_id_seq" RESTART WITH 1;'))
    .catch(e => console.error)
}

const resetDatabase = () => {
  return clearDatabase()
    .then(resetSequences)
    .then(insertUserFixtures)
    .then(insertSearchFixtures)
    .then(insertUserSearchesFixtures)
    .catch(console.error)
}

module.exports = {
  clearDatabase,
  resetDatabase
}

resetDatabase()