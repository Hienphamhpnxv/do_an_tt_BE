import { documentController } from '../controllers/document.controller';
import { router } from './route.config';

router.post('/create-document', documentController.createDocument);
router.get('/get-all-document/:classroomId', documentController.getAllDocumentByClassroomID);
router.get('/get-all-document/:classroomId/active', documentController.getAllDocumentActiveByClassroomID);
router.delete('/delete-document/:id', documentController.deleteDocumentById);

export const documentRoute = router;
