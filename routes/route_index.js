var express = require('express');
var router = express.Router();
var accounts_controller = require('../controllers/accounts_controller.js');


var clinic_controller = require('../controllers/clinic_controller.js');



//-------------- routing to user api for New user account Creation ------------------
router.post('/api/accounts/createNewClinicAccount',accounts_controller.CreateNewClinicAccount);
//---------------- End of New user account Creation ---------------------------------

//-------------- routing to user api for New user account Creation ------------------
router.post('/api/accounts/createNewUserAccount',accounts_controller.CreateNewUserAccount);
//---------------- End of New user account Creation ---------------------------------


//-------------- routing to Clinic api for Daily Income Upload ------------------
router.post('/api/clinicData/Upload/DailyIncome',clinic_controller.UploadClinicDailyIncome);
//---------------- End of Daily Income Upload ---------------------------------



//-------------- routing to Clinic api for Daily Income Sync ------------------
router.post('/api/clinicData/Sync/DailyIncome',clinic_controller.SyncClinicDailyIncome);
//---------------- End of Daily Income Upload ---------------------------------


module.exports = router;