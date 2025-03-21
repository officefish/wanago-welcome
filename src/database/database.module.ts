
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
 
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [
          process.env.NODE_ENV === 'production'
            ? 'dist/**/*.entity.js'  // Для Docker (JS-файлы)
            : 'src/**/*.entity.ts'   // Для разработки (TS-файлы)
        ],
        synchronize: true,
        retryDelay: 2000,  // Wait 2 seconds between retries
        retryAttempts: 4, // Increase retry attempts
        logging: true
      })
    }),
  ],
})
export class DatabaseModule {}
