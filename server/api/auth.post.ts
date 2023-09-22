import { defineEventHandler, H3Event, readBody } from 'h3';
import { User } from '.prisma/client';
import { prisma } from './index';
import { ApiResponse } from '~/interfaces/api-response';
import { SignUpDto } from '~/models/auth/sign-up.dto';
import { getStatusCode, StatusMessageEnum } from '~/enums/status-message.enum';
import { hashPassword } from '~/utils/password.util';

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<User>> => {
    const data = SignUpDto.create(await readBody(event));

    const [emailExists, usernameExists] = await Promise.all([
      prisma.user.findFirst({ where: { email: data.email } }),
      prisma.user.findFirst({ where: { username: data.username } }),
    ]);

    if (emailExists || usernameExists) {
      throw createError({
        statusCode: getStatusCode(StatusMessageEnum.BAD_REQUEST),
        statusMessage: StatusMessageEnum.BAD_REQUEST,
        message: emailExists
          ? `Email already exists`
          : `Username already exists`,
      });
    }

    const user = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        passwordHash: await hashPassword(data.password),
      },
    });
    return {
      statusCode: getStatusCode(StatusMessageEnum.OK),
      statusMessage: StatusMessageEnum.OK,
      data: user,
    };
  }
);
