import { TestBed, inject } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { InteractiveService } from './interactive.service';

class snackbarMock {
  open() {
    return;
  }
}
describe('Service: InteractiveService', () => {
  let interactiveService: InteractiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [
        InteractiveService,
        { provide: MatSnackBar, useClass: snackbarMock },
      ],
    });

    interactiveService = TestBed.inject(InteractiveService);
  });

  it('should ...', inject(
    [InteractiveService],
    (service: InteractiveService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('openSnackBar', () => {
    expect(interactiveService.openSnackBar('123')).toEqual(undefined);
  });
});
