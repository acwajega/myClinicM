var express = require('express');
var router = express.Router();
var accounts_controller = require('../controllers/accounts_controller.js');



//-------------- routing to user api for New user account Creation ------------------
router.post('/api/accounts/createNewClinicAccount',accounts_controller.CreateNewClinicAccount);
//---------------- End of New user account Creation ---------------------------------

//-------------- routing to user api for New user account Creation ------------------
router.post('/api/accounts/createNewUserAccount',accounts_controller.CreateNewUserAccount);
//---------------- End of New user account Creation ---------------------------------


module.exports = router;