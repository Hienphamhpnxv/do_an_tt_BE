import express from "express";
import { authJwt } from "../middlewares/authJwt";
import { userController } from "../controllers/user.controller";
const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/test/all", userController.allAccess);

router.get(
  "/test/user",
  [authJwt.verifyToken, authJwt.isModerator],
  userController.userBoard
);

router.get(
  "/test/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  userController.moderatorBoard
);

router.get(
  "/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.adminBoard
);

router.put(
  "/:id/update",
  [authJwt.verifyToken],
  userController.updateUser
);

router.post(
  "/avatar/update",
  [authJwt.verifyToken],
  userController.updateAvatar
)

export const userRouter = router;
