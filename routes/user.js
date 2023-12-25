const express = require("express");
const router = express.Router();
const {handleGetAllUsers,handleGetUserById,handleUpdateUserById,handleDeleteUserById,handleCreateNewUserById} = require('../controllers/user')


router.route("/").get(handleGetAllUsers).post(handleCreateNewUserById);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);


module.exports = router;