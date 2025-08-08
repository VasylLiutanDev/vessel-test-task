"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Enable CORS for development
    app.enableCors();
    // Global validation pipe
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    // Global exception filter
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    // Swagger documentation
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Vessel Emissions API')
        .setDescription('API for vessel emissions visualization')
        .setVersion('1.0')
        .addTag('vessels')
        .addTag('emissions')
        .addTag('poseidon-principles')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    // Start the application
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
    console.log(`API documentation available at: http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map