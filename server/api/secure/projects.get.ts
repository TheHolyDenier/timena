import { H3Event } from 'h3';
import { Project } from '@prisma/client';
import { getStatusCode, StatusMessage } from '~/utils/enums/status-message';
import { ApiResponse } from '~/utils/interfaces/api-response';
import { ProjectsManager } from '~/utils/manager/projects.manager';

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<Project>> => {
    const user = event.context.user;

    return {
      statusCode: getStatusCode(StatusMessage.OK),
      statusMessage: StatusMessage.OK,
      data: await ProjectsManager.findMany(user, event.context.query),
    };
  }
);
