import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoDto } from '@teste/api-interfaces';

import { Observable } from 'rxjs';

@Injectable()
export class TodoListService {
  constructor(private http: HttpClient) {}

  baseUrl = '/api/todo';

  create(todoDto: TodoDto): Observable<TodoDto> {
    return this.http.post<TodoDto>(this.baseUrl, todoDto);
  }

  read(): Observable<TodoDto[]> {
    return this.http.get<TodoDto[]>(this.baseUrl);
  }

  update(uuid: string, todoDto: TodoDto): Observable<TodoDto> {
    return this.http.put<TodoDto>(this.baseUrl, {
      ...todoDto,
      uuid,
    });
  }

  delete(uuid: string): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + `/${uuid}`);
  }
}
