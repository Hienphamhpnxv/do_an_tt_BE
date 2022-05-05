import { httpStatusCode } from '../utillities/constants';
import { authWebController } from '../controllers/auth.controller';
import { verifySignUp } from '../middlewares/verifySignUp';
import { router } from './route.config';

router.post('/signup', [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], authWebController.signup);

router.post('/signin', authWebController.signin);

export const authRouter = router;
