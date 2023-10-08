import { defineEventHandler, H3Event } from 'h3';
import { User } from '.prisma/client';
import { getStatusCode, StatusMessage } from '~/utils/enums/status-message';
import { ApiResponse } from '~/utils/interfaces/api-response';

export default defineEventHandler(
  (event: H3Event): ApiResponse<User> => ({
    statusCode: getStatusCode(StatusMessage.OK),
    statusMessage: StatusMessage.OK,
    data: event.context.user,
  })
);
