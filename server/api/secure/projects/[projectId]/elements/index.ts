import { defineEventHandler, H3Event, readBody } from 'h3';
import { ProjectsManager } from '~/utils/manager/projects.manager';
import { ApiMethods } from '~/utils/enums/api-methods';
import { notFoundError } from '~/errors/not-found.error';
import { getStatusCode, StatusMessage } from '~/utils/enums/status-message';
import { prisma } from '~/server/api';
import { ElementsManager } from '~/utils/manager/elements.manager';
import { Project } from '@prisma/client';
import { Request } from '~/utils/interfaces/request';

export default defineEventHandler(async (event: H3Event) => {
  const project = await ProjectsManager.getParamAndFind(event);

  switch (event.context.method) {
    case ApiMethods.GET:
      return getElements(project, event.context.query, event.context.page);
    case ApiMethods.POST:
      return postElement(event, project);
    default:
      throw notFoundError();
  }
});

const getElements = async (
  project: Project,
  query: Request = {},
  page?: number
) => {
  if (!query.where) query.where = {};
  query.where.projectId = project.id;

  const [data, total] = await Promise.all([
    ElementsManager.findMany(query),
    ElementsManager.count(query),
  ]);

  return {
    statusCode: getStatusCode(StatusMessage.OK),
    statusMessage: StatusMessage.OK,
    data: data,
    page: page,
    total: total,
  };
};

const postElement = async (event: H3Event, project: Project) => {
  const user = event.context.user;
  const body = await readBody(event);

  const element = await prisma.element.create({
    data: {
      ...body,
      projectId: project.id,
      createdById: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return {
    statusCode: getStatusCode(StatusMessage.OK),
    statusMessage: StatusMessage.OK,
    data: element,
  };
};
