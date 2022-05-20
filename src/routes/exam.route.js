import { examController } from '../controllers/exam.controller';
import { router } from './route.config';

router.post('/create-exam-document', examController.createExam);
router.put('/update-exam-document/:id', examController.updateExam);
router.get('/get-exam-document/:classroomId', examController.getAllExams);
router.delete('/exam-document/:id', examController.deleteExamById);

export const examDocumentRoute = router;
