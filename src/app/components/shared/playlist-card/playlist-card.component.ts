import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MusicService } from '../../../services/music.service';
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

  constructor(private musicService: MusicService) {}

  playPlaylist() {
    if (this.playlist.id) {
      this.musicService.playPlaylist(this.playlist.id);
    }
  }
}