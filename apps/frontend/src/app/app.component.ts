import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Message } from '@igikanam/interfaces';

@Component({
  selector: 'igikanam-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
