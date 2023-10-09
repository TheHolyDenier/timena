import { H3Event } from 'h3';
import { PrismaRequest } from '~/utils/interfaces/prisma-request';

export default defineEventHandler((event: H3Event) => {
  const splitUrl = event.node.req.url?.split('?') || [];

  if (splitUrl?.length < 2) return;

  const decodedQuery = decodeURIComponent(splitUrl[1])
    .split('&')
    .map((condition) => {
      const split = condition.split('=');
      return { key: split[0], value: split[1] };
    });

  const query: PrismaRequest = {};

  const orderBy = decodedQuery.filter((query) => query.key === 'orderBy');
  if (orderBy.length) {
    query.orderBy = orderBy.map((element) => JSON.parse(element.value));
  }

  const where = decodedQuery.find((query) => query.key === 'where');
  if (where) query.where = JSON.parse(where.value);

  const select = decodedQuery.find((query) => query.key === 'select');
  if (select) query.select = JSON.parse(select.value);

  const page = decodedQuery.find((element) => element.key === 'page')?.value;
  const elementsPerPage = decodedQuery.find(
    (element) => element.key === 'elementsPerPage'
  )?.value;

  if (page && elementsPerPage) {
    query.take = Number(elementsPerPage);
    query.skip = (Number(page) - 1) * query.take; //+ 1;
  }

  // console.log('tmp', JSON.parse(decodedQuery));
  //
  // const parsedQuery = {};
  // parsedQuery.orderBy = parseCondition(query.orderBy);
  //
  // // offset = (page - 1) * itemsPerPage + 1
  //
  event.context.query = query;
  event.context.page = Number(page);
});

// function parseCondition(condition) {
//   return Array.isArray(condition)
//     ? condition.map((item) => JSON.parse(item))
//     : JSON.parse(condition);
// }
