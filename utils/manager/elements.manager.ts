import { Project } from '@prisma/client';
import { getRouterParam, H3Event } from 'h3';
import { prisma } from '~/server/api';
import { notFoundError } from '~/errors/not-found.error';

export class ElementsManager {
  static getParamAndFind = async (event: H3Event): Promise<Element> => {
    const id = getRouterParam(event, 'elementId');
    if (!id) throw notFoundError();

    const element = await ElementsManager.findOne(event.context.user, id);

    if (!element) throw notFoundError();

    return element;
  };

  static findOne = async (project: Project, id: string): Promise<Element> => {
    return prisma.element.findFirstOrThrow({
      where: {
        id,
        projectId: project.id,
      },
    });
  };

  static findMany = async (project: Project): Element[] => {
    return prisma.element.findMany({
      where: {
        projectId: project.id,
      },
      orderBy: [{ isFavorite: 'desc' }, { name: 'asc' }],
    });
  };
}
