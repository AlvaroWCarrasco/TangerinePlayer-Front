import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HeaderComponent {
  searchQuery: string = '';
  searchResults: any[] = [];

  onSearch() {
    // Implementación API Spotify
    console.log('Searching for:', this.searchQuery);
  }
}