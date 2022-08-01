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
import { ConfirmModule } from '../../shared/components/confirm/confirm.module';
import { DialogAddModule } from '../dialog-add/dialog-add.module';
import { SubTodoItemComponent } from './components/sub-todo-item/sub-todo-item.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { KeyTodoActions } from './store/todo.actions';
import { TodoEffects } from './store/todo.effects';
import { TodoReducer } from './store/todo.reducer';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';

import { TodoListComponent } from './todo-list.component';
import { TodoListService } from './todo-list.service';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        MockComponent(TodoCardComponent),
        MockComponent(SubTodoItemComponent),
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

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add', () => {
    expect(component.add()).toEqual(undefined);
  });
});
