import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import playlistsData from '../data/playlists.json';
import { Song, CurrentSong } from '../interfaces/music.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private audioElement: HTMLAudioElement | null = null;
  private currentPlaylist: Song[] = [];
  private currentSongIndex = 0;
  
  private currentSongSubject = new BehaviorSubject<CurrentSong>({
    title: '',
    artist: '',
    image: '',
    audioUrl: '',
    currentTime: '0:00',
    duration: '0:00',
    progress: 0
  });

  currentSong$ = this.currentSongSubject.asObservable();
  isPlaying = false;

  constructor() {
    this.initAudio();
  }

  private initAudio() {
    this.audioElement = new Audio();
    this.audioElement.volume = 1;

    this.audioElement.addEventListener('timeupdate', () => this.updateProgress());
    this.audioElement.addEventListener('loadedmetadata', () => this.updateDuration());
    this.audioElement.addEventListener('ended', () => this.playNext());
  }

  private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  private updateProgress() {
    if (!this.audioElement) return;
    
    const currentTime = this.formatTime(this.audioElement.currentTime);
    const progress = (this.audioElement.currentTime / this.audioElement.duration) * 100;

    this.currentSongSubject.next({
      ...this.currentSongSubject.value,
      currentTime,
      progress: isNaN(progress) ? 0 : progress
    });
  }

  private updateDuration() {
    if (!this.audioElement) return;
    
    const duration = this.formatTime(this.audioElement.duration);
    
    this.currentSongSubject.next({
      ...this.currentSongSubject.value,
      duration
    });
  }

  loadSong(song: Song) {
    if (!this.audioElement) return;

    this.audioElement.src = song.audioUrl;
    this.audioElement.load();
    
    this.currentSongSubject.next({
      title: song.title,
      artist: song.artist,
      image: song.coverUrl,
      audioUrl: song.audioUrl,
      currentTime: '0:00',
      duration: song.duration,
      progress: 0
    });
  }

  async playPlaylist(playlistId: string) {
    const playlist = playlistsData.playlists.find(p => p.id === playlistId);
    if (!playlist || !playlist.songs.length) return;

    this.currentPlaylist = playlist.songs;
    this.currentSongIndex = 0;
    
    await this.loadAndPlaySong();
  }

  private async loadAndPlaySong() {
    if (this.currentPlaylist.length === 0) return;
    
    const song = this.currentPlaylist[this.currentSongIndex];
    this.loadSong(song);
    await this.play();
  }

  async playNext() {
    if (this.currentPlaylist.length === 0) return;
    
    this.currentSongIndex = (this.currentSongIndex + 1) % this.currentPlaylist.length;
    await this.loadAndPlaySong();
  }

  async playPrevious() {
    if (this.currentPlaylist.length === 0) return;
    
    this.currentSongIndex = (this.currentSongIndex - 1 + this.currentPlaylist.length) % this.currentPlaylist.length;
    await this.loadAndPlaySong();
  }

  async play() {
    if (!this.audioElement) return;
    
    try {
      await this.audioElement.play();
      this.isPlaying = true;
    } catch (error) {
      console.error('Error playing audio:', error);
      this.isPlaying = false;
    }
  }

  pause() {
    if (!this.audioElement) return;
    this.audioElement.pause();
    this.isPlaying = false;
  }

  setVolume(volume: number) {
    if (this.audioElement) {
      this.audioElement.volume = Math.max(0, Math.min(1, volume / 100));
    }
  }

  seek(percentage: number) {
    if (!this.audioElement) return;
    
    const time = (percentage / 100) * (this.audioElement.duration || 0);
    if (!isNaN(time)) {
      this.audioElement.currentTime = time;
      this.updateProgress();
    }
  }
}