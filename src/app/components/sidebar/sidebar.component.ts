import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import userData from '../../data/user.json';
import playlistsData from '../../data/playlists.json';
import { UserData, PlaylistsData, Playlist } from '../../types/data.types';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SidebarComponent {
  user = {
    name: (userData as UserData).user.username,
    profilePic: (userData as UserData).user.profilePic
  };

  playlists = (playlistsData as PlaylistsData).playlists.map((playlist: Playlist) => playlist.name);

  addPlaylist() {
    console.log('Adding new playlist');
  }
}