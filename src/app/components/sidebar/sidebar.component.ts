import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import userData from '../../data/user.json';
import playlistsData from '../../data/playlists.json';
import { UserData, PlaylistsData } from '../../types/data.types';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class SidebarComponent {
  private isSidebarOpenSubject = new BehaviorSubject<boolean>(false);
  isSidebarOpen$ = this.isSidebarOpenSubject.asObservable();
  isSidebarOpen = false;

  user = {
    name: (userData as UserData).user.username,
    profilePic: (userData as UserData).user.profilePic
  };

  playlists = (playlistsData as PlaylistsData).playlists.map(playlist => playlist.name);

  constructor() {
    this.isSidebarOpen$.subscribe(
      isOpen => this.isSidebarOpen = isOpen
    );
  }

  addPlaylist() {
    console.log('Adding new playlist');
  }

  toggleSidebar() {
    this.isSidebarOpenSubject.next(!this.isSidebarOpenSubject.value);
  }
}