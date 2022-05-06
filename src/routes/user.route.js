import express from 'express';
import { authJwt } from '../middlewares/authJwt';
import { userController } from '../controllers/user.controller';
import { router } from './route.config';

router.get('/test/all', userController.allAccess);

router.get('/test/user', [authJwt.verifyToken, authJwt.isModerator], userController.userBoard);

router.get('/test/mod', [authJwt.verifyToken, authJwt.isModerator], userController.moderatorBoard);

router.get('/test/admin', [authJwt.verifyToken, authJwt.isAdmin], userController.adminBoard);

router.post('/create', userController.createUser);

router.put('/:id/update', [authJwt.verifyToken], userController.updateUser);

router.post('/avatar/update', [authJwt.verifyToken], userController.updateAvatar);

router.delete('/:id', userController.deleteUserById);

export const userRouter = router;
