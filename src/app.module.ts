import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './events/event.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://anklim:Py7SBu4UUm8lfLQH@cluster0.r5yvbqt.mongodb.net/nestjs-mongo?retryWrites=true&w=majority'),
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
