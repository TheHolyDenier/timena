import { Project, User } from '@prisma/client';
import { getRouterParam, H3Event } from 'h3';
import { prisma } from '~/server/api';
import { notFoundError } from '~/errors/not-found.error';

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

  static findMany = async (user: User, query = {}) => {
    if (!query.include) query.include = {};
    query.include.projectOnUser = true;

    if (!query.where) query.where = {};
    if (!query.where.OR) query.where.OR = [];
    query.where.OR.push({ createdById: { equals: user.id } });
    query.where.OR.push({ projectOnUser: { some: { userId: user.id } } });

    return prisma.project.findMany(query);
  };
}
