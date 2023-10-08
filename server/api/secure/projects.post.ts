import { defineEventHandler, H3Event, readBody } from 'h3';
import { Project } from '@prisma/client';
import { getStatusCode, StatusMessage } from '~/utils/enums/status-message';
import { ApiResponse } from '~/utils/interfaces/api-response';
import { prisma } from '../index';

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
      statusCode: getStatusCode(StatusMessage.OK),
      statusMessage: StatusMessage.OK,
      data: project,
    };
  }
);
