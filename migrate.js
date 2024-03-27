const knex = require("knex")(require("./knexfile")["development"]);

async function createTable() {
	try {
		const existsBoissons = await knex.schema.hasTable("boissons");
		const existsOrder = await knex.schema.hasTable("order");
		const existsUsers = await knex.schema.hasTable("users");

		// Création table Users
		if (!existsUsers) {
			await knex.schema.createTable("users", (table) => {
				table.increments("id").primary();
				table.string("name");
				table.integer("age");
			});
			console.log('La table "users" a été créée avec succès.');
		} else {
			console.log('La table "users" existe déjà.');
		}

		// Création table Order
		if (!existsOrder) {
			await knex.schema.createTable("order", (table) => {
				table.increments("id").primary();
				table.integer("user_id").unsigned().references("users.id");
				table.integer("boisson_id");
				table.integer("quantity");
				table.integer("price");
			});
			console.log('La table "order" a été créée avec succès.');
		} else {
			console.log('La table "order" existe déjà.');
		}

		// Création table Boissons
		if (!existsBoissons) {
			await knex.schema.createTable("boissons", (table) => {
				table.increments("id").primary();
				table.string("name");
				table.integer("price");
				table.integer("quantity");
			});
			console.log('La table "boissons" a été créée avec succès.');
		} else {
			console.log('La table "boissons" existe déjà.');
		}
	} catch (error) {
		console.error("Erreur lors de la création de la table :", error);
	} finally {
		await knex.destroy();
	}
}

createTable();
