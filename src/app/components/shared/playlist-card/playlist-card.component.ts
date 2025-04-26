import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MusicService } from '../../../services/music.service';
import { NavigationService } from '../../../services/navigation.service';
import { PlaylistCard } from '../../../interfaces/music.interfaces';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class PlaylistCardComponent {
  @Input() playlist!: PlaylistCard;

  constructor(
    private musicService: MusicService,
    private navigationService: NavigationService
  ) {}

  playPlaylist(event: MouseEvent) {
    event.stopPropagation();
    if (this.playlist.id) {
      this.musicService.playPlaylist(this.playlist.id);
    }
  }

  openPlaylist() {
    if (this.playlist.id) {
      this.navigationService.showPlaylist(this.playlist.id);
    }
  }
}