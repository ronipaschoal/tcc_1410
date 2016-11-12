/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var _app = {

	// Alterar para o servidor de teste que possui o webservice contido na pasta tcc_1410/services
	webserviceUrl: "http://associates.ronipaschoal.com.br/services/",
	user: {},
	localDB: null,
	actualPage: null,

	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		try {
			if (!window.openDatabase) {
				_app.updateStatus("Erro: Seu navegador não permite banco de dados.");
			}
			else {
				this.initDB();
				// this.removeTables();
				this.createTables();
				_dao.queryAndUpdateOverview();
			}
		} 
		catch (e) {
			if (e == 2) {
				_app.updateStatus("Erro: Versão de banco de dados inválida.");
			}
			else {
				_app.updateStatus("Erro: Erro desconhecdo: " + e + ".");
			}
			return;
		}

		// Db.transaction(self.removeTables, self.txError);
		// Db.transaction(this.createTables, this.txError);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		_app.receivedEvent('deviceready');
	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		var parentElement = document.getElementById(id);
		console.log('Received Event: ' + id);
	},
	initDB: function(){
		var shortName = 'associates';
		var version = '1.0';
		var displayName = 'associatesDB';
		var maxSize = 500000; // Em bytes
		_app.localDB = window.openDatabase(shortName, version, displayName, maxSize);
	},	 
	createTables: function(){
		var query = "CREATE TABLE IF NOT EXISTS USER (id INTEGER PRIMARY KEY, name VARCHAR(50), email VARCHAR(20), password VARCHAR(20), phone INTEGER);";
		try {
			_app.localDB.transaction(function(transaction){
				transaction.executeSql(query, [],  this.nullDataHandler,  this.errorHandler);
				// _app.updateStatus("Tabela 'USER' status: OK.");
			});
		} 
		catch (e) {
			_app.updateStatus("Erro: Data base 'USER' não criada " + e + ".");
			return;
		}
	},
	removeTables: function(){
		var query = "DROP TABLE IF EXISTS USER;";
		try {
			_app.localDB.transaction(function(transaction){
				transaction.executeSql(query, [],  this.nullDataHandler,  this.errorHandler);
				// _app.updateStatus("Tabela 'USER' status: Morreu.");
			});
		} 
		catch (e) {
			_app.updateStatus("Erro: Data base 'USER' não criada " + e + ".");
			return;
		}
	},
	// Tratando erros
	errorHandler: function(transaction, error){
		_app.updateStatus("Erro: " + error.message);
		return true;
	},
	nullDataHandler: function(transaction, results){
	},
	txError: function(tx) {
		console.log(tx);
	},
	updateStatus: function(status){
		$('#status').html(status);
	},
	changePage: function(page, pageName) {
		_app.actualPage = page;
		page = (page == "update") ? "register" : page;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				$("#page-name").html(pageName);
				$("#content").html(xhttp.responseText);
			}
		};
		xhttp.open("GET", "view/"+ page +".html", true);
		xhttp.send();
	},
	logout: function() {
		_app.removeTables();
		location.reload();
	}	
};
