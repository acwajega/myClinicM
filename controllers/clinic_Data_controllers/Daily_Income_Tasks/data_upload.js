var db_controller = require('../controllers/database_controller.js');   

var qry_action = db_controller.sd_use;//-------------SQL CONNECTION GOING TO PERFORM THE CRUD ACTIONS ON USERS
var url = require('url');
//----------------------------Loging into the eSente-------------------------


//--------------------------Uploading  Clinic Daily income
module.exports.Upload = function(req,res){
		var UploadDetails = req.body;//-----------Getting the new Account details

		var _=require("underscore");

		console.log(UploadDetails);
		var jsonObject=JSON.parse(JSON.stringify(UploadDetails));

		//--------------------Going through all the rows of json objects
		_.each(jsonObject, function(data_obj) {

			//----------------Getting a row object
			 var row =JSON.parse(JSON.stringify(data_obj));
			 //------------Checking if data has already been uploaded------------
			 qry_action.query('SELECT * FROM daily_incomes WHERE di_date = ? and di_mci_code =?',[row.DI_DATE,row.DI_MCI_CODE] , function(err, result) {
			 	
			 	//-------------If there is an error with the query
			 	if (err) throw err;

			 	//------------if there is no error
			 	//---------------If no data has been entred-----------
			 	if (result.length ==0){

			 		 qry_action.query('insert into daily_incomes set ?',row, function(err, result) {
                          if (err) throw err;
    
                       console.log(result.insertId);
                             });



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
