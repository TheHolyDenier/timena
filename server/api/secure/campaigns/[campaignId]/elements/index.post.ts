import { defineEventHandler, H3Event, readBody } from 'h3';
import { Element } from '@prisma/client';
import { ApiResponse } from '~/interfaces/api-response';
import { getStatusCode, StatusMessageEnum } from '~/enums/status-message.enum';
import { prisma } from '~/server/api';
import { ProjectManager } from '~/manager/project.manager';

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<Element>> => {
    const campaign = await ProjectManager.getParamAndFind(event);

    const user = event.context.user;
    const body = await readBody(event);

    const element = await prisma.element.create({
      data: {
        ...body,
        campaignId: campaign.id,
        createdById: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return {
      statusCode: getStatusCode(StatusMessageEnum.OK),
      statusMessage: StatusMessageEnum.OK,
      data: element,
    };
  }
);
