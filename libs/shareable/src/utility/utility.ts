import stringToSlug from 'slugify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { EnvironmentEnum } from '@shareable/enum';
import * as basicAuth from 'express-basic-auth';
import { HttpExceptionFilter, ValidationException } from '@shareable/exception';

interface SwaggerSeverInterface {
  url: string;
  description: string;
}

interface SwaggerDocumentInterface {
  app: NestExpressApplication;
  title: string;
  description: string;
  version: string;
  path: string;
  mode: EnvironmentEnum;
  credentials?: {
    [key: string]: string;
  };
  servers: SwaggerSeverInterface[];
}

export const swagger = (builder: SwaggerDocumentInterface): void => {
  if (builder.mode == EnvironmentEnum.Producation && builder.credentials) {
    builder.app.use(
      [`/${builder.path}`],
      basicAuth({ challenge: true, users: builder.credentials }),
    );
  }
  const swaggerDocumentBuilder = new DocumentBuilder()
    .setTitle(builder.title)
    .setDescription(builder.description)
    .setVersion(builder.version)
    .addBearerAuth();
  builder.servers.forEach((server) => {
    swaggerDocumentBuilder.addServer(server.url, server.description);
  });
  const document = SwaggerModule.createDocument(
    builder.app,
    swaggerDocumentBuilder.build(),
    {},
  );
  SwaggerModule.setup('docs', builder.app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};

export const helmet = (app: NestExpressApplication): void => {
  app.disable('x-powered-by');
  app.disable('X-Powered-By');
};

export const cors = (app: NestExpressApplication) => {
  app.enableCors();
};

export const validationPipe = (app: NestExpressApplication) => {
  app.useGlobalFilters(new HttpExceptionFilter());
};
export const exceptionFilterPipe = (app: NestExpressApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new ValidationException(errors),
    }),
  );
};

export const getTokenFromHeader = (request): string | undefined => {
  return request.headers?.authorization?.replace('Bearer ', '')?.trim() ?? '';
};

export const slugify = (slug: string) => {
  return stringToSlug(slug, {
    lower: true,
  });
};
