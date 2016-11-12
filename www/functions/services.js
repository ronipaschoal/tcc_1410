// Dados para teste de login
// Usuario - teste
// Senha - 123
_service = {

	login: function() {
		_app.user.email = $("#email").val();
		_app.user.password = $("#password").val();
		
		var xhttp = new XMLHttpRequest();

		xhttp.timeout = 5000; // tempo em milisegundos
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
					console.log(xhttp.responseText);
				if (xhttp.responseText && xhttp.responseText != "0") {
					_app.user = JSON.parse(xhttp.responseText)[0];
					_dao.save();
					alert("Bem vindo " + _app.user.name + "!");
					_app.changePage("home", "Home");
				} else {
					alert("Login e Senha incorretos!");
					$("#password").value = "";
				}	
			}
		};

		xhttp.ontimeout = function (e) {
			alert("Não houve resposta do servidor");
		};

		xhttp.open("POST", _app.webserviceUrl + "web.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		xhttp.send("action=login&email="+_app.user.email+"&password="+_app.user.password);
	},

	sigup: function() {

		if (_service.prepareUser()) {
			$.post( _app.webserviceUrl + "web.php", { action: "save", user: _app.user })
				.done(function( data ) {
					if (data) {
						_app.user.id = data;
						_dao.save();
					};
				});
		}
	},

	update: function() {

		if (_service.prepareUser()) {
			$.post( _app.webserviceUrl + "web.php", { action: "update", user: _app.user })
				.done(function( data ) {
					if (data) {
						_dao.update();
					};
				});
		}
	},

	prepareUser: function() {

		_app.user.id = document.itemForm.id.value;
		_app.user.name = document.itemForm.name.value;
		_app.user.email = document.itemForm.email.value;
		_app.user.password = document.itemForm.password.value;
		_app.user.phone = document.itemForm.phone.value;

		if (_app.user.name == "" || _app.user.email == "" || _app.user.password == "") {
			_app.updateStatus("'Nome', 'Email' e 'Senha' são campos obrigatórios!");
		} else {
			return true;
		}
	}
}
