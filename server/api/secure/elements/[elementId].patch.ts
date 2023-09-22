import { defineEventHandler, H3Event, readBody, getRouterParam } from 'h3';
import { Element } from '@prisma/client';
import { ApiResponse } from '~/interfaces/api-response';
import { getStatusCode, StatusMessageEnum } from '~/enums/status-message.enum';
import { prisma } from '~/server/api';
import { notFoundError } from '~/errors/not-found.error';
import { ElementsManager } from '~/manager/elements.manager';
import { ProjectManager } from '~/manager/project.manager';

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<Element>> => {
    await ProjectManager.getParamAndFind(event);

    const elementId = getRouterParam(event, 'elementId');

    if (!elementId) throw notFoundError();

    const element = await ElementsManager.findOne(
      event.context.user,
      elementId
    );

    if (!element) throw notFoundError();

    const body = await readBody(event);

    return {
      statusCode: getStatusCode(StatusMessageEnum.OK),
      statusMessage: StatusMessageEnum.OK,
      data: await prisma.element.update({
        where: { id: element.id },
        data: { ...body, updatedAt: new Date() },
      }),
    };
  }
);
