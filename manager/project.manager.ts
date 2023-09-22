import { Project, User } from '@prisma/client';
import { H3Event } from 'h3';
import { prisma } from '~/server/api';
import { notFoundError } from '~/errors/not-found.error';

export class ProjectManager {
  static getParamAndFind = async (event: H3Event): Promise<Project> => {
    const id = getRouterParam(event, 'projectId');
    if (!id) throw notFoundError();

    const project = await ProjectManager.findOne(event.context.user, id);

    if (!project) throw notFoundError();

    return project;
  };

  static findOne = async (user: User, id: string) => {
    return prisma.project.findFirstOrThrow({
      where: {
        id,
        OR: [
          { createdById: { equals: user.id } },
          { players: { some: { id: user.id } } },
        ],
      },
    });
  };

  static findMany = async (user: User) => {
    return prisma.project.findMany({
      where: {
        OR: [
          { createdById: { equals: user.id } },
          { players: { some: { id: user.id } } },
        ],
      },
      orderBy: [{ isFavorite: 'desc' }, { title: 'asc' }],
    });
  };
}
