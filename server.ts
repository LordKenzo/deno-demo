import { 
    config, 
    Application,
    Status,
    bgMagenta,
    bold,
    cyan} from './deps.ts';
import router from './routes/routes.ts';

// With safe:true config will produce an error if variable is missing.
const { PORT } = config({safe: true});

const app = new Application();

app.addEventListener("error", (evt) => {
    // Will log the thrown error to the console.
    console.log(evt.error);
});


app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx) => {
    ctx.response.status = Status.NotFound;
    ctx.response.type = "json";
    ctx.response.body = {
        message: '404 - Page Not Found'
    }
  });
console.log( bgMagenta(bold(cyan(`Deno is running on port: ${PORT}`))), );

await app.listen({ port: parseInt(PORT) })