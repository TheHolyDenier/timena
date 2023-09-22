import { defineEventHandler, getQuery, H3Event } from 'h3';
import { User } from '.prisma/client';
import { prisma } from './index';
import { ApiResponse } from '~/utils/interfaces/api-response';
import { SignInDto } from '~/utils/models/auth/sign-in.dto';
import { comparePassword } from '~/utils/password.util';
import { createToken } from '~/utils/token.util';
import {
  getStatusCode,
  StatusMessageEnum,
} from '~/utils/enums/status-message.enum';

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<User>> => {
    const signInDto = SignInDto.create(getQuery(event));

    const user = await prisma.user.findUniqueOrThrow({
      where: { email: signInDto.email },
    });

    if (!(await comparePassword(signInDto.password, user.passwordHash))) {
      throw createError({
        statusCode: getStatusCode(StatusMessageEnum.NOT_FOUND),
        statusMessage: StatusMessageEnum.NOT_FOUND,
        message: StatusMessageEnum.NOT_FOUND,
      });
    }

    if (user.accessToken && new Date().getTime() < user.expiresAt!.getTime()) {
      return {
        statusCode: getStatusCode(StatusMessageEnum.OK),
        statusMessage: StatusMessageEnum.OK,
        data: user,
      };
    }

    const { token, expiresAt } = createToken(user);

    return {
      statusCode: getStatusCode(StatusMessageEnum.OK),
      statusMessage: StatusMessageEnum.OK,
      data: await prisma.user.update({
        where: { id: user.id },
        data: { accessToken: token, expiresAt },
      }),
    };
  }
);
