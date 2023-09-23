import { H3Event } from 'h3';
import { Project } from '@prisma/client';
import {
  getStatusCode,
  StatusMessageEnum,
} from '~/utils/enums/status-message.enum';
import { ApiResponse } from '~/utils/interfaces/api-response';
import { ProjectsManager } from '~/utils/manager/projects.manager';

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<Project>> => {
    const user = event.context.user;

    return {
      statusCode: getStatusCode(StatusMessageEnum.OK),
      statusMessage: StatusMessageEnum.OK,
      data: await ProjectsManager.findMany(user),
    };
  }
);
