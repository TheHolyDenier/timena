import {
  getStatusCode,
  StatusMessageEnum,
} from '~/utils/enums/status-message.enum';

export const notFoundError = () =>
  createError({
    statusCode: getStatusCode(StatusMessageEnum.NOT_FOUND),
    statusMessage: StatusMessageEnum.NOT_FOUND,
    message: StatusMessageEnum.NOT_FOUND,
  });
