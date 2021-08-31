import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.model';
export declare class TodosService {
    private readonly todoModel;
    constructor(todoModel: typeof Todo);
    create(createTodoDto: CreateTodoDto): Promise<Todo>;
    findAll(): Promise<Todo[]>;
    findOne(id: string): Promise<Todo>;
    remove(id: string): Promise<void>;
    update(id: string, updateTodoDto: UpdateTodoDto): Promise<void>;
}
