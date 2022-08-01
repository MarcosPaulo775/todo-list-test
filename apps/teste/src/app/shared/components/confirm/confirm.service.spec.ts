import { TestBed, inject } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmService } from './confirm.service';

class matDialogMock {
  open() {
    return {
      afterClosed: () => {
        return {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          pipe: (map: () => null) => {
            return { key: 'Escape' };
          },
        };
      },
    };
  }
}

describe('Service: ConfirmService', () => {
  let confirmService: ConfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        ConfirmService,
        { provide: MatDialog, useClass: matDialogMock },
      ],
    });

    confirmService = TestBed.inject(ConfirmService);
  });

  it('should ...', inject([ConfirmService], (service: ConfirmService) => {
    expect(service).toBeTruthy();
  }));

  it('openSnackBar', () => {
    expect(confirmService.open('123')).toBeTruthy();
  });
});
