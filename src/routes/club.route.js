import { clubController } from '../controllers/club.controller';
import { authJwt } from '../middlewares/authJwt';
import { router } from './route.config';

router.post('/create-club', clubController.createClub);
router.get('/get-all', clubController.getClubs);

export const clubRouter = router;
