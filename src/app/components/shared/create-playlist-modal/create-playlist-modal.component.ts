import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-playlist-modal',
  templateUrl: './create-playlist-modal.component.html',
  styleUrls: ['./create-playlist-modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule]
})
export class CreatePlaylistModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<string>();
  
  playlistName: string = '';

  onClose() {
    this.close.emit();
  }

  onCreate() {
    if (this.playlistName.trim()) {
      this.create.emit(this.playlistName.trim());
      this.playlistName = '';
    }
  }
}