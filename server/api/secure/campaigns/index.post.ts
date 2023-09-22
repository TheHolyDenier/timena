import { H3Event } from 'h3';
import { Campaign } from '@prisma/client';
import { ApiResponse } from '~/interfaces/api-response';
import { getStatusCode, StatusMessageEnum } from '~/enums/status-message.enum';
import { prisma } from '~/server/api';

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<Campaign>> => {
    const user = event.context.user;
    const body = await readBody(event);

    const campaign = await prisma.campaign.create({
      data: {
        ...body,
        createdById: user.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    return {
      statusCode: getStatusCode(StatusMessageEnum.OK),
      statusMessage: StatusMessageEnum.OK,
      data: campaign
    };
  }
);
