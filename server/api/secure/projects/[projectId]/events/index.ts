import { defineEventHandler, H3Event, readBody } from 'h3';
import { ProjectsManager } from '~/utils/manager/projects.manager';
import { ApiMethods } from '~/utils/enums/api-methods';
import { notFoundError } from '~/errors/not-found.error';
import { getStatusCode, StatusMessage } from '~/utils/enums/status-message';
import { prisma } from '~/server/api';
import { Project } from '@prisma/client';
import { EventsManager } from '~/utils/manager/events.manager';

export default defineEventHandler(async (h3Event: H3Event) => {
  const project = await ProjectsManager.getParamAndFind(h3Event);

  switch (h3Event.context.method) {
    case ApiMethods.GET:
      return getEvents(project, h3Event.context.query);
    case ApiMethods.POST:
      return postEvent(h3Event, project);
    default:
      throw notFoundError();
  }
});

const getEvents = async (project: Project, query) => {
  return {
    statusCode: getStatusCode(StatusMessage.OK),
    statusMessage: StatusMessage.OK,
    data: await EventsManager.findMany(project.id, query),
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
    statusCode: getStatusCode(StatusMessage.OK),
    statusMessage: StatusMessage.OK,
    data: event,
  };
};
