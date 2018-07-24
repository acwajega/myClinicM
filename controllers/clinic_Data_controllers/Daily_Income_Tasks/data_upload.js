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


			_.each(jsonObject, async function(data_obj) {


                console.log('------------------------------');
                count =count+1;
				console.log('Record COUNR----'+count);

				//----------------Getting a row object
				 var row =JSON.parse(JSON.stringify(data_obj));


				 console.log('Record----'+data_obj);

				  console.log('------------------------------');




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
				 						console.log('Inserted DAILY_INCOMES TABLE id----'+count);

				 					}

				 				});

				 			});

				 		}
				 		//------------------------End on Inserting ino Daily Incomes Proise



				 		//---------------------UPDATING DAILY INCOMES PROMISE----------------
					 		let upDateDailyIncome = function(){

					 			return new Promise(function(resolve,reject){
					 						 qry_action.query('update daily_incomes set DI_TOTAL_AMOUNT = ?,DI_AMOUNT_PAID =?,DI_AMOUNT_NOT_PAID =?,DI_EXPENSE =? where di_date =? and di_mci_code =?',[row.DI_TOTAL_AMOUNT,row.DI_AMOUNT_PAID,row.DI_AMOUNT_NOT_PAID,row.DI_EXPENSE,row.DI_DATE,row.DI_MCI_CODE] , function(err, results) {
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
				 		//---------------------GOING TO PERFORM THE TRAIN FUNCTIONALITY

				 	 await checkIfRecordHasBeenEntred().then(function(result){
				 	   	

				 			return insertIntoDailyIncomes();

				 		}).catch(function(result){
				 			return upDateDailyIncome();
				 		})


	 });


console.log('END CODE------------------------------------------------------------');
//------------------------------INSERTING INTO THE DAILY_INCOMES_USER_SYNC_TABLE PROMISE---------

				 		let InsertIntoDailyIncomesUserSyncTable = function(){
				 		
				 				console.log('REACHED HIAE------------------------------------------------------------');


				 				qry_action.query('select * from daily_incomes where di_sync_status = ?  ',['N'],function(err,results){

				 					if (err){
				 						throw err;
				 					}
				 					else
				 					{

				 					
				 				for (var i = 0; i < results.length; i++){

				 					var dailyIncomeRow = results[i];

				 					(function(rowM) {
				 						

				 				//---------Getting all the users with the same access code------
				 				qry_action.query('select * from users_info where ui_mci_access_code = ?',rowM.DI_MCI_CODE,function(err,results){
				 					if (err){
				 					

				 					}
				 					else
				 					{
				 					
				 						for (var i = 0; i < results.length; i++){
				 							var userRow = results[i];
				 							 (function(row) {

				 							
				 							qry_action.query('insert into daily_income_user_sync set ?',{DIUS_UI_ID :row.UI_ID,DIUS_DI_ID:rowM.DI_ID },function(err,result){

				 								if (err){
				 									

				 								}
				 								else
				 								{
				 								
				 									

				 								}

				 							});


				 							//------------------Updating the sync status------
				 							qry_action.query('updating daily_incomes set di_sync_status = ? where di_id = ?',['N',rowM.DI_ID],function(err,result){

				 								if (err){
				 									

				 								}
				 								else
				 								{
				 								
				 									

				 								}

				 							});





				 							//-------------------End of Updating sync sttaus


				 							})(userRow);





				 						}//-----End of For Loop

				 					}


				 				});

				 				//------------------End of Getting users with the same acess cod
				 							


				 						})(dailyIncomeRow);
				 						}//---------------End of For loop

				 					}


				 				});


				 		


				 		}

				 		//------------------------------END OF INSERTING INTO THE DAILY_INCOMES_USER_SYNC_TABLE PROMISE---------


InsertIntoDailyIncomesUserSyncTable();




return   res.end(JSON.stringify({ resp:"pass",msg:'Daily Income Upload Successfull'}));



		}
		//-----------------------End of Uploading Clinic Daily Income
