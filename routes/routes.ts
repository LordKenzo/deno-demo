import { Router, send } from '../deps.ts';
import { getAllTodos, getTodo, addTodo, deleteTodo, updateTodo } from '../controllers/todos.controller.ts';

const router = new Router();

router.get('/todos', getAllTodos);
router.get('/todos/:id', getTodo);
router.post('/todos', addTodo);
router.delete('/todos/:id', deleteTodo);
router.put('/todos/:id', updateTodo);
router.get('/', 
    async (context) => {
        await send(context, context.request.url.pathname, {
          root: `${Deno.cwd()}/static`,
          index: "index.html",
        });
    }
)
export default router;