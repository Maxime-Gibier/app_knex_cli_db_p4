// App.js - Utilisation des opérations CRUD avec Knex

const db_boissons = require("./Models/boissonModels");
const db_users = require("./Models/usersModels");
const db_orders = require("./Models/ordersModels");


// function getRandomInt(max) {
// 	return Math.floor(Math.random() * max);
// }

async function main() {
	// Initialize boissons table
	const boissons = {
		rhum_citron: { quantity: 10, price: 3 },
		rhum_vanille: { quantity: 45, price: 55 },
		rhum_café: { quantity: 13, price: 6 },
		rhum_passion: { quantity: 10, price: 13 },
		rhum_coco: { quantity: 30, price: 24 },
		rhum_ananas: { quantity: 30, price: 21 },
		rhum_fraise: { quantity: 25, price: 36 },
		rhum_mangue: { quantity: 35, price: 56 },
	};

	// Initialize users table
	const users = [
		{
			name: "maxime",
			orders: [
				{ boisson_id: 5, quantity: 1, price: 24},
				{ boisson_id: 3, quantity: 1, price: 6},
				{ boisson_id: 6, quantity: 1, price: 21},
			],
		},
		{
			name: "emma",
			orders: [
				{ boisson_id: 4, quantity: 1, price: 13},
				{ boisson_id: 1, quantity: 1, price: 3},
			],
		},
		{
			name: "oliver",
			orders: [
				{ boisson_id: 2, quantity: 1, price: 55},
				{ boisson_id: 3, quantity: 1, price: 6},
			],
		},
	];

	// Create boissons table
	for (boisson_name in boissons) {
		await db_boissons.createBoisson(
			boisson_name,
			boissons[boisson_name].quantity,
			boissons[boisson_name].price
		);
	}

	// Create orders table
	for (user_obj of users) {
		let user = await db_users.createUser(user_obj.name, user_obj.orders);
		for (order_id in user_obj.orders) {
      await db_orders.createOrder(
        user[0],
				user_obj.orders[order_id].boisson_id,
				user_obj.orders[order_id].quantity,
				user_obj.orders[order_id].price,
			);
		}
	}

	// Read Boissons
	const getAllBoissons = await db_boissons.getAllBoissons();
  console.log("Tous les boissons :", getAllBoissons);

  // Read Users
  const getAllUsers = await db_users.getAllUsers();
  console.log("Tous les users :", getAllUsers);

  // Read Orders
  const getAllOrders = await db_orders.getAllOrders();
  console.log("Tous les orders :", getAllOrders);
}

main().catch((err) => console.error(err));
