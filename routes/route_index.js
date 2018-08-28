var express = require('express');
var router = express.Router();



//-----------------------ACCOUNT DATA CONTROLLERS--------------------------
var accounts_controller = require('../controllers/accounts_controller.js');
//-----------------------END OF ACCOUNT DATA CONTROLLERS------------------


//=======================================================================
//------------CLINIC DATA CONTROLLERS--------------------------------

var clinic_controller = require('../controllers/clinic_controller.js');
var clinic_controller_DailyIncomeTasks_dataUpload =require('../controllers/clinic_Data_controllers/Daily_Income_Tasks/data_upload.js');
var clinic_controller_DailyIncomeTasks_dataSync =require('../controllers/clinic_Data_controllers/Daily_Income_Tasks/data_sync.js');


var clinic_controller_IncomeSummaryTasks_dataUpload =require('../controllers/clinic_Data_controllers/Income_Summary_Tasks/data_upload.js');
var clinic_controller_IncomeSummaryTasks_dataSync =require('../controllers/clinic_Data_controllers/Income_Summary_Tasks/data_sync.js');


var clinic_controller_PharmacySalesTasks_dataUpload =require('../controllers/clinic_Data_controllers/Pharmacy_Sales_Tasks/data_upload.js');
var clinic_controller_PharmacySalesTasks_dataSync =require('../controllers/clinic_Data_controllers/Pharmacy_Sales_Tasks/data_sync.js');



var clinic_controller_LabSalesTasks_dataUpload =require('../controllers/clinic_Data_controllers/Lab_Sales_Tasks/data_upload.js');
var clinic_controller_LabSalesTasks_dataSync =require('../controllers/clinic_Data_controllers/Lab_Sales_Tasks/data_sync.js');




//------------END OF CLINIC DATA CONTROLLERS--------------------------
//=======================================================================



//-------------- routing to user api for New user account Creation ------------------
router.post('/api/accounts/createNewClinicAccount',accounts_controller.CreateNewClinicAccount);
//---------------- End of New user account Creation ---------------------------------


//-------------- routing to user api for New user account Creation ------------------
router.post('/api/accounts/createNewUserAccount',accounts_controller.CreateNewUserAccount);
//---------------- End of New user account Creation ---------------------------------




//===================================================================================================
//-------------- routing to Clinic api for Daily Income Upload ------------------
router.post('/api/clinicData/Upload/DailyIncome',clinic_controller_DailyIncomeTasks_dataUpload.Upload);
//---------------- End of Daily Income Upload ---------------------------------
//-------------- routing to Clinic api for Daily Income Sync ------------------
router.post('/api/clinicData/Sync/DailyIncome',clinic_controller_DailyIncomeTasks_dataSync.Sync);
//---------------- End of Daily Income Upload ---------------------------------
//===================================================================================================





//===================================================================================================
//-------------- routing to Clinic api for Daily Income Upload ------------------
router.post('/api/clinicData/Upload/IncomeSummary',clinic_controller_IncomeSummaryTasks_dataUpload.Upload);
//---------------- End of Daily Income Upload ---------------------------------
//-------------- routing to Clinic api for Daily Income Sync ------------------
router.post('/api/clinicData/Sync/IncomeSummary',clinic_controller_IncomeSummaryTasks_dataSync.Sync);
//---------------- End of Daily Income Upload ---------------------------------
//===================================================================================================





//===================================================================================================
//-------------- routing to Clinic api for Daily Income Upload ------------------
router.post('/api/clinicData/Upload/PharmacySales',clinic_controller_PharmacySalesTasks_dataUpload.Upload);
//---------------- End of Daily Income Upload ---------------------------------
//-------------- routing to Clinic api for Daily Income Sync ------------------
router.post('/api/clinicData/Sync/PharmacySales',clinic_controller_PharmacySalesTasks_dataSync.Sync);
//---------------- End of Daily Income Upload ---------------------------------
//===================================================================================================







//===================================================================================================
//-------------- routing to Clinic api for Daily Income Upload ------------------
router.post('/api/clinicData/Upload/LabSales',clinic_controller_LabSalesTasks_dataUpload.Upload);
//---------------- End of Daily Income Upload ---------------------------------
//-------------- routing to Clinic api for Daily Income Sync ------------------
router.post('/api/clinicData/Sync/LabSales',clinic_controller_LabSalesTasks_dataSync.Sync);
//---------------- End of Daily Income Upload ---------------------------------
//===================================================================================================









module.exports = router;