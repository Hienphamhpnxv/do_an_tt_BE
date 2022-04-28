import express from "express";
import { httpStatusCode } from "../utillities/constants";
import { authWebController } from "../controllers/auth.controller";
import { verifySignUp } from "../middlewares/verifySignUp";

const router = express.Router();

router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  authWebController.signup
);

router.post("/signin", authWebController.signin);

export const authRouter = router;
