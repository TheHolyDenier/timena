import { defineEventHandler, H3Event, readBody } from 'h3';
import { prisma } from '~/server/api';
import { ProjectsManager } from '~/utils/manager/projects.manager';
import { Project } from '@prisma/client';
import { ApiMethodsEnum } from '~/utils/enums/api-methods.enum';
import { notFoundError } from '~/errors/not-found.error';
import {
  getStatusCode,
  StatusMessageEnum,
} from '~/utils/enums/status-message.enum';

export default defineEventHandler(async (event: H3Event) => {
  const project = await ProjectsManager.getParamAndFind(event);

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
