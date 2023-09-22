import { defineEventHandler, H3Event, readBody } from 'h3';
import { Campaign } from '@prisma/client';
import { ProjectManager } from '~/manager/project.manager';
import { ApiMethodsEnum } from '~/enums/api-methods.enum';
import { getStatusCode, StatusMessageEnum } from '~/enums/status-message.enum';
import { prisma } from '~/server/api';
import { notFoundError } from '~/errors/not-found.error';

export default defineEventHandler(async (event: H3Event) => {
  const campaign = await ProjectManager.getParamAndFind(event);

  switch (event.context.method) {
    case ApiMethodsEnum.DELETE:
      return deleteCampaign(campaign.id);
    case ApiMethodsEnum.PATCH:
      return patchCampaign(campaign.id, event);
    case ApiMethodsEnum.GET:
      return getCampaign(campaign);
    default:
      throw notFoundError();
  }
});

const getCampaign = (campaign: Campaign) => {
  return {
    statusCode: getStatusCode(StatusMessageEnum.OK),
    statusMessage: StatusMessageEnum.OK,
    data: campaign,
  };
};

const patchCampaign = async (campaignId: string, event: H3Event) => {
  const body = await readBody(event);

  return {
    statusCode: getStatusCode(StatusMessageEnum.OK),
    statusMessage: StatusMessageEnum.OK,
    data: await prisma.campaign.update({
      where: { id: campaignId },
      data: { ...body, updatedAt: new Date() },
    }),
  };
};

const deleteCampaign = async (campaignId: string) => {
  await prisma.campaign.delete({ where: { id: campaignId } });

  return {
    statusCode: getStatusCode(StatusMessageEnum.OK),
    statusMessage: StatusMessageEnum.OK,
    data: null,
  };
};
