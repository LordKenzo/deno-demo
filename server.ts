import { config, Application, Context } from './deps.ts';
import router from './routes/routes.ts';

// With safe:true config will produce an error if variable is missing.
const { PORT } = config({safe: true});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server started on port: ${PORT}`);

await app.listen({ port: parseInt(PORT) })