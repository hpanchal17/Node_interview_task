import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const databaseFactory = (configService: ConfigService) => {
  return {
    ...configService.get('database'),
    autoLoadEntities: true,
  };
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: databaseFactory,
    }),
  ],
})
export class DatabaseModule {}
