import { defineEventHandler, H3Event } from 'h3';
import { ApiResponse } from '~/interfaces/api-response';
import { getStatusCode, StatusMessageEnum } from '~/enums/status-message.enum';
import { notFoundError } from '~/errors/not-found.error';
import { ElementsManager } from '~/manager/elements.manager';
import { prisma } from '~/server/api';

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<null>> => {
    const elementId = getRouterParam(event, 'elementId');
    const element = await ElementsManager.findOne(
      event.context.user,
      String(elementId)
    );
    if (!element) throw notFoundError();

    await prisma.element.delete({ where: { id: elementId } });

    return {
      statusCode: getStatusCode(StatusMessageEnum.OK),
      statusMessage: StatusMessageEnum.OK,
      data: null
    };
  }
);
