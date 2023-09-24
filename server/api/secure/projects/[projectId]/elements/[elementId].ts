import { defineEventHandler, H3Event, readBody } from 'h3';
import { prisma } from '~/server/api';
import { ProjectsManager } from '~/utils/manager/projects.manager';
import { ApiMethodsEnum } from '~/utils/enums/api-methods.enum';
import { notFoundError } from '~/errors/not-found.error';
import {
  getStatusCode,
  StatusMessageEnum,
} from '~/utils/enums/status-message.enum';
import { ElementsManager } from '~/utils/manager/elements.manager';

export default defineEventHandler(async (event: H3Event) => {
  const [_, element] = await Promise.all([
    ProjectsManager.getParamAndFind(event),
    ElementsManager.getParamAndFind(event),
  ]);

  switch (event.context.method) {
    case ApiMethodsEnum.DELETE:
      return deleteElement(element.id);
    case ApiMethodsEnum.PATCH:
      return patchElement(element.id, event);
    case ApiMethodsEnum.GET:
      return getElement(element);
    default:
      throw notFoundError();
  }
});

const getElement = (element: Element) => {
  return {
    statusCode: getStatusCode(StatusMessageEnum.OK),
    statusMessage: StatusMessageEnum.OK,
    data: element,
  };
};

const patchElement = async (elementId: string, event: H3Event) => {
  const body = await readBody(event);

  return {
    statusCode: getStatusCode(StatusMessageEnum.OK),
    statusMessage: StatusMessageEnum.OK,
    data: await prisma.element.update({
      where: { id: elementId },
      data: { ...body, updatedAt: new Date() },
    }),
  };
};

const deleteElement = async (elementId: string) => {
  await prisma.element.delete({ where: { id: elementId } });

  return {
    statusCode: getStatusCode(StatusMessageEnum.OK),
    statusMessage: StatusMessageEnum.OK,
    data: null,
  };
};
