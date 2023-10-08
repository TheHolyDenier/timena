import { defineEventHandler, H3Event, readBody } from 'h3';
import { prisma } from '~/server/api';
import { ProjectsManager } from '~/utils/manager/projects.manager';
import { ApiMethods } from '~/utils/enums/api-methods';
import { notFoundError } from '~/errors/not-found.error';
import { getStatusCode, StatusMessage } from '~/utils/enums/status-message';
import { ElementsManager } from '~/utils/manager/elements.manager';

export default defineEventHandler(async (event: H3Event) => {
  const [_, element] = await Promise.all([
    ProjectsManager.getParamAndFind(event),
    ElementsManager.getParamAndFind(event),
  ]);

  switch (event.context.method) {
    case ApiMethods.DELETE:
      return deleteElement(element.id);
    case ApiMethods.PATCH:
      return patchElement(element.id, event);
    case ApiMethods.GET:
      return getElement(element);
    default:
      throw notFoundError();
  }
});

const getElement = (element: Element) => {
  return {
    statusCode: getStatusCode(StatusMessage.OK),
    statusMessage: StatusMessage.OK,
    data: element,
  };
};

const patchElement = async (elementId: string, event: H3Event) => {
  const body = await readBody(event);

  return {
    statusCode: getStatusCode(StatusMessage.OK),
    statusMessage: StatusMessage.OK,
    data: await prisma.element.update({
      where: { id: elementId },
      data: { ...body, updatedAt: new Date() },
    }),
  };
};

const deleteElement = async (elementId: string) => {
  await prisma.element.delete({ where: { id: elementId } });

  return {
    statusCode: getStatusCode(StatusMessage.OK),
    statusMessage: StatusMessage.OK,
    data: null,
  };
};
