import { Component, Input } from '@angular/core';
import { Todo } from '@teste/api-interfaces';

@Component({
  selector: 'teste-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent {
  @Input() todo!: Todo;
}
