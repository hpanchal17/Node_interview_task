import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './modules/app.module';
import { Logger } from '@shareable/logger';
import {
  cors,
  exceptionFilterPipe,
  helmet,
  swagger,
  validationPipe,
} from '@shareable/utility/utility';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config: ConfigService = app.get(ConfigService);
  cors(app);
  helmet(app);
  validationPipe(app);
  exceptionFilterPipe(app);
  swagger({
    app,
    title: `${config.get('name')} User Apis`,
    description: `this swagger will contain all the ${config.get('name')} apis`,
    version: '0.1',
    path: 'docs',
    mode: config.getOrThrow('mode'),
    servers: Object.values(config.getOrThrow('apps.userApi.swagger.servers')),
    credentials: {
      [config.get('apps.userApi.swagger.username')]: config.get(
        'apps.userApi.swagger.password',
      ),
    },
  });
  return app.listen(config.getOrThrow('apps.userApi.port')).then(() => app);
}

bootstrap().then(async (app: NestExpressApplication) => {
  const logger: Logger = app.get(Logger);
  const config: ConfigService = app.get(ConfigService);
  logger.log(
    `${config.get('name')} Users Apis running on ` + (await app.getUrl()),
    'Main.ts',
  );
});
