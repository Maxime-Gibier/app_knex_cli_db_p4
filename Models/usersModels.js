// db.js - Fichier pour gérer les opérations CRUD avec Knex

const knex = require('knex')(require('../knexfile')['development']);

// Create
async function createUser(name) {
  return await knex('users').insert({ name });
}

// Read
async function getAllUsers() {
  return await knex.select().from('users');
}

async function getUserById(id) {
  return await knex('users').where({ id }).first();
}

async function getUserByName(name) {
  return await knex('users').where({ name }).first();
}

// Delete
async function deletUser(id) {
  return await knex('users').where({ id }).del();
}


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByName,
  deletUser
};

// npm install knex sqlite3