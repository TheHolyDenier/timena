import { prisma } from '~/server/api';
import { H3Event } from 'h3';
import { getStatusCode, StatusMessage } from '~/utils/enums/status-message';

export default defineEventHandler(async (event: H3Event) => {
  if (event.node.req.url?.includes('secure')) {
    const authorization = getHeader(event, 'Authorization');

    if (!authorization) {
      throw createError({
        statusCode: getStatusCode(StatusMessage.UNAUTHORIZED),
        statusMessage: StatusMessage.UNAUTHORIZED,
        message: StatusMessage.UNAUTHORIZED,
      });
    }

    event.context.user = await prisma.user.findUniqueOrThrow({
      where: { accessToken: String(authorization) },
    });
  }
});
