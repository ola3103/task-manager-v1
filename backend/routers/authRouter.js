const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/verify-email", authController.verifyEmail);
router.post("/signin", authController.signin);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.patch(
  "/updateMe",
  authController.protect,
  authController.updateUserData
);
router.get(
  "/user/showMe",
  authController.protect,
  authController.showCurrentUser
);
router.patch(
  "/updatePassword",
  authController.protect,
  authController.updateUserPassword
);
router.delete("/logout", authController.protect, authController.logout);

module.exports = router;
