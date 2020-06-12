import Post from '../models/Post.ts';
import { Context } from '../deps.ts';

export const fetchAllPosts = (ctx: Context) => {
    ctx.response.body = 'Hello fetch All Posts';
}