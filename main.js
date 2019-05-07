function CocherSource() {
	var test = document.getElementsByClassName("Source");

	if (document.getElementById("CocherSource").checked) {
		for (var i = 0; i < test.length; i++) {
			console.log(test[i].id);
			test[i].checked = true;
		}
	}
	else {
		for (var i = 0; i < test.length; i++) {
			console.log(test[i].id);
			test[i].checked = false;
		}
	}
}
function CocherType() {
	var test = document.getElementsByClassName("Type");
	console.log("ok");
	if (document.getElementById("CocherType").checked) {
		for (var i = 0; i < test.length; i++) {
			console.log(test[i].id);
			test[i].checked = true;
		}
	}
	else {
		for (var i = 0; i < test.length; i++) {
			console.log(test[i].id);
			test[i].checked = false;
		}
	}
}

function ajouterDS() {

	var toadd = document.getElementById("toadd");
	var test = document.getElementsByClassName("Source");
	var nomDS = prompt("Veuillez rentrer le nom de la nouvelle source de données");

	while (nomDS == "") {
		nomDS = prompt("Veuillez rentrer le nom de la nouvelle source de données");
	}

	var myRegex = /^ws:\/\/(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/; // test URI

	var uri = prompt("Veuillez rentrer l'URI de la nouvelle source de données en format @IP:PORT. Ne pas oublier de rajouter le ws:// avant l'adresse", "ws://");
	while (!myRegex.test(uri)) {
		uri = prompt("Veuillez rentrer l'URI de la nouvelle source de données en format @IP:PORT. Ne pas oublier de rajouter le ws:// avant l'adresse", "ws://");
	}

	var x = document.createElement("INPUT");
	x.setAttribute("type", "checkbox");
	x.setAttribute("class", "Source");
	x.setAttribute("id", test.length + 1);
	x.setAttribute("value", uri);
	var xlabel = document.createElement("LABEL");
	var text = document.createTextNode(nomDS);
	xlabel.setAttribute("for", x.id);
	xlabel.appendChild(text);
	toadd.append(x);
	toadd.append(xlabel);
}
