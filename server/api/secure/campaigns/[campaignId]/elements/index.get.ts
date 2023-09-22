import { defineEventHandler, H3Event } from 'h3';
import { Element } from '@prisma/client';
import { ApiResponse } from '~/interfaces/api-response';
import { getStatusCode, StatusMessageEnum } from '~/enums/status-message.enum';
import { ProjectManager } from '~/manager/project.manager';
import { ElementsManager } from '~/manager/elements.manager';

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<Element>> => {
    const campaign = await ProjectManager.getParamAndFind(event);

    return {
      statusCode: getStatusCode(StatusMessageEnum.OK),
      statusMessage: StatusMessageEnum.OK,
      data: await ElementsManager.findMany(campaign.id),
    };
  }
);
