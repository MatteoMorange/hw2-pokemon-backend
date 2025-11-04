const express = require('express');
const router = express.Router();
const controller = require('../controllers/dataController');

// CRUD routes
router.post('/pokemons', controller.createPokemon);
router.get('/pokemons', controller.getAllPokemon);
router.get('/pokemons/:id', controller.getPokemonById);
router.put('/pokemons/:id', controller.updatePokemon);
router.delete('/pokemons/:id', controller.deletePokemon);

module.exports = router;

// Question endpoints
router.get('/questions/fastest', controller.getFastestPokemon);
router.get('/questions/strongest', controller.getStrongestPokemon);
router.get('/questions/defensive', controller.getMostDefensivePokemon);
router.get('/questions/hp', controller.getHighestHpPokemon);
router.get('/questions/avg-attack', controller.getAverageAttack);
router.get('/questions/avg-speed', controller.getAverageSpeed);
router.get('/questions/count-by-type', controller.getCountByType);
router.get('/questions/count', controller.getTotalCount);
