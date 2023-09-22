import { defineEventHandler, getHeader, H3Event } from 'h3';
import { getStatusCode, StatusMessageEnum } from '~/enums/status-message.enum';
import { prisma } from '~/server/api';

export default defineEventHandler(async (event: H3Event) => {
  if (event.node.req.url?.includes('secure')) {
    const authorization = getHeader(event, 'Authorization');

    if (!authorization) {
      throw createError({
        statusCode: getStatusCode(StatusMessageEnum.UNAUTHORIZED),
        statusMessage: StatusMessageEnum.UNAUTHORIZED,
        message: StatusMessageEnum.UNAUTHORIZED
      });
    }

    event.context.user = await prisma.user.findUniqueOrThrow({
      where: { accessToken: String(authorization) }
    });
  }
});
