import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './event.controller';
import { EventSchema } from './event.model';
import { EventService } from './event.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Event', schema: EventSchema}])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
