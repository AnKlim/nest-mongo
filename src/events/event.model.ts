import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
});

export interface Event extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    price: number;
    date: string;
    creator: string;
}