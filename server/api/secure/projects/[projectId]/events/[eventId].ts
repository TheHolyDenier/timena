import { defineEventHandler, H3Event, readBody } from 'h3';
import { prisma } from '~/server/api';
import { ProjectsManager } from '~/utils/manager/projects.manager';
import { ApiMethods } from '~/utils/enums/api-methods';
import { notFoundError } from '~/errors/not-found.error';
import { getStatusCode, StatusMessage } from '~/utils/enums/status-message';
import { EventsManager } from '~/utils/manager/events.manager';

export default defineEventHandler(async (h3Event: H3Event) => {
  const [_, event] = await Promise.all([
    ProjectsManager.getParamAndFind(h3Event),
    EventsManager.getParamAndFind(h3Event),
  ]);

  switch (h3Event.context.method) {
    case ApiMethods.DELETE:
      return deleteEvent(event.id);
    case ApiMethods.PATCH:
      return patchEvent(event.id, h3Event);
    case ApiMethods.GET:
      return getEvent(event);
    default:
      throw notFoundError();
  }
});

const getEvent = (event: Event) => {
  return {
    statusCode: getStatusCode(StatusMessage.OK),
    statusMessage: StatusMessage.OK,
    data: event,
  };
};

const patchEvent = async (eventId: string, h3Event: H3Event) => {
  const body = await readBody(h3Event);

  return {
    statusCode: getStatusCode(StatusMessage.OK),
    statusMessage: StatusMessage.OK,
    data: await prisma.event.update({
      where: { id: eventId },
      data: { ...body, updatedAt: new Date() },
    }),
  };
};

const deleteEvent = async (eventId: string) => {
  await prisma.event.delete({ where: { id: eventId } });

  return {
    statusCode: getStatusCode(StatusMessage.OK),
    statusMessage: StatusMessage.OK,
    data: null,
  };
};
