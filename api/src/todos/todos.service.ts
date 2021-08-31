import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.model';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo)
    private readonly todoModel: typeof Todo,
  ) {}

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.text = createTodoDto.text;

    return todo.save();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.findAll();
  }

  findOne(id: string): Promise<Todo> {
    return this.todoModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<void> {
    const user = await this.findOne(id);
    await user.update(updateTodoDto);
  }

}
