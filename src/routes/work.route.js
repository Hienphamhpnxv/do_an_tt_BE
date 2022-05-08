import { workController } from '../controllers/work.controller';
import { authJwt } from '../middlewares/authJwt';
import { router } from './route.config';

router.get('/all-work/:idClub', workController.getWorks);
router.post('/create-work', workController.createWork);
router.delete('/delete/:id', workController.deleteWorkById);
router.put('/update/:id', workController.updateWork);

export const workRouter = router;
