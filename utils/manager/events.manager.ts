import { getRouterParam, H3Event } from 'h3';
import { prisma } from '~/server/api';
import { notFoundError } from '~/errors/not-found.error';
import { Event } from '@prisma/client';

export class EventsManager {
  static getParamAndFind = async (h3Event: H3Event): Promise<Event> => {
    const projectId = getRouterParam(h3Event, 'projectId');
    const id = getRouterParam(h3Event, 'eventId');
    if (!id || !projectId) throw notFoundError();

    const event = await EventsManager.findOne(projectId, id);

    if (!event) throw notFoundError();

    return event;
  };

  static findOne = async (projectId: string, id: string): Promise<Event> => {
    return prisma.event.findFirstOrThrow({
      where: {
        id,
        projectId: projectId,
      },
    });
  };

  static findMany = async (projectId: string): Promise<Event[]> => {
    return prisma.event.findMany({
      where: {
        projectId: projectId,
      },
      orderBy: [{ startDate: 'asc' }, { title: 'asc' }],
    });
  };
}
