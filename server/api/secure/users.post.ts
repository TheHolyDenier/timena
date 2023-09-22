import { H3Event } from 'h3';
import { User } from '@prisma/client';
import { prisma } from '~/server/api';
import { hashPassword } from '~/utils/password.util';
import { getStatusCode, StatusMessageEnum } from '~/enums/status-message.enum';
import { ApiResponse } from '~/interfaces/api-response';

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<User>> => {
    const user = event.context.user;
    const body = await readBody(event);

    if (body.password) {
      const password = body.password;
      delete body.password;
      body.passwordHash = await hashPassword(password);
    }

    return {
      statusCode: getStatusCode(StatusMessageEnum.OK),
      statusMessage: StatusMessageEnum.OK,
      data: await prisma.user.update({ where: { id: user.id }, data: body })
    };
  }
);
