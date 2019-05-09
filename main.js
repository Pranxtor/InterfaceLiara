// A faire au chargement de l'interface

disableButton(document.getElementById("myStopBtn").id);		// Grise le bouton arreter

// afficher les services enregistrées dans les cookies à coté d'une checkbox
var toadd = document.getElementById("toadd"); 				// Assigne à une variable la valeur de la div "toadd"
var cookies = document.cookie.split(";");					// Assigne tout les cookies de la page dans un tableau
if (document.cookie) {
	for (i = 0; i < cookies.length; i++) {						// Boucle dans le tableau des cookies
		var cookie = cookies[i].split("=");						// Sépare chaque cookie dans un tableau à 2 cellules : son nom et sa valeur
		var nomDS = cookie[0];									// Assigne à une variable le nom
		var uri = cookie[1];									// Assigne à une variable la valeur du nom 
		uri = uri.replace("%3A", ":");							// Replace le premier %3A par : (l'enregistrement dans les cookies ne peux pas prendre de :)
		uri = uri.replace("%3A", ":");							// Replace le second %3A par : (l'enregistrement dans les cookies ne peux pas prendre de :)
		if (uri.search("ws://") == 0) {							// Si la valeur associé au nom est bien une URI (les cookies sont utilisés pour d'autres fonctions)
			console.log(nomDS + " = " + uri);					// On envoie à la console la valeur du nom et de l'uri
			var div = document.createElement("DIV");			// On crée une div...
			div.setAttribute("class", "DS");					// de class DS
			var x = document.createElement("INPUT");			// Puis on crée une checkbox
			x.setAttribute("type", "checkbox");
			x.setAttribute("class", "Source");					// de class Source
			x.setAttribute("id", nomDS);						// On lui donne comme ID le nom du cookie
			x.setAttribute("value", uri);						// et comme VALUE la valeur du cookie
			var xlabel = document.createElement("LABEL");		// On crée le LABEL qui accomapgnera le checkbox
			var text = document.createTextNode(nomDS);			// On crée un Textnode ayant pour valeur le nom du cookie
			xlabel.setAttribute("for", x.id);					// On fait en sorte que le label suive la checkbox
			xlabel.appendChild(text);							// On assigne au texte du LABEL le nom du cookie
			var del = document.createElement("INPUT");
			del.setAttribute("type", "button");
			del.setAttribute("class", "delete");
			del.setAttribute("value", "X");
			del.setAttribute("onclick", "deleteDS(\"" + nomDS + "\")");
			div.append(x);										// on ajoute la checkbox au div
			div.append(xlabel);									// Puis le label
			div.append(del);
			toadd.append(div);									// Enfin on ajoute div à toadd
			console.log(GetCookie(nomDS));
		}
	}
}


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
		if (uri == null) break;
		uri = prompt("Veuillez rentrer l'URI de la nouvelle source de données en format @IP:PORT. Ne pas oublier de rajouter le ws:// avant l'adresse", "ws://");
	}
	var div = document.createElement("DIV");
	div.setAttribute("class", "DS");
	var x = document.createElement("INPUT");
	x.setAttribute("type", "checkbox");
	x.setAttribute("class", "Source");
	x.setAttribute("id", nomDS);
	x.setAttribute("value", uri);
	var xlabel = document.createElement("LABEL");
	var text = document.createTextNode(nomDS);
	xlabel.setAttribute("for", x.id);
	xlabel.appendChild(text);
	var del = document.createElement("INPUT");
	del.setAttribute("type", "button");
	del.setAttribute("class", "delete");
	del.setAttribute("value", "X");
	del.setAttribute("onclick", "deleteDS(\"" + nomDS + "\")");
	if (uri != null && nomDS != null) {
		div.append(x);
		div.append(xlabel);
		div.append(del);
		toadd.append(div);
		SetCookie(nomDS, uri);
		console.log(GetCookie(nomDS));
	}
}

function deleteDS(id) {
	var index = document.getElementById(id);
	var div = index.parentElement;
	div.parentElement.removeChild(div);
	eraseCookie(id);
}



function disableButton(idBtn) {
	var btn = document.getElementById(idBtn);
	btn.setAttribute("disabled", "disabled");
}

function enableButton(idBtn) {
	var btn = document.getElementById(idBtn);
	btn.removeAttribute("disabled");
}

function clickStart() {
	var start = document.getElementById("myStartBtn");
	var stop = document.getElementById("myStopBtn");

	console.log("Clic sur start")

	disableButton(start.id);
	enableButton(stop.id);
}

function clickStop() {
	var start = document.getElementById("myStartBtn");
	var stop = document.getElementById("myStopBtn");

	console.log("Clic sur stop");

	disableButton(stop.id);
	enableButton(start.id);
}

function SetCookie(name, value) {
	var argv = SetCookie.arguments;
	var argc = SetCookie.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	var path = (argc > 3) ? argv[3] : null;
	var domain = (argc > 4) ? argv[4] : null;
	var secure = (argc > 5) ? argv[5] : false;
	document.cookie = name + "=" + escape(value) +
		((expires == null) ? "" : ("; expires=" + expires)) +
		((path == null) ? "" : ("; path=" + path)) +
		((domain == null) ? "" : ("; domain=" + domain)) +
		((secure == true) ? "; secure" : "");
}

function getCookieVal(offset) {
	var endstr = document.cookie.indexOf(";", offset);
	if (endstr == -1) endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}
function GetCookie(name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg) return arg + getCookieVal(j);
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break;
	}
	return null;
}

function getCookies() {
	var pairs = document.cookie.split(";");
	var cookies = {};
	for (var i = 0; i < pairs.length; i++) {
		var pair = pairs[i].split("=");
		cookies[(pair[0] + '').trim()] = unescape(pair[1]);
	}
	return cookies;
}

function eraseCookie(name) {
	SetCookie(name, "", new Date());
}
