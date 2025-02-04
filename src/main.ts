import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { selectFileToImport } from './utils/select-file-to-import';

async function bootstrap() {
  await selectFileToImport();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
