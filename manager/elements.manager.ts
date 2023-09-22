import { Element, User } from '@prisma/client';
import { prisma } from '~/server/api';

export class ElementsManager {
  static findOne = async (user: User, id: string) => {
    return prisma.element.findFirstOrThrow({
      where: {
        id,
        project: {
          OR: [
            { createdById: { equals: user.id } },
            { contributors: { some: { id: user.id } } },
          ],
        },
      },
      include: {
        project: true,
      },
    });
  };

  static findMany = async (projectId: string): Promise<Element[]> => {
    return prisma.element.findMany({
      where: {
        projectId,
      },
      orderBy: [{ isFavorite: 'desc' }, { name: 'asc' }],
    });
  };
}
