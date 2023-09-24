import { defineEventHandler, H3Event } from 'h3';
import { User } from '.prisma/client';
import {
  getStatusCode,
  StatusMessageEnum,
} from '~/utils/enums/status-message.enum';
import { ApiResponse } from '~/utils/interfaces/api-response';

export default defineEventHandler(
  (event: H3Event): ApiResponse<User> => ({
    statusCode: getStatusCode(StatusMessageEnum.OK),
    statusMessage: StatusMessageEnum.OK,
    data: event.context.user,
  })
);
