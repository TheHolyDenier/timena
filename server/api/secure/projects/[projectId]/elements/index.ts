import { defineEventHandler, H3Event, readBody } from 'h3';
import { ProjectsManager } from '~/utils/manager/projects.manager';
import { ApiMethodsEnum } from '~/utils/enums/api-methods.enum';
import { notFoundError } from '~/errors/not-found.error';
import {
  getStatusCode,
  StatusMessageEnum,
} from '~/utils/enums/status-message.enum';
import { prisma } from '~/server/api';
import { ElementsManager } from '~/utils/manager/elements.manager';
import { Project } from '@prisma/client';

export default defineEventHandler(async (event: H3Event) => {
  const project = await ProjectsManager.getParamAndFind(event);

  switch (event.context.method) {
    case ApiMethodsEnum.GET:
      return getElements(project);
    case ApiMethodsEnum.POST:
      return postElement(event, project);
    default:
      throw notFoundError();
  }
});

const getElements = async (project: Project) => {
  return {
    statusCode: getStatusCode(StatusMessageEnum.OK),
    statusMessage: StatusMessageEnum.OK,
    data: await ElementsManager.findMany(project.id),
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
    statusCode: getStatusCode(StatusMessageEnum.OK),
    statusMessage: StatusMessageEnum.OK,
    data: element,
  };
};
