const express = require('express');
const chargesController = require('../controllers/chargesController');
const propertiesController = require('../controllers/propertiesController');
const { rolesValidator } = require('../middleware/roles_validator');
const { validateToken } = require('../middleware/token_validator');
const router = express.Router();


router.get('/byproperyid/:id',validateToken,rolesValidator(2001), chargesController.getChargesByPropertyID);
router.get('/agentCharges',validateToken,rolesValidator(2001), chargesController.getALLChargesByPropertyID);
router.get('/agentProperties/:id',validateToken,rolesValidator(2001),propertiesController.getAgentPropertiesData );
router.post('/createCharge',validateToken,rolesValidator(2001), chargesController.createCharges);
router.post('/createConsumption',validateToken,rolesValidator(2001,3000), chargesController.createConsumptionUtility);

module.exports = router;