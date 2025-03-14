import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MusicService } from '../../services/music.service';
import { CurrentSong } from '../../interfaces/music.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class PlayerComponent implements OnInit, OnDestroy {
  currentSong!: CurrentSong;
  private subscription: Subscription | null = null;
  volume = 50;
  isPlaying = false;

  constructor(private musicService: MusicService) {}

  ngOnInit() {
    this.subscription = this.musicService.currentSong$.subscribe(song => {
      this.currentSong = song;
      this.isPlaying = this.musicService.isPlaying;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async togglePlay() {
    if (this.isPlaying) {
      this.musicService.pause();
    } else {
      await this.musicService.play();
    }
    this.isPlaying = this.musicService.isPlaying;
  }

  updateVolume(event: Event) {
    const input = event.target as HTMLInputElement;
    this.volume = parseInt(input.value);
    this.musicService.setVolume(this.volume);
  }

  seek(event: MouseEvent) {
    const progressBar = event.currentTarget as HTMLDivElement;
    const clickPosition = (event.offsetX / progressBar.offsetWidth) * 100;
    this.musicService.seek(clickPosition);
  }

  playNext() {
    this.musicService.playNext();
  }

  playPrevious() {
    this.musicService.playPrevious();
  }
}