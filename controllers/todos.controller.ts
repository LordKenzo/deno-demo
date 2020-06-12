import Todo from '../models/Todo.ts';
import { RouterContext, Status } from '../deps.ts';


export const getAllTodos = async (ctx: RouterContext) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos: Todo[] = await res.json();
    ctx.response.status = Status.OK;
    ctx.response.type = "json";
    ctx.response.body = {
        resultSet: todos
    };
}

export const getTodo = async (ctx: RouterContext) => {
    const id = ctx.params && ctx.params.id;
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const todo: Todo = await res.json();
    ctx.response.status = Status.OK;
    ctx.response.type = "json";
    ctx.response.body = {
        resultSet: todo
    };
}

export const addTodo = async (ctx: RouterContext) => {
    const todo = ctx.request.body;
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    })
    ctx.response.type = "json";
    if (response.status === 201)  {
        const result = await response.json();
        console.log(result);
        ctx.response.status = Status.Created;
        ctx.response.body = {
            resultSet: result
        };
    } else  {
        ctx.response.status = Status.BadRequest;
        ctx.response.body = {
            message: 'Request malformed',
            err: response.statusText
        };
    }
}

export const deleteTodo = async(ctx: RouterContext) => {
    const id = ctx.params && ctx.params.id;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
    });
    ctx.response.type = "json";
    console.log('RESPONSE', response);
    if (response.status === 200)  {
        const result = await response.json();
        ctx.response.status = Status.OK;
        ctx.response.body = {
            resultSet: result
        };
    } else  {
        ctx.response.status = Status.BadRequest;
        ctx.response.body = {
            message: 'Request malformed',
            err: response.statusText
        };
    }
}

export const updateTodo = async(ctx: RouterContext) => {
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
    } else  {
        ctx.response.status = Status.BadRequest;
        ctx.response.body = {
            message: 'Request malformed',
            err: response.statusText
        };
    }
    
    
}