import { H3Event, defineEventHandler, readBody } from 'h3';
import { Project } from '@prisma/client';
import { ApiResponse } from '~/interfaces/api-response';
import { getStatusCode, StatusMessageEnum } from '~/enums/status-message.enum';
import { prisma } from '~/server/api';

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<Project>> => {
    const user = event.context.user;
    const body = await readBody(event);

    const project = await prisma.project.create({
      data: {
        ...body,
        createdById: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return {
      statusCode: getStatusCode(StatusMessageEnum.OK),
      statusMessage: StatusMessageEnum.OK,
      data: project,
    };
  }
);
