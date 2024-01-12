const express= require("express");
const router = express.Router();
const materialsController = require('../controllers/materials.controller');

router.get("/", materialsController.index);
router.get("/:id", materialsController.showMaterial);
router.post("/", materialsController.uploadMaterial);
router.patch("/:id", materialsController.updateMaterial);

module.exports = router;