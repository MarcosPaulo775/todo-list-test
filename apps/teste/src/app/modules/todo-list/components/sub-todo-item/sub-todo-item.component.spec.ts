import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConfirmModule } from '../../../../shared/components/confirm/confirm.module';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { DialogAddModule } from '../../../dialog-add/dialog-add.module';
import { KeyTodoActions } from '../../store/todo.actions';
import { TodoEffects } from '../../store/todo.effects';
import { TodoReducer } from '../../store/todo.reducer';
import { TodoListComponent } from '../../todo-list.component';
import { TodoListService } from '../../todo-list.service';
import { TodoCardComponent } from '../todo-card/todo-card.component';

import { SubTodoItemComponent } from './sub-todo-item.component';
import { TodoDto } from '@teste/api-interfaces';

export const todoDtoMock = {
  uuid: 'uuid',
  todo: 'todo',
  checked: false,
  subTodo: [{ uuid: 'uuid', todo: 'todo', checked: false, subTodo: [] }],
} as TodoDto;

describe('SubTodoItemComponent', () => {
  let component: SubTodoItemComponent;
  let fixture: ComponentFixture<SubTodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SubTodoItemComponent,
        MockComponent(TodoCardComponent),
        MockComponent(TodoListComponent),
      ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MockModule(DialogAddModule),
        MockModule(ConfirmModule),
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(KeyTodoActions, TodoReducer),
        MockModule(EffectsModule.forFeature([TodoEffects])),
      ],
      providers: [MockProvider(TodoListService)],
    }).compileComponents();

    fixture = TestBed.createComponent(SubTodoItemComponent);
    component = fixture.componentInstance;
    component.todo = todoDtoMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add', () => {
    expect(component.add()).toEqual(undefined);
  });

  it('editTodo', () => {
    expect(component.editTodo()).toEqual(undefined);
  });

  it('updateTodo', () => {
    expect(component.updateTodo()).toEqual(undefined);
  });

  it('deleteTodo', () => {
    expect(component.deleteTodo()).toEqual(undefined);
  });
});
