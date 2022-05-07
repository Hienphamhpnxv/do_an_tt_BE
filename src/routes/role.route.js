import { roleController } from '../controllers/role.controller';
import { authJwt } from '../middlewares/authJwt';
import { router } from './route.config';

router.get('/all-role', roleController.getRoles);

export const roleRouter = router;
