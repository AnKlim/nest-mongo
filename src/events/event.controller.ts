import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(
    @Body('title') eventTitle: string,
    @Body('description') eventDescription: string,
    @Body('price') eventPrice: number,
    @Body('date') eventDate: string,
    @Body('creator') eventCreator: string,
  ) {
    const generatedId = await this.eventService.insertEvent(eventTitle, eventDescription, eventPrice, eventDate, eventCreator);
    return {id: generatedId};
  }

  @Get()
  getAllEvents() {
    return this.eventService.getEvents();
  }

  @Get(':id')
  getEvent(@Param('id') eventId: string) {
    return this.eventService.getSingleEvent(eventId);
  }

  @Patch(':id')
  updateEvent(
    @Param('id') eventId: string,
    @Body('title') eventTitle: string,
    @Body('description') eventDescription: string,
    @Body('price') eventPrice: number,
    @Body('date') eventDate: string,
    @Body('creator') eventCreator: string) {
    this.eventService.updateEvent(eventId, eventTitle, eventDescription, eventPrice, eventDate, eventCreator);
  }

  @Delete(':id')
  removeEvent(@Param('id') eventId: string) {
    return this.eventService.deleteEvent(eventId);
  }
}
