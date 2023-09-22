import { H3Event, defineEventHandler } from 'h3';
import { Project } from '@prisma/client';
import { ApiResponse } from '~/interfaces/api-response';
import { ProjectManager } from '~/manager/project.manager';
import { getStatusCode, StatusMessageEnum } from '~/enums/status-message.enum';

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<Project>> => {
    const user = event.context.user;

    return {
      statusCode: getStatusCode(StatusMessageEnum.OK),
      statusMessage: StatusMessageEnum.OK,
      data: await ProjectManager.findMany(user),
    };
  }
);
