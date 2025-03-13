import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PlayerComponent } from './components/player/player.component';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <app-home></app-home>
    <app-player></app-player>
  `,
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, HomeComponent, PlayerComponent]
})
export class AppComponent {
  title = 'TangerinePlayer-Front';
}
