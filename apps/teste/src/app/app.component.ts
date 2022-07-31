import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoDto } from '@teste/api-interfaces';

@Component({
  selector: 'teste-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private http: HttpClient) {}
}
