import { EnvironmentEnum } from '@shareable/enum';
import * as process from 'process';

interface SwaggerServer {
  url: string;
  description: string;
}

interface Swagger {
  username?: string;
  password?: string;
  servers?: {
    [EnvironmentEnum.Development]?: SwaggerServer;
    [EnvironmentEnum.Staging]?: SwaggerServer;
    [EnvironmentEnum.Producation]?: SwaggerServer;
  };
}

export interface configurationInterface {
  name: string;
  mode?: EnvironmentEnum | undefined;
  apps: {
    userApi: {
      port: string;
      swagger: Swagger;
    };
  };
  database: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging: boolean;
  };
  tokens: {
    jwt: {
      secret: string;
      tokenTll: string;
    };
  };
}

export const configuration = (): configurationInterface => ({
  name: process.env.APP_NAME,
  mode: process.env.APP_MODE as EnvironmentEnum,
  apps: {
    userApi: {
      port: process.env.APP_USER_API_PORT,
      swagger: {
        username: process.env.APP_USER_SWAGGER_USERNAME,
        password: process.env.APP_USER_SWAGGER_PASSWORD,
        servers: {
          [EnvironmentEnum.Development]: {
            url: process.env.APP_USER_SWAGGER_DEVELOPMENT_URL,
            description: EnvironmentEnum.Development,
          },
        },
      },
    },
  },
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.DATABASE_SYNCHRONIZE == 'true',
    logging: process.env.DATABASE_LOGGING == 'true',
  },
  tokens: {
    jwt: {
      secret: process.env.TOKEN_JWT_SECRET,
      tokenTll: process.env.TOKEN_JWT_EXPIRE,
    },
  },
});
