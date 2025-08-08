import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for development
  app.enableCors();
  
  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  
  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Vessel Emissions API')
    .setDescription('API for vessel emissions visualization')
    .setVersion('1.0')
    .addTag('vessels')
    .addTag('emissions')
    .addTag('poseidon-principles')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  // Start the application
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`API documentation available at: http://localhost:${port}/api`);
}

bootstrap();
