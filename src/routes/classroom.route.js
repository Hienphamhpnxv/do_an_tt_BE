import { classroomController } from '../controllers/classroom.controller';
import { router } from './route.config';

router.post('/create-class', classroomController.createClassroom);
router.get('/get-all-class/:clubId', classroomController.getAllClassroom);
router.put('/update-class/:id', classroomController.updateStatusActiveClassroom);

export const classroomRoute = router;
