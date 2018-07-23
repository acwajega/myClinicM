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

			//--------------------Going through all the rows of json objects
			_.each(jsonObject, function(data_obj) {

				//----------------Getting a row object
				 var row =JSON.parse(JSON.stringify(data_obj));
				 //------------Checking if data has already been uploaded------------
				 qry_action.query('SELECT * FROM daily_incomes WHERE di_date = ? and di_mci_code =?',[row.DI_DATE,row.DI_MCI_CODE] , function(err, results) {
				 	
				 	//-------------If there is an error with the query
				 	if (err) throw err;

				 	//------------if there is no error
				 	//---------------If no data has been entred-----------
				 	if (results.length ==0){


				 		//-------------------Inserting into the daily incomes table
				 		 qry_action.query('insert into daily_incomes set ?',row, function(err, results) {
		                      if (err) throw err;

		                   console.log(results.insertId);
		                         });
				 		//-------------------End of Inserting into the daily incomes table



				 		//----------------------Getting the users of the specific clinic access code------
				 		qry_action.query('select * from users_info where ui_mci_access_code = ? ',[row.DI_MCI_CODE], function(err,results){

				 			if (err){
				 				throw err;
				 			}
				 			else
				 			{
				 				if (results.length ==0){
									//------------The Acess Code has no users-------		

				 				}
				 				else
				 				{
				 					//-----------------The Access Code has Users----------


				 				

				 					//-----------------------Looping through all the users and then inserting the record-----
				 					  for (var i = 0; i < results.length; i++){
				 					  	  var trans_record = results[i];  
				                              var trans_obj = JSON.parse(JSON.stringify(trans_record));


				                              	var RecordId =0;
				                              	//----------------Getting the maximum record ID-----
				 						 qry_action.query('select max(di_id) as ID from daily_incomes', function(err, result) {
		                               if (err) throw err;         
		                               RecordId = results[0].DI_ID;                    
		                                      });
				 				        	//--------------------End of Getting the maximum Record Id

				                              	//-----------------Insert into daily_income_user_sync----------------
				                              	 //-------------Getting the request datae and time
											var d = new Date(); 
											var mdate = d.getFullYear() +'-'+(d.getMonth()+1)+'-'+d.getDate() ;

											var time = new Date();
											var m_time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
											//-------------End of Getting the request date and time

				                              	qry_action.query('insert into daily_income_user_sync set ?',{DIUS_UI_ID:trans_obj.UI_ID,DIUS_DI_ID :RecordId,DIUS_DATE:mdate,DIUS_TIME:m_time },function(err,results){
				                              		if (err){
				 											throw err;
				 									}


				                              	});




				                              	//------------------End of Insert into daily_income_user_sync 




				 					  }

				 					//------------------End of inserting the record to specific account Container-----


				 				}



				 			}



				 		});


				 		//----------------------End of Getting users of the specific access code -------


				 	}

				 	//--------------If data has been uploaded
				 	else
				 	{
				 		 qry_action.query('update daily_incomes set DI_TOTAL_AMOUNT = ?,DI_AMOUNT_PAID =?,DI_AMOUNT_NOT_PAID =?,DI_EXPENSE =? where di_date =?',[row.DI_TOTAL_AMOUNT,row.DI_AMOUNT_PAID,row.DI_AMOUNT_NOT_PAID,row.EXPENSE,row.DI_DATE] , function(err, result) {
		               if (err) throw err ;

		              console.log(result.insertId);
		                 });

				 	}





				 });





			});


		return   res.end(JSON.stringify({ resp:"pass",msg:'Daily Income Upload Successfull'}));

		}
		//-----------------------End of Uploading Clinic Daily Income
