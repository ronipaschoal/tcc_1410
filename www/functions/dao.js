var _dao = {

	//2. Query e visualização de Update
	update: function(){
		var query = "update USER set name=?, email=?, password=?, phone=? where id=?;";
		try {
			_app.localDB.transaction(function(transaction){
				transaction.executeSql(query, [_app.user.name, _app.user.email, _app.user.password, _app.user.phone, _app.user.id], function(transaction, results){
					if (!results.rowsAffected) {
						_app.updateStatus("Erro: Update não realizado.");
					}
					else {
						alert("Campos atualizados com sucesso!");
						_app.changePage('home', 'Home');
						// _app.updateStatus("Update realizado:" + results.rowsAffected);
					}
				}, _app.errorHandler);
			});
		} 
		catch (e) {
			_app.updateStatus("Erro: UPDATE não realizado " + e + ".");
		}
	},
	 
	onDelete: function() {
		_app.user.id = document.itemForm.id.value;
		
		var query = "delete from USER where id=?;";
		try {
			_app.localDB.transaction(function(transaction){
			
				transaction.executeSql(query, [_app.user.id], function(transaction, results){
					if (!results.rowsAffected) {
						_app.updateStatus("Erro: Delete não realizado.");
					}
					else {
						_app.updateStatus("Linhas deletadas:" + results.rowsAffected);
					}
				}, _app.errorHandler);
			});
		} 
		catch (e) {
			_app.updateStatus("Erro: DELETE não realizado " + e + ".");
		}
		
	},

	save: function() {
	
		console.log(_app.user);

		var query = "insert into USER (id, name, email, password, phone) VALUES (?, ?, ?, ?, ?);";
		try {
			_app.localDB.transaction(function(transaction){
				transaction.executeSql(query, [_app.user.id, _app.user.name, _app.user.email, _app.user.password, _app.user.phone], function(transaction, results){
					if (!results.rowsAffected) {
						_app.updateStatus("Erro: Inserção não realizada");
					}
					else {

						if (_app.actualPage == "register") { alert("Campos criados com sucesso!") }
						_app.changePage('home', 'Home');
						// _app.updateStatus("Inserção realizada, linha id: " + results.insertId);
					}
				}, _app.errorHandler);
			});
		} 
		catch (e) {
			_app.updateStatus("Erro: INSERT não realizado " + e + ".");
		}
	},

	start: function() {
		
		query = "SELECT * FROM USER;";
		try {
			_app.localDB.transaction(function(transaction){
			
				transaction.executeSql(query, [], function(transaction, results){
					
					if (results.rows.length > 0) {
						
						row = results.rows.item(0);
						
						_app.user.id = row['id'];
						_app.user.name = row['name'];
						_app.user.email = row['email'];
						_app.user.password = row['password'];
						_app.user.phone = row['phone'];

						_app.changePage("home", "Home");

					} else {
						_app.changePage("initial", "Phonegap");
					}

				}, function(transaction, error){
					_app.updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
				});
			});
		} 
		catch (e) {
			_app.updateStatus("Erro: SELECT não realizado " + e + ".");
		}
	   
	},

	onSelect: function(htmlLIElement){
		_app.user.id = htmlLIElement.getAttribute("id");
		
		query = "SELECT * FROM USER where id=?;";
		try {
			_app.localDB.transaction(function(transaction){
			
				transaction.executeSql(query, [_app.user.id], function(transaction, results){
				
					var row = results.rows.item(0);
					
					_app.user.id = row['id'];
					_app.user.name = row['name'];
					_app.user.email = row['email'];
					_app.user.password = row['password'];
					_app.user.phone = row['phone'];

				}, function(transaction, error){
					_app.updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
				});
			});
		} 
		catch (e) {
			_app.updateStatus("Error: SELECT não realizado " + e + ".");
		}
	   
	}
}