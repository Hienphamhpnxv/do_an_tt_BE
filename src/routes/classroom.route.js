import { classroomController } from '../controllers/classroom.controller';
import { router } from './route.config';

router.post('/create-class', classroomController.createClassroom);
router.get('/get-all-class/:clubId', classroomController.getAllClassroom);

export const classroomRoute = router;
