import { workClubController } from '../controllers/workClub.controller';
import { authJwt } from '../middlewares/authJwt';
import { router } from './route.config';

router.get('/all-work-club', workClubController.getWorks);
router.post('/create-work-club', workClubController.createWork);
router.delete('/delete-work-club/:id', workClubController.deleteWorkById);
router.put('/update-work-club/:id', workClubController.updateWork);

export const workClubRouter = router;
