import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PlaylistCardComponent {
  @Input() playlist!: {
    name: string;
    image: string;
    description?: string;
  };
}