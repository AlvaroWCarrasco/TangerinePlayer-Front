import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PlayerComponent {
  currentSong = {
    title: 'Midnight Dreams',
    artist: 'Luna Eclipse',
    image: 'https://picsum.photos/seed/song1/300/300',
    currentTime: '0:00',
    duration: '3:45',
    progress: 30
  };

  volume = 50;
  isPlaying = false;
}