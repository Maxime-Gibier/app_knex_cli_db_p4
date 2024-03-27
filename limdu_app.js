var limdu = require("limdu");
const prompt = require("prompt-sync")({ sigint: true });
const db_boissons = require("./Models/boissonModels");
const db_users = require("./Models/usersModels");
const db_orders = require("./Models/ordersModels");

(async function () {
	const boissons = await db_boissons.getAllBoissons();

	// console.log("boissons", boissons);
	// console.log("users", users);
	// console.log("order", orders);


	// First, define our base classifier type (a multi-label classifier based on winnow):
	var TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
		binaryClassifierType: limdu.classifiers.Winnow.bind(0, {
			retrain_count: 10,
		}),
	});

	// Now define our feature extractor - a function that takes a sample and adds features to a given features set:
	var WordExtractor = function (input, features) {
		input.split(" ").forEach(function (word) {
			features[word] = 1;
		});
	};

	// Initialize a classifier with the base classifier type and the feature extractor:
	var intentClassifierBonjour = new limdu.classifiers.EnhancedClassifier({
		classifierType: TextClassifier,
		featureExtractor: WordExtractor,
	});

	// Train and test Bonjour:
	intentClassifierBonjour.trainBatch([
		{ input: "Bonjour", output: "bonjour" },
		{ input: "Salut", output: "bonjour" },
		{ input: "Hello", output: "bonjour" },
		{ input: "Coucou", output: "bonjour" },
		{ input: "Hey", output: "bonjour" },
		{ input: "Yo", output: "bonjour" },
		{ input: "Hi", output: "bonjour" },
		{ input: "je veux", output: "Gros con" },
		{ input: "Une biere", output: "Gros con" },
		{ input: "Du rhum des femmes ", output: "Gros con" },
	]);

	// Initialize a classifier with the base classifier type and the feature extractor:
	var intentClassifierRhum = new limdu.classifiers.EnhancedClassifier({
		classifierType: TextClassifier,
		featureExtractor: WordExtractor,
	});

	// Train and test Rhum:
	intentClassifierRhum.trainBatch([
		{ input: "Je veux boire un rhum arrangé citron", output: "rhum_citron" },
		{ input: "Je veux boire un rhum arrangé vanille", output: "rhum_vanille" },
		{ input: "Je veux boire un rhum arrangé café", output: "rhum_café" },
		{ input: "Je veux boire un rhum arrangé passion", output: "rhum_passion" },
		{ input: "Je veux boire un rhum arrangé coco", output: "rhum_coco" },
		{ input: "Je veux boire un rhum arrangé ananas", output: "rhum_ananas" },
		{ input: "Je veux boire un rhum arrangé fraise", output: "rhum_fraise" },
		{ input: "Je veux boire un rhum arrangé mangue", output: "rhum_mangue" },
		{ input: "J'aime le rhum arrangé citron", output: "rhum_citron" },
		{ input: "J'aime le rhum arrangé vanille", output: "rhum_vanille" },
		{ input: "J'aime le rhum arrangé café", output: "rhum_café" },
		{ input: "J'aime le rhum arrangé passion", output: "rhum_passion" },
		{ input: "J'aime le rhum arrangé coco", output: "rhum_coco" },
		{ input: "J'aime le rhum arrangé ananas", output: "rhum_ananas" },
		{ input: "J'aime le rhum arrangé fraise", output: "rhum_fraise" },
		{ input: "J'aime le rhum arrangé mangue", output: "rhum_mangue" },
		{ input: "Vous avez un rhum arrangé citron ?", output: "rhum_citron" },
		{ input: "Vous avez un rhum arrangé vanille ?", output: "rhum_vanille" },
		{ input: "Vous avez un rhum arrangé café ?", output: "rhum_café" },
		{ input: "Vous avez un rhum arrangé passion ?", output: "rhum_passion" },
		{ input: "Vous avez un rhum arrangé coco ?", output: "rhum_coco" },
		{ input: "Vous avez un rhum arrangé ananas ?", output: "rhum_ananas" },
		{ input: "Vous avez un rhum arrangé fraise ?", output: "rhum_fraise" },
		{ input: "Vous avez un rhum arrangé mangue ?", output: "rhum_mangue" },
		{ input: "citron", output: "rhum_citron" },
		{ input: "vanille", output: "rhum_vanille" },
		{ input: "café", output: "rhum_café" },
		{ input: "passion", output: "rhum_passion" },
		{ input: "coco", output: "rhum_coco" },
		{ input: "ananas", output: "rhum_ananas" },
		{ input: "fraise", output: "rhum_fraise" },
		{ input: "mangue", output: "rhum_mangue" },
		{ input: "pomme", output: "invalide" },
		{ input: "poire", output: "invalide" },
		{ input: "cerise", output: "invalide" },
		{ input: "pêche", output: "invalide" },
		{ input: "abricot", output: "invalide" },
		{ input: "framboise", output: "invalide" },
		{ input: "melon", output: "invalide" },
		{ input: "pastèque", output: "invalide" },
		{ input: "kiwi", output: "invalide" },
		{ input: "litchi", output: "invalide" },
	]);

	var intentClassifierAccept = new limdu.classifiers.EnhancedClassifier({
		classifierType: TextClassifier,
		featureExtractor: WordExtractor,
	});

	// Train and test Accept:
	intentClassifierAccept.trainBatch([
		{ input: "Je veux bien cette boisson", output: "oui" },
		{ input: "Donne moi !", output: "oui" },
		{ input: "je prends", output: "oui" },
		{ input: "ok", output: "oui" },
		{ input: "oui", output: "oui" },
		{ input: "oui c'est boon", output: "oui" },
		{ input: "je ne prends pas", output: "non" },
		{ input: "Non c'est trop chère", output: "non" },
		{ input: "Non je veux pas", output: "non" },
		{ input: "Non sait pas !", output: "non" },
		{ input: "Non", output: "non" },
		{ input: "non", output: "non" },
		{ input: "Non merci", output: "non" },
		{ input: "Non c'est pas bon	", output: "non" },
	]);

	//bonjour anti malpoli
	do {
		const bonjour = prompt("Bonjour... ");
		predicted_response = intentClassifierBonjour.classify(bonjour);
	} while (predicted_response[0] != "bonjour");

	const name = prompt("Comment vous appelez-vous? ");

	let majeur = true;
	let age = prompt("Quel âge avez-vous ? ");	

	if (Number(age) < 18) {
		console.log("Vous n'avez pas l'âge petit chenapan.\nAu revoir !");
		majeur = false;
		return;
	}

	if (majeur) {
		let rhum_want = prompt(
			`Dites moi ${name} quel rhum arrangé souhaitez-vous ? ( citron, vanille, café, passion, coco, ananas, fraise, mangue ) ? `
		);
		predicted_response = intentClassifier.classify(rhum_want);
		while (predicted_response == "" || predicted_response == "invalide") {
			console.log(
				"Nous n'avons pas ce gout, voici les options que nous avons :\n ---> citron, vanille, café, passion, coco, ananas, fraise, mangue <---"
			);
			rhum_want = prompt(`Quel rhum arrangé souhaitez-vous ? `);
			predicted_response = intentClassifier.classify(rhum_want);
		}

		let rhum = {};

		for (boisson of boissons) {
			if (boisson.name == predicted_response[0]) {
				const regex = /_/g;
				const replacedString = boisson.name.replace(regex, " ");
				console.log("Le ", replacedString, "est à", boisson.price, "EUR");
				rhum = boisson;
				break;
			}
		}

		let accept_offer = true;
		const regex = /_/g;
		const replacedString = rhum.name.replace(regex, " ");

		let want_qty = prompt(`Combien voulez-vous de ${replacedString} ? `);

		boisson_from_db_boissons = await db_boissons.getBoissonById(rhum.id);

		if (boisson_from_db_boissons.quantity <= 0) {
			console.log(
				`Nous n'avons plus de ${boisson_from_db_boissons.name}, au revoir !`
			);
			accept_offer = false;
		} else if (boisson_from_db_boissons.quantity - Number(want_qty) <= 0) {
			let new_qty = prompt(
				`Nous n'avons pas suffisamment de ${boisson_from_db_boissons.name} pour vous servir, il nous en reste ${boisson_from_db_boissons.quantity}, combien en voulez-vous ?  `
			);
			want_qty = new_qty;
		}
		if (Number(want_qty) == 1) {
			const petitesoeur = prompt("Vous prendrez bien la petite soeur ? ");
			predicted_response = intentClassifierAccept.classify(petitesoeur);
			if (predicted_response[0] == "oui") {
				want_qty = "2";
			} else {
				accept_offer = false;
				console.log("Au revoir !");
			}
		}

		if (accept_offer) {
			console.log(
				`Super ! Ca fera ${
					boisson_from_db_boissons.price * Number(want_qty)
				} euros`
			);
			console.log("Biiiiip");
			console.log("Merci, au revoir !");
			db_boissons.updateBoisson(
				boisson.id,
				boisson_from_db_boissons.quantity - Number(want_qty)
			);
			if (name != "") {
				const user = await db_users.getUserByName(name);
				if (user == null) {
					await db_users.createUser(name, age);
				}
				const user_id = await db_users.getUserByName(name);
				await db_orders.createOrder(
					user_id.id,
					boisson.id,
					Number(want_qty),
					boisson_from_db_boissons.price * Number(want_qty)
				);
			}
		}
	}
})();
