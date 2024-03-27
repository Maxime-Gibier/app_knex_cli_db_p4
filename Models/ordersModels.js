// db.js - Fichier pour gérer les opérations CRUD avec Knex

const knex = require('knex')(require('../knexfile')['development']);

// Create
async function createOrder(user_id, boisson_id, quantity, price) {
  return await knex('order').insert({ user_id, boisson_id, quantity, price});
}

// Read
async function getAllOrders() {
  return await knex.select().from('order');
}


async function getOrderById(id) {
  return await knex('order').where({ id }).first();
}

// Delete
async function deleteOrder(id) {
  return await knex('order').where({ id }).del();
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder
};

// npm install knex sqlite3