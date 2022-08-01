import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TodoDto } from '@teste/api-interfaces';
import { TodoListService } from './todo-list.service';

const todoDtoMock = {
  uuid: 'uuid',
  todo: 'todo',
  checked: false,
  subTodo: [{ uuid: 'uuid', todo: 'todo', checked: false, subTodo: [] }],
} as TodoDto;

describe('Service: TodoList', () => {
  let todoListService: TodoListService;
  let httpTestingController: HttpTestingController;
  const baseUrl = '/api/todo';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoListService],
    });

    todoListService = TestBed.inject(TodoListService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should ...', inject([TodoListService], (service: TodoListService) => {
    expect(service).toBeTruthy();
  }));

  it('create', () => {
    let result: TodoDto = {} as TodoDto;

    todoListService.create(todoDtoMock).subscribe((t) => {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: 'POST',
      url: baseUrl,
    });

    req.flush(todoDtoMock);

    expect(result).toEqual(todoDtoMock);
  });

  it('read', () => {
    let result: TodoDto[] = [] as TodoDto[];

    todoListService.read().subscribe((t) => {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: baseUrl,
    });

    req.flush([todoDtoMock]);

    expect(result).toEqual([todoDtoMock]);
  });

  it('update', () => {
    let result: TodoDto = {} as TodoDto;

    todoListService.update(todoDtoMock.uuid, todoDtoMock).subscribe((t) => {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: baseUrl,
    });

    req.flush(todoDtoMock);

    expect(result).toEqual(todoDtoMock);
    // expect(todoListService.update()).toEqual(
    //   todoDtoMock
    // );
  });

  it('delete', () => {
    let result = false;

    todoListService.delete(todoDtoMock.uuid).subscribe((t) => {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: 'DELETE',
      url: baseUrl + `/${todoDtoMock.uuid}`,
    });

    req.flush(true);

    expect(result).toEqual(true);
  });
});
