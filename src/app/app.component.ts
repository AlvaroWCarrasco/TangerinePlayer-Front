import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <app-home></app-home>
  `,
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, HomeComponent]
})
export class AppComponent {
  title = 'TangerinePlayer-Front';
}
