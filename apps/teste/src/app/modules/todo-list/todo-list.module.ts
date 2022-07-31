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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { KeyTodoActions } from './store/todo.actions';
import { TodoReducer } from './store/todo.reducer';
import { TodoEffects } from './store/todo.effects';
import { ConfirmModule } from '../../shared/components/confirm/confirm.module';
import { TodoListService } from './todo-list.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [TodoListComponent, TodoCardComponent, SubTodoItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogAddModule,
    ConfirmModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(KeyTodoActions, TodoReducer),
    EffectsModule.forFeature([TodoEffects]),
  ],
  exports: [TodoListComponent],
  providers: [TodoListService],
})
export class TodoListModule {}
