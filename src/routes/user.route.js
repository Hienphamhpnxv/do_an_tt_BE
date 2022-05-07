import express from 'express';
import { authJwt } from '../middlewares/authJwt';
import { userController } from '../controllers/user.controller';
import { router } from './route.config';
import { verifySignUp } from '../middlewares/verifySignUp';

router.get('/test/all', userController.allAccess);

router.get('/test/user', [authJwt.verifyToken, authJwt.isModerator], userController.userBoard);

router.get('/test/mod', [authJwt.verifyToken, authJwt.isModerator], userController.moderatorBoard);

router.get('/test/admin', [authJwt.verifyToken, authJwt.isAdmin], userController.adminBoard);

router.post('/create', [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], userController.createUser);

router.put('/:id/update', userController.updateUser);

router.post('/avatar/update', [authJwt.verifyToken], userController.updateAvatar);

router.delete('/:id', userController.deleteUserById);

router.get('/all-users/:idClub', userController.getAllUsers);

export const userRouter = router;
