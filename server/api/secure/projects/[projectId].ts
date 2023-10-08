import { defineEventHandler, H3Event, readBody } from 'h3';
import { prisma } from '~/server/api';
import { ProjectsManager } from '~/utils/manager/projects.manager';
import { Project } from '@prisma/client';
import { ApiMethods } from '~/utils/enums/api-methods';
import { notFoundError } from '~/errors/not-found.error';
import { getStatusCode, StatusMessage } from '~/utils/enums/status-message';

export default defineEventHandler(async (event: H3Event) => {
  const project = await ProjectsManager.getParamAndFind(event);

  switch (event.context.method) {
    case ApiMethods.DELETE:
      return deleteProject(project.id);
    case ApiMethods.PATCH:
      return patchProject(project.id, event);
    case ApiMethods.GET:
      return getProject(project);
    default:
      throw notFoundError();
  }
});

const getProject = (project: Project) => {
  return {
    statusCode: getStatusCode(StatusMessage.OK),
    statusMessage: StatusMessage.OK,
    data: project,
  };
};

const patchProject = async (projectId: string, event: H3Event) => {
  const body = await readBody(event);

  return {
    statusCode: getStatusCode(StatusMessage.OK),
    statusMessage: StatusMessage.OK,
    data: await prisma.project.update({
      where: { id: projectId },
      data: { ...body, updatedAt: new Date() },
    }),
  };
};

const deleteProject = async (projectId: string) => {
  await Promise.all([
    prisma.project.delete({ where: { id: projectId } }),
    prisma.element.deleteMany({ where: { projectId: projectId } }),
  ]);

  return {
    statusCode: getStatusCode(StatusMessage.OK),
    statusMessage: StatusMessage.OK,
    data: null,
  };
};
