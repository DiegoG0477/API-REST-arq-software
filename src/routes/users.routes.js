const express= require("express");
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.get("/", usersController.index);
router.get("/:id", usersController.getById);
router.delete("/:id", usersController.deleteUser);
router.patch('/user/:id', usersController.updateUser);
router.put('/user/:id', usersController.completeUpdate);
router.get("/get/IdToken", usersController.getTokenId);
module.exports = router;