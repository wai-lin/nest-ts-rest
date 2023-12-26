import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const post = z.object({
  id: z.string().uuid(),
  title: z.string(),
  summary: z.string(),
  detail: z.string(),
  cover_img: z.string().optional(),
});
export type Post = z.infer<typeof post>;

export const apiContract = c.router({
  getPosts: {
    method: "GET",
    path: "/posts",
    responses: {
      200: z.object({
        total: z.number(),
        posts: z.array(post),
      }),
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
      200: z.union([post, z.null()]),
    },
    pathParams: z.object({ id: z.string() }),
    summary: "Get a post",
  },
});
