import { Router } from '../deps.ts';
import { fetchAllPosts } from '../controllers/post.controller.ts';

const router = new Router();

router.get('/', fetchAllPosts);

export default router;