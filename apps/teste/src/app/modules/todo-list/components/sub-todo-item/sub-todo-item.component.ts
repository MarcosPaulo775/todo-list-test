import { Component, Input } from '@angular/core';
import { Todo } from '@teste/api-interfaces';

@Component({
  selector: 'teste-sub-todo-item',
  templateUrl: './sub-todo-item.component.html',
  styleUrls: ['./sub-todo-item.component.scss'],
})
export class SubTodoItemComponent {
  @Input() todo!: Todo;
}
