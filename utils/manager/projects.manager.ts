import { Project, User } from '@prisma/client';
import { getRouterParam, H3Event } from 'h3';
import { prisma } from '~/server/api';
import { notFoundError } from '~/errors/not-found.error';
import { Request } from '~/utils/interfaces/request';
import merge from 'lodash';

export class ProjectsManager {
  static getParamAndFind = async (event: H3Event): Promise<Project> => {
    const id = getRouterParam(event, 'projectId');
    if (!id) throw notFoundError();

    const project = await ProjectsManager.findOne(event.context.user, id);

    if (!project) throw notFoundError();

    return project;
  };

  static findOne = async (user: User, id: string) => {
    return prisma.project.findFirstOrThrow({
      where: {
        id,
        OR: [
          { createdById: { equals: user.id } },
          { projectOnUser: { some: { userId: user.id } } },
        ],
      },
      include: { projectOnUser: true },
    });
  };

  static findMany = async (query: Request = {}) => {
    return prisma.project.findMany(query);
  };

  static count = async ({ where }: Request = {}): Promise<number> => {
    return prisma.project.count({ where });
  };
}
