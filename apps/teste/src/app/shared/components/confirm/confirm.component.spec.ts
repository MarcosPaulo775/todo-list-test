import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { ConfirmComponent } from './confirm.component';

import { ConfirmService } from './confirm.service';

class MatDialogRefMock {
  keydownEvents() {
    return of({
      subscribe: () => {
        return { key: 'Escape' };
      },
    });
  }
  close() {
    return;
  }
}

describe('ConfirmComponent', () => {
  let component: ConfirmComponent;
  let fixture: ComponentFixture<ConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmComponent],
      imports: [CommonModule, MatDialogModule, MatButtonModule],
      providers: [
        MockProvider(ConfirmService),
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    component.ngOnInit();
  });

  it('onNot', () => {
    expect(component.onNot()).toEqual(undefined);
  });

  it('onYes', () => {
    expect(component.onYes()).toEqual(undefined);
  });
});
