export enum StatusMessage {
  OK = 'OK',
  BAD_REQUEST = 'Bad Request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'Not Found',
  ERROR = 'Internal Server Error',
}

export const getStatusCode = (statusMessage: StatusMessage): number => {
  switch (statusMessage) {
    case StatusMessage.OK:
      return 200;
    case StatusMessage.BAD_REQUEST:
      return 400;
    case StatusMessage.UNAUTHORIZED:
      return 401;
    case StatusMessage.FORBIDDEN:
      return 403;
    case StatusMessage.NOT_FOUND:
      return 404;
    default:
      return 500;
  }
};
