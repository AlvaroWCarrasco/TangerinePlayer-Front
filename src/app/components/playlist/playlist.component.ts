import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MusicService } from '../../services/music.service';
import { NavigationService } from '../../services/navigation.service';
import { PlaylistService } from '../../services/playlist.service';
import { Song } from '../../interfaces/music.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class PlaylistComponent implements OnInit, OnDestroy {
  songs: Song[] = [];
  playlistTitle: string = '';
  currentSongId: string | null = null;
  private playlistSubscription: Subscription | null = null;

  constructor(
    private musicService: MusicService,
    private navigationService: NavigationService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit() {
    this.playlistSubscription = this.navigationService.currentPlaylistId$.subscribe(playlistId => {
      if (playlistId) {
        this.loadPlaylist(playlistId);
      }
    });

    this.musicService.currentSong$.subscribe(song => {
      if (song.title) {
        this.currentSongId = song.audioUrl;
      }
    });
  }

  ngOnDestroy() {
    if (this.playlistSubscription) {
      this.playlistSubscription.unsubscribe();
    }
  }

  private loadPlaylist(playlistId: string) {
    this.playlistService.getPlaylists().subscribe(playlists => {
      const playlist = playlists.find(p => p.id === playlistId);
      if (playlist) {
        this.playlistTitle = playlist.name;
        this.songs = playlist.songs;
      }
    });
  }

  playSong(song: Song) {
    this.currentSongId = song.id;
    this.musicService.loadSong(song);
    this.musicService.play();
  }

  goHome() {
    this.navigationService.showHome();
  }
}