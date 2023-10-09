import { H3Event } from 'h3';
import { Project } from '@prisma/client';
import { getStatusCode, StatusMessage } from '~/utils/enums/status-message';
import { ApiResponse } from '~/utils/interfaces/api-response';
import { ProjectsManager } from '~/utils/manager/projects.manager';
import { PrismaRequest } from '~/utils/interfaces/prisma-request';

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<Project>> => {
    const user = event.context.user;

    const query: PrismaRequest = event.context.query;

    if (!query.include) query.include = {};
    query.include.projectOnUser = true;

    if (!query.where) query.where = {};
    if (!query.where.OR) query.where.OR = [];
    query.where.OR.push({ createdById: { equals: user.id } });
    query.where.OR.push({ projectOnUser: { some: { userId: user.id } } });

    const [data, total] = await Promise.all([
      ProjectsManager.findMany(query),
      ProjectsManager.count(query),
    ]);

    return {
      statusCode: getStatusCode(StatusMessage.OK),
      statusMessage: StatusMessage.OK,
      data: data,
      page: event.context.page,
      total: total,
    };
  }
);
