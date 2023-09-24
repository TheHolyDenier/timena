import { getRouterParam, H3Event } from 'h3';
import { prisma } from '~/server/api';
import { notFoundError } from '~/errors/not-found.error';

export class ElementsManager {
  static getParamAndFind = async (event: H3Event): Promise<Element> => {
    const projectId = getRouterParam(event, 'projectId');
    const id = getRouterParam(event, 'elementId');
    if (!id || !projectId) throw notFoundError();

    const element = await ElementsManager.findOne(projectId, id);

    if (!element) throw notFoundError();

    return element;
  };

  static findOne = async (projectId: string, id: string): Promise<Element> => {
    return prisma.element.findFirstOrThrow({
      where: {
        id,
        projectId: projectId,
      },
    });
  };

  static findMany = async (projectId: string): Promise<Element[]> => {
    return prisma.element.findMany({
      where: {
        projectId: projectId,
      },
      orderBy: [{ isFavorite: 'asc' }, { name: 'asc' }],
    });
  };
}
