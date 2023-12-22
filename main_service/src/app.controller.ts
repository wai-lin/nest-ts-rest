import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { apiContract } from '@klink/contracts';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @TsRestHandler(apiContract.getPosts)
  getPosts() {
    return tsRestHandler(apiContract.getPosts, async () => {
      const posts = await this.appService.getPosts();

      return {
        status: 200,
        body: { total: posts.length, posts },
      };
    });
  }

  @TsRestHandler(apiContract.getPost)
  getPost() {
    return tsRestHandler(apiContract.getPost, async ({ params }) => {
      const post = await this.appService.getPost(params.id);
      return {
        status: 200,
        body: post,
      };
    });
  }
}
