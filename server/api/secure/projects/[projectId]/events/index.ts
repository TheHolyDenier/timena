import { defineEventHandler, H3Event, readBody } from 'h3';
import { ProjectsManager } from '~/utils/manager/projects.manager';
import { ApiMethodsEnum } from '~/utils/enums/api-methods.enum';
import { notFoundError } from '~/errors/not-found.error';
import {
  getStatusCode,
  StatusMessageEnum,
} from '~/utils/enums/status-message.enum';
import { prisma } from '~/server/api';
import { Project } from '@prisma/client';
import { EventsManager } from '~/utils/manager/events.manager';

export default defineEventHandler(async (h3Event: H3Event) => {
  const project = await ProjectsManager.getParamAndFind(h3Event);

  switch (h3Event.context.method) {
    case ApiMethodsEnum.GET:
      return getEvents(project);
    case ApiMethodsEnum.POST:
      return postEvent(h3Event, project);
    default:
      throw notFoundError();
  }
});

const getEvents = async (project: Project) => {
  return {
    statusCode: getStatusCode(StatusMessageEnum.OK),
    statusMessage: StatusMessageEnum.OK,
    data: await EventsManager.findMany(project.id),
  };
};

const postEvent = async (h3Event: H3Event, project: Project) => {
  const user = h3Event.context.user;
  const body = await readBody(h3Event);

  const event = await prisma.event.create({
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
    data: event,
  };
};
