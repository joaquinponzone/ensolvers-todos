import { Model } from 'sequelize-typescript';
export declare class Todo extends Model<Todo> {
    id: number;
    text: string;
    done: boolean;
}
