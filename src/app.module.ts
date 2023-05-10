import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ArticModule } from './modules/artic/artic.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { ObjectionModule } from 'nestjs-objection/dist';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { knexSnakeCaseMappers } from 'objection';
import { SoftDeleteModel } from 'nestjs-objection';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    ArticModule,
    PurchaseModule,
    AuthModule,
    JwtModule,
    ObjectionModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        SoftDeleteModel,
        config: {
          debug: true,
          useNullAsDefault: true,
          client: 'mysql',
          connection: {
            host: config.get<string>('MYSQL_HOST'),
            port: config.get<number>('MYSQL_PORT'),
            user: config.get<string>('MYSQL_USER'),
            password: config.get<string>('MYSQL_PASSWORD'),
            database: config.get<string>('MYSQL_DATABASE'),
          },
          ...knexSnakeCaseMappers({
            underscoreBeforeDigits: false,
          }),
        },
      }),
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
