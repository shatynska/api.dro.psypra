import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { patchNestJsSwagger } from 'nestjs-zod';
import { AuthModule } from 'src/auth/auth.module';
import { SpecialistsProfilesModule } from 'src/specialists-profiles/specialists-profiles.module';
import { UsersModule } from 'src/users/users.module';
import { WebsiteContentModule } from 'src/website-content/website-content.module';
import { HttpModule } from '~/cash-books/infrastructure/http/http.module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(helmet());
  app.use(cookieParser());

  patchNestJsSwagger();

  const organizationBookkeepingOptions = new DocumentBuilder()
    .setTitle('DroPsyPra bookkeeping')
    .setDescription('The DroPsyPra bookkeeping API description')
    .setVersion('0.0.1')
    .addTag('bookkeeping')
    .addBearerAuth()
    .build();
  const organizationBookkeepingDocument = SwaggerModule.createDocument(
    app,
    organizationBookkeepingOptions,
    { include: [HttpModule, UsersModule, AuthModule] },
  );
  SwaggerModule.setup('api/bookkeeping', app, organizationBookkeepingDocument);

  const websiteContentOptions = new DocumentBuilder()
    .setTitle('DroPsyPra website content')
    .setDescription('The DroPsyPra website content API description')
    .setVersion('0.0.1')
    .addTag('pages')
    .build();
  const websiteContentDocument = SwaggerModule.createDocument(
    app,
    websiteContentOptions,
    { include: [WebsiteContentModule] },
  );
  SwaggerModule.setup('api', app, websiteContentDocument);

  const specialistsProfilesOptions = new DocumentBuilder()
    .setTitle('DroPsyPra specialists profiles')
    .setDescription('The DroPsyPra specialists profiles API description')
    .setVersion('0.0.1')
    .addTag('profiles')
    .addBearerAuth()
    .build();
  const specialistsProfilesDocument = SwaggerModule.createDocument(
    app,
    specialistsProfilesOptions,
    {
      include: [UsersModule, AuthModule, SpecialistsProfilesModule],
    },
  );
  SwaggerModule.setup('api/profiles', app, specialistsProfilesDocument);

  const config = await app.get(ConfigService);
  const port = config.get<number>('API_PORT');
  await app.listen(port || 3000);
}
bootstrap();
