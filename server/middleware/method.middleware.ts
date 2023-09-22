export default defineEventHandler((event) => {
  event.context.method = event.node.req.method || 'GET';
});
