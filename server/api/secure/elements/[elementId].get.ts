import { defineEventHandler, H3Event, getRouterParam } from 'h3';
import { Element } from '@prisma/client';
import { ApiResponse } from '~/interfaces/api-response';
import { getStatusCode, StatusMessageEnum } from '~/enums/status-message.enum';
import { notFoundError } from '~/errors/not-found.error';
import { ElementsManager } from '~/manager/elements.manager';

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<Element>> => {
    const elementId = getRouterParam(event, 'elementId');
    const element = await ElementsManager.findOne(
      event.context.user,
      String(elementId)
    );
    if (!element) throw notFoundError();

    return {
      statusCode: getStatusCode(StatusMessageEnum.OK),
      statusMessage: StatusMessageEnum.OK,
      data: element,
    };
  }
);
