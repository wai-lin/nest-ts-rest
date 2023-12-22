import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export interface Post {
  id: string;
  title: string;
  summary: string;
  detail: string;
  cover_img?: string;
}

export const apiContract = c.router({
  getPosts: {
    method: "GET",
    path: "/posts",
    responses: {
      200: c.type<{ posts: Post[]; total: number }>(),
    },
    query: z.object({
      take: z.string().transform(Number).optional(),
      skip: z.string().transform(Number).optional(),
      search: z.string().optional(),
    }),
    summary: "Get all posts",
  },
  getPost: {
    method: "GET",
    path: "/posts/:id",
    responses: {
      200: c.type<Post | null>(),
    },
    pathParams: z.object({ id: z.string() }),
    summary: "Get a post",
  },
});
