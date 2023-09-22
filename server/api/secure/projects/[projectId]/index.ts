import { defineEventHandler, H3Event, readBody } from 'h3';
import { Project } from '@prisma/client';
import { ProjectManager } from '~/manager/project.manager';
import { ApiMethodsEnum } from '~/enums/api-methods.enum';
import { getStatusCode, StatusMessageEnum } from '~/enums/status-message.enum';
import { prisma } from '~/server/api';
import { notFoundError } from '~/errors/not-found.error';

export default defineEventHandler(async (event: H3Event) => {
  const project = await ProjectManager.getParamAndFind(event);

  switch (event.context.method) {
    case ApiMethodsEnum.DELETE:
      return deleteProject(project.id);
    case ApiMethodsEnum.PATCH:
      return patchProject(project.id, event);
    case ApiMethodsEnum.GET:
      return getProject(project);
    default:
      throw notFoundError();
  }
});

const getProject = (project: Project) => {
  return {
    statusCode: getStatusCode(StatusMessageEnum.OK),
    statusMessage: StatusMessageEnum.OK,
    data: project,
  };
};

const patchProject = async (projectId: string, event: H3Event) => {
  const body = await readBody(event);

  return {
    statusCode: getStatusCode(StatusMessageEnum.OK),
    statusMessage: StatusMessageEnum.OK,
    data: await prisma.project.update({
      where: { id: projectId },
      data: { ...body, updatedAt: new Date() },
    }),
  };
};

const deleteProject = async (projectId: string) => {
  await prisma.project.delete({ where: { id: projectId } });

  return {
    statusCode: getStatusCode(StatusMessageEnum.OK),
    statusMessage: StatusMessageEnum.OK,
    data: null,
  };
};
