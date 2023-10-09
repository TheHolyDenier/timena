import { getRouterParam, H3Event } from 'h3';
import { prisma } from '~/server/api';
import { notFoundError } from '~/errors/not-found.error';
import { Event } from '@prisma/client';
import { Request } from '~/utils/interfaces/request';

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

  static findMany = async (query: Request = {}): Promise<Event[]> => {
    return prisma.event.findMany(query);
  };

  static count = async ({
    take,
    skip,
    ...query
  }: Request = {}): Promise<number> => {
    return prisma.element.count(query);
  };
}
