import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import songsData from '../../data/songs.json';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class PlayerComponent {
  private audio: HTMLAudioElement | null = null;
  currentSong = {
    title: songsData.songs[0].title,
    artist: songsData.songs[0].artist,
    image: songsData.songs[0].coverUrl,
    currentTime: '0:00',
    duration: '0:00',
    progress: 0
  };

  volume = 100;
  isPlaying = false;
  audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  ngOnInit() {
    this.audio = new Audio(this.audioUrl);
    this.audio.volume = this.volume / 100;

    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('loadedmetadata', () => {
      this.currentSong.duration = this.formatTime(this.audio?.duration || 0);
    });
    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.currentSong.currentTime = '0:00';
      this.currentSong.progress = 0;
    });
  }

  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.removeEventListener('timeupdate', () => this.updateProgress());
      this.audio.removeEventListener('loadedmetadata', () => {});
      this.audio.removeEventListener('ended', () => {});
    }
  }

  togglePlay() {
    if (this.audio) {
      if (this.isPlaying) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
      this.isPlaying = !this.isPlaying;
    }
  }

  updateVolume(event: Event) {
    const input = event.target as HTMLInputElement;
    this.volume = parseInt(input.value);
    if (this.audio) {
      this.audio.volume = this.volume / 100;
    }
  }

  seek(event: MouseEvent) {
    if (this.audio) {
      const progressBar = event.currentTarget as HTMLDivElement;
      const clickPosition = event.offsetX / progressBar.offsetWidth;
      this.audio.currentTime = clickPosition * this.audio.duration;
    }
  }

  private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  private updateProgress() {
    if (this.audio) {
      this.currentSong.currentTime = this.formatTime(this.audio.currentTime);
      this.currentSong.progress = (this.audio.currentTime / this.audio.duration) * 100;
    }
  }
}