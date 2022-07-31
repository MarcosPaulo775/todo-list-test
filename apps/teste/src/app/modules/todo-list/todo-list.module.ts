import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoListComponent } from './todo-list.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SubTodoItemComponent } from './components/sub-todo-item/sub-todo-item.component';
import { DialogAddModule } from '../dialog-add/dialog-add.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TodoListComponent, TodoCardComponent, SubTodoItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogAddModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
  ],
  exports: [TodoListComponent],
})
export class TodoListModule {}
