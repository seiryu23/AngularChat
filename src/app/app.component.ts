import { Component } from '@angular/core';

@Component
(
  {
    selector: 'app-root',
    template: `
      <app-header></app-header>
      <div class="page">
        <router-outlet></router-outlet>
      </div>
    `,
    styleUrls: ['./app.component.css']
  }
)

export class AppComponent
{
}
