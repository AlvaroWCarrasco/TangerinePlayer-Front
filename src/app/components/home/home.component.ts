import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import playlistsData from '../../data/playlists.json';
import songsData from '../../data/songs.json';
import genresData from '../../data/genres.json';
import { PlaylistsData, SongsData, GenresData, Playlist, Song, Genre } from '../../types/data.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent {
  sections = [
    {
      title: 'Tus playlists más escuchadas',
      items: (playlistsData as PlaylistsData).playlists.map((playlist: Playlist) => ({
        name: playlist.name,
        image: playlist.coverUrl
      }))
    },
    {
      title: 'Canciones destacadas',
      items: (songsData as SongsData).songs.map((song: Song) => ({
        name: song.title,
        image: song.coverUrl
      }))
    },
    {
      title: 'Géneros',
      items: (genresData as GenresData).genres.map((genre: Genre) => ({
        name: genre.name,
        image: genre.coverUrl
      }))
    }
  ];
}