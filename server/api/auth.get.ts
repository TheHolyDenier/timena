import { defineEventHandler, getQuery, H3Event } from 'h3';
import { User } from '.prisma/client';
import { prisma } from './index';
import { ApiResponse } from '~/utils/interfaces/api-response';
import { SignInDto } from '~/utils/models/auth/sign-in.dto';
import { comparePassword } from '~/utils/password.util';
import { createToken } from '~/utils/token.util';
import { getStatusCode, StatusMessage } from '~/utils/enums/status-message';

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<User>> => {
    const signInDto = SignInDto.create(getQuery(event));

    const user = await prisma.user.findUniqueOrThrow({
      where: { email: signInDto.email },
    });

    if (!(await comparePassword(signInDto.password, user.passwordHash))) {
      throw createError({
        statusCode: getStatusCode(StatusMessage.NOT_FOUND),
        statusMessage: StatusMessage.NOT_FOUND,
        message: StatusMessage.NOT_FOUND,
      });
    }

    if (user.accessToken && new Date().getTime() < user.expiresAt!.getTime()) {
      return {
        statusCode: getStatusCode(StatusMessage.OK),
        statusMessage: StatusMessage.OK,
        data: user,
      };
    }

    const { token, expiresAt } = createToken(user);

    return {
      statusCode: getStatusCode(StatusMessage.OK),
      statusMessage: StatusMessage.OK,
      data: await prisma.user.update({
        where: { id: user.id },
        data: { accessToken: token, expiresAt },
      }),
    };
  }
);
