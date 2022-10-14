import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { resourceLimits } from 'worker_threads';
import { Event } from './event.model';

@Injectable()
export class EventService {
    events: Event[] = [];

    constructor(@InjectModel('Event') private readonly eventModel: Model<Event>) {}

    async insertEvent(title: string, description: string, price: number, date: string, creator: string) {
        const newEvent = new this.eventModel({title, description, price, date, creator});
        const result = await newEvent.save();
        return result.id as string;
    }

    async getEvents() {
        const events = await this.eventModel.find().exec();
        return events.map(event => ({
            id: event.id,
            title: event.title,
            description: event.description,
            price: event.price,
            date: event.date,
            creator: event.creator
        }));
    }

    async getSingleEvent(eventId: string) {
        const event = await this.findEvent(eventId);
        return {
            id: event.id,
            title: event.title,
            description: event.description,
            price: event.price,
            date: event.date,
            creator: event.creator
        };;
    }

    async updateEvent(eventId: string, title: string, description: string, price: number, date: string, creator: string) {
        const updatedEvent = await this.findEvent(eventId);
        if (title) {
            updatedEvent.title = title;
        }
        if (description) {
            updatedEvent.description = description;
        }
        if (price) {
            updatedEvent.price = price;
        }
        if (date) {
            updatedEvent.date = date;
        }
        if (creator) {
            updatedEvent.creator = creator;
        }
        updatedEvent.save();
    }

    async deleteEvent(eventId: string) {
        const result = await this.eventModel.deleteOne({id: eventId}).exec();
        console.log(result);
        if(result.deletedCount === 0) {
            throw new NotFoundException('Could not find event!');
        }
    }

    private async findEvent(eventId: string): Promise<Event> {
        let event;
        try {
            event = await this.eventModel.findById(eventId);
        } catch (error) {
            throw new NotFoundException('Could not find event!');
        }
        if(!event) {
            throw new NotFoundException('Could not find event!');
        }
        return event;
    }
}
