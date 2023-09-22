export enum StatusMessageEnum {
  OK = 'OK',
  BAD_REQUEST = 'Bad Request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'Not Found',
  ERROR = 'Internal Server Error'
}

export const getStatusCode = (statusMessage: StatusMessageEnum): number => {
  switch (statusMessage) {
    case StatusMessageEnum.OK:
      return 200;
    case StatusMessageEnum.BAD_REQUEST:
      return 400;
    case StatusMessageEnum.UNAUTHORIZED:
      return 401;
    case StatusMessageEnum.FORBIDDEN:
      return 403;
    case StatusMessageEnum.NOT_FOUND:
      return 404;
    default:
      return 500;
  }
};
