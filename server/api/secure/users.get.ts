import { defineEventHandler, H3Event } from 'h3';
import { User } from '.prisma/client';
import { ApiResponse } from '~/interfaces/api-response';
import {
  getStatusCode,
  StatusMessageEnum,
} from '~/utils/enums/status-message.enum';

export default defineEventHandler(
  (event: H3Event): ApiResponse<User> => ({
    statusCode: getStatusCode(StatusMessageEnum.OK),
    statusMessage: StatusMessageEnum.OK,
    data: event.context.user,
  })
);
