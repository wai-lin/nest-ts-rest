import { Post } from '@klink/contracts';
import { Injectable } from '@nestjs/common';

const posts: Post[] = Array(10)
  .fill(null)
  .map((post: Post, index) => {
    const count = String(index + 1);
    return {
      id: count,
      title: `post ${count} title`,
      summary: `post ${count} summary.`,
      detail: `post ${count} details.`,
    };
  });

@Injectable()
export class AppService {
  getPosts() {
    return posts;
  }

  getPost(id: string) {
    return posts.find((p) => p.id === id) ?? null;
  }
}
