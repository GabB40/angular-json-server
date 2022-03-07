const heroes = require('./heroes.json');
const abilities = require('./abilities.json');

module.exports = () => ({
    heroes: heroes,
    abilities: abilities
});