		var path = require("path"),
		fs = require("fs");
		//fs.readFile(path.join(__dirname, '../..', 'foo.bar'))

		//var db_controller = require('../controllers/database_controller.js');  
		var db_controller = require(path.normalize(__dirname + "/../../database_controller.js"));  


		var qry_action = db_controller.sd_use;//-------------SQL CONNECTION GOING TO PERFORM THE CRUD ACTIONS ON USERS
		var url = require('url');
		//----------------------------Loging into the eSente-------------------------


		//--------------------------Uploading  Clinic Daily income
		module.exports.Upload = function(req,res){

		    console.log('reached hia');
			var UploadDetails = req.body;//-----------Getting the new Account details

			var _=require("underscore");

			console.log(UploadDetails);
			var jsonObject=JSON.parse(JSON.stringify(UploadDetails));
			var count = 0;

			//--------------------Going through all the rows of json objects
			_.each(jsonObject, function(data_obj) {
				console.log('Record----'+count+1);

				//----------------Getting a row object
				 var row =JSON.parse(JSON.stringify(data_obj));



				 //--------------Check if record has been entred Promise--------
				 let checkIfRecordHasBeenEntred = function(){
				 	return new Promise(function(resolve,reject){
				 		//------------Checking if data has already been uploaded------------
				 qry_action.query('SELECT * FROM daily_incomes WHERE di_date = ? and di_mci_code =?',[row.DI_DATE,row.DI_MCI_CODE] , function(err, results) {
				 	
				 	//-------------If there is an error with the query
				 	if (err) throw err;

				 	//------------if there is no error
				 	//---------------If no data has been entred-----------
				 	if (results.length === 0){

				 		resolve('is_new');

				 	}//----end of if

				 	//--------------If data has been uploaded
				 	else
				 	{
				 		reject('is_old');

				 	}


				 });


				 //------------------------------END OF CHECK----------------------------------------------------------------


				 	});


				 }

				  //--------------End of Check if record has been entred Promise--------


				 



				 //--------------------Insert into Daily INcomes promise
				 		let insertIntoDailyIncomes = function(){
				 			return new Promise(function(resolve,reject){
				 				qry_action.query('insert into daily_incomes set ?',row,function(err,results){

				 					if (err){
				 						reject('error executing the query');

				 					}
				 					else
				 					{
				 						resolve(results.insertId);
				 						console.log('Inserted DAILY_INCOMES TABLE id----'+results.insertId);

				 					}


				 				});

				 			});

				 		}
				 		//------------------------End on Inserting ino Daily Incomes Proise



				 		//---------------------UPDATING DAILY INCOMES PROMISE----------------
					 		let upDateDailyIncome = function(){

					 			return new Promise(function(resolve,reject){
					 						 qry_action.query('update daily_incomes set DI_TOTAL_AMOUNT = ?,DI_AMOUNT_PAID =?,DI_AMOUNT_NOT_PAID =?,DI_EXPENSE =? where di_date =? and di_mci_code =?',[row.DI_TOTAL_AMOUNT,row.DI_AMOUNT_PAID,row.DI_AMOUNT_NOT_PAID,row.DI_EXPENSE,row.DI_DATE,row.DI_MCI_CODE] , function(err, result) {
			               if (err) {
			               	reject('error executing the query');


			               } 
								else
					 					{
					 						resolve(results.insertId);

					 					}
			                 });

					 			});

					 		}

				 		//---------------------END OF UPDATING DAILY INCOMES PROMISE



				 		//-------------------------Getting the maximum inserted record Promise------------
				 		let getMaximumInsertedRecord = function(){

				 			return new Promise(function(resolve,reject){
				 					qry_action.query('select max(di_id) as "ID" from daily_incomes ',function(err,results){

				 					if (err){
				 						reject('error executing the query');

				 					}
				 					else
				 					{
				 						resolve(results[0].ID);

				 					}


				 				});

				 			});
				 		}
				 		//-------------------------End of Getting the maximum inserted record Promise------------


				 		//------------------------------INSERTING INTO THE DAILY_INCOMES_USER_SYNC_TABLE PROMISE---------

				 		let InsertIntoDailyIncomesUserSyncTable = function(max_id){
				 			return new Promise(function(resolve,reject){
				 				//---------Getting all the users with the same access code------
				 				qry_action.query('select * from users_info where ui_mci_access_code = ?',row.DI_MCI_CODE,function(err,results){
				 					if (err){
				 						reject('error executing the query');

				 					}
				 					else
				 					{
				 						for (var i = 0; i < results.length; i++){
				 							qry_action.query('insert into daily_income_user_sync set ?',{DIUS_UI_ID : results[i].UI_ID,DIUS_DI_ID:max_id},function(err,result){

				 								if (err){
				 									reject('error executing the query');

				 								}
				 								else
				 								{
				 									console.log('Inserted DAILY_INCOMES_USER_SYNC_TABLE id----'+results.insertId);

				 									resolve(results.insertId);

				 								}

				 							});


				 						}

				 					}


				 				});

				 				//------------------End of Getting users with the same acess code





				 			});



				 		}

				 		//------------------------------END OF INSERTING INTO THE DAILY_INCOMES_USER_SYNC_TABLE PROMISE---------





				 		//---------------------GOING TO PERFORM THE TRAIN FUNCTIONALITY


				 		checkIfRecordHasBeenEntred().then(function(result){
				 			return insertIntoDailyIncomes();

				 		}).then(function(result){
				 			return getMaximumInsertedRecord();
				 		}).then(function(result){
				 			return InsertIntoDailyIncomesUserSyncTable(result);
				 		}).catch(function(result){
				 			return upDateDailyIncome();
				 		})

				 		//----------------------------END OF TRAIN FUNCTIONLAITY



























	 });
		return   res.end(JSON.stringify({ resp:"pass",msg:'Daily Income Upload Successfull'}));

		}
		//-----------------------End of Uploading Clinic Daily Income
