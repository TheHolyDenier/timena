import get from 'lodash/get';

export const getQueryParams = (object: Object) => {
  return Object.keys(object)
    .map((key) => `${key}=${get(object, key)}`)
    .join('&');
};
