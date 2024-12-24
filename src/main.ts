import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('KesyKely Addon Modules API Docuentations')
        .setDescription('Ce serveur d\'api est conçu pour servir temporairement les données requises par les addons KesyKely (Timeline calendar) our : Restaurant, Hôtel, SPA, ...')
        .setVersion('1.0')
        .addTag('Timeline Calendar API')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('', app, documentFactory);
    const allowedOrigins = [
        'http://localhost:8001',
        'http://localhost:8100',
        'https://*.serveo.net'
    ];
    app.enableCors({
        origin: (origin, callback) => {
            const serveo = allowedOrigins.find(o => o.includes('serveo.net'));
            const regex = /^https:\/\/(.*\.)?serveo\.net$/;
            if (!origin || allowedOrigins.includes(origin) || regex.test(origin)) {
                callback(null, true);
            } else {
                console.log(origin);
                callback(new Error('Not allowed by CORS'));
            }
        }, // Remplacez par l'URL de votre frontend
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    await app.listen(3000);
}

bootstrap();

export function formatQueryWithParameters(query: string, parameters: any[]): string {
    return query.replace(/\$(\d+)|:(\w+)/g, (match, p1, p2) => {
        const index = p1 ? parseInt(p1, 10) - 1 : parameters[p2];
        return typeof parameters[index] === 'string'
            ? `'${parameters[index]}'`
            : parameters[index];
    });
}