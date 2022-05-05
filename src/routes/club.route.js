import { clubController } from '../controllers/club.controller';
import { authJwt } from '../middlewares/authJwt';
import { router } from './route.config';

router.post('', clubController.createClub);
router.get('', clubController.getClubs);

export const clubRouter = router;
