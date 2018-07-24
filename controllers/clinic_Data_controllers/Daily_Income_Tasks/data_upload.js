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
				 	if (results.length === 0){


				 		//-------------------Inserting into the daily incomes table
				 		 qry_action.query('insert into daily_incomes set ?',row, async function(err, results) {
		                      if (err) {
		                      	throw err;

		                      }
		                      else
		                      {


		                      	//----Has INserted
		                      	await console.log(results.insertId);

		                      	//--------------------------Getting the maximum id from the insert statement----------
		                      	await qry_action.query('select max(di_id) as RECORD_ID from daily_incomes', async function (err,results){
		                      		  if (err) {
		                      	throw err;

		                      }
		                      else
		                      {
		                      	const RECORD_ID = await results[0].RECORD_ID;
		                      	await console.log('--'+RECORD_ID+'----');

		                      	//----------------------Getting users with the same access code and inserting the record to their mail box-------
		                      	await qry_action.query('select * from users_info where ui_mci_access_code = ? ',[row.DI_MCI_CODE], async function(err,results){

		                      		if (err){
		                      			throw err;

		                      		}
		                      		else

		                      		{
		                      			//-------------------FOR LOOP--------------------------
		                      			 for (var i = 0; i < results.length; i++){
		                      				//-------------Getting the request datae and time
											var d = new Date(); 
											var mdate = d.getFullYear() +'-'+(d.getMonth()+1)+'-'+d.getDate() ;

											var time = new Date();
											var m_time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
											//-------------End of Getting the request date and time
		                      				//------------------inserting the record ingo the daily_income_user_sync-------
		                      				await qry_action.query('insert into daily_income_user_sync set ? ',{DIUS_UI_ID:results[i].UI_ID,DIUS_DI_ID:RECORD_ID,DIUS_DATE:mdate,DIUS_TIME:m_time},async function(err,results){

		                      					if (err){

		                      					}
		                      					else
		                      					{
		                      						await console.log(results.insertId);
		                      					}
		                      				});

		                      				//-------------------end of inserting the record ingo the daily_income_user_sync-----


		                      			}
		                      			//-------------------END OF FOR LOOP--------------------------


		                      		}


		                      	});

		                      	//--------------------END OF Getting users with the same access code and inserting the record to their mail box-------
		                      }



		                      	});



		                      	//-------------------------End of Getting the maximum id from the insert statement-----

		                      }             


		                         });
				 		//-------------------End of Inserting into the daily incomes table

				 	}

				 	//--------------If data has been uploaded
				 	else
				 	{
				 		 qry_action.query('update daily_incomes set DI_TOTAL_AMOUNT = ?,DI_AMOUNT_PAID =?,DI_AMOUNT_NOT_PAID =?,DI_EXPENSE =? where di_date =? and di_mci_code =?',[row.DI_TOTAL_AMOUNT,row.DI_AMOUNT_PAID,row.DI_AMOUNT_NOT_PAID,row.DI_EXPENSE,row.DI_DATE,row.DI_MCI_CODE] , function(err, result) {
		               if (err) throw err ;

		              console.log(result.insertId);
		                 });

				 	}


				 });


			});


		return   res.end(JSON.stringify({ resp:"pass",msg:'Daily Income Upload Successfull'}));

		}
		//-----------------------End of Uploading Clinic Daily Income
