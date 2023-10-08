import { getStatusCode, StatusMessage } from '~/utils/enums/status-message';

export const notFoundError = () =>
  createError({
    statusCode: getStatusCode(StatusMessage.NOT_FOUND),
    statusMessage: StatusMessage.NOT_FOUND,
    message: StatusMessage.NOT_FOUND,
  });
