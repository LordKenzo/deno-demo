import Todo from '../models/Todo.ts';
import { RouterContext, Status, HttpError, isHttpError } from '../deps.ts';

const requestError = (ctx: RouterContext, err: HttpError | any, message: string = 'Error on request') => {
    if (isHttpError(err)) {
        switch (err.status) {
            case Status.NotFound:
                ctx.response.status = Status.NotFound;
                ctx.response.body = {
                    message
                };
            break;
            case Status.Forbidden:
                ctx.response.status = Status.Forbidden;
                ctx.response.body = {
                    message: "You don't have permissions"
                };
                break;
            default:
                ctx.response.status = Status.InternalServerError;
                ctx.response.body = {
                    message: "Kernel Panic: Internal Server Error x.x !!!"
                };
        }
    } else {
        throw err;
    }
}

export const getAllTodos = async (ctx: RouterContext) => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos');
        ctx.response.type = "json";
        if (res.status === 200) {
            const todos: Todo[] = await res.json();
            ctx.response.status = Status.OK;
            ctx.response.body = {
                resultSet: todos
            };
        } else {
            throw ctx.throw(res.status)
        }
    }
    catch(err){
        requestError(ctx, err, 'Error getting all todos');
    }
}

export const getTodo = async (ctx: RouterContext) => {
    try {
        const id = ctx.params && ctx.params.id;
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        ctx.response.type = "json";
        if (res.status === 200) {
            const todo: Todo = await res.json();
            ctx.response.status = Status.OK;
            ctx.response.body = {
                resultSet: todo
            };
        } else {
            throw ctx.throw(res.status)
        }
    } catch(err) {
        requestError(ctx, err, 'Error getting todo');
    }
}

export const addTodo = async (ctx: RouterContext) => {
    try {
        const todo = ctx.request.body;
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
        })
        ctx.response.type = "json";
        if (res.status === 201)  {
            const result = await res.json();
            ctx.response.status = Status.Created;
            ctx.response.body = {
                resultSet: result
            };
        } else {
            throw ctx.throw(res.status)
        }
    } catch (err) {
        requestError(ctx, err, 'Error create a new todo');
    }

}

export const deleteTodo = async(ctx: RouterContext) => {
    try {
        const id = ctx.params && ctx.params.id;
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE'
        });
        ctx.response.type = "json";
        if (response.status === 200)  {
            const result = await response.json();
            ctx.response.status = Status.OK;
            ctx.response.body = {
                resultSet: result
            };
        } else {
            throw ctx.throw(response.status)
        }
    } catch (err) {
        requestError(ctx, err, 'Error delete a todo');
    }
    
}

export const updateTodo = async(ctx: RouterContext) => {
    try {
        const id = ctx.params && ctx.params.id;
        const todo = ctx.request.body;
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id,
                todo
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        ctx.response.type = "json";
        if (response.status === 200)  {
            const result = await response.json();
            ctx.response.status = Status.OK;
            ctx.response.body = {
                resultSet: result
            };
        } else {
            throw ctx.throw(response.status)
        }
    } catch (err) {
        requestError(ctx, err, 'Error updating a todo');
    }

}