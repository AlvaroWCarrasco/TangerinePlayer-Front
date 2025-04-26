import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistCardComponent } from '../shared/playlist-card/playlist-card.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { SpotifyService, SpotifyPlaylist } from '../../services/spotify.service';

interface Section {
  title: string;
  items: SpotifyPlaylist[];
  genreId?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, PlaylistCardComponent, SectionHeaderComponent]
})
export class HomeComponent implements OnInit {
  sections: Section[] = [
    { title: 'Playlists Populares', items: [] },
    { title: 'Rock', items: [], genreId: 'rock' },
    { title: 'Hip Hop', items: [], genreId: 'hip-hop' },
    { title: 'Electrónica', items: [], genreId: 'electronic' },
    { title: 'Jazz', items: [], genreId: 'jazz' }
  ];
  
  isSidebarOpen = false;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.loadPlaylists();
  }

  private loadPlaylists() {
    // Load featured playlists
    this.spotifyService.getFeaturedPlaylists().subscribe(playlists => {
      this.sections[0].items = playlists.slice(0, 5);
    });

    // Load genre playlists
    this.sections.slice(1).forEach(section => {
      if (section.genreId) {
        this.spotifyService.getPlaylistsByGenre(section.genreId).subscribe(playlists => {
          section.items = playlists;
        });
      }
    });
  }
}