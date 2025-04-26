import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Playlist } from '../interfaces/music.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private apiUrl = 'http://localhost:3000/playlists';
  private userId = 1; // Temporary hardcoded user ID for testing

  constructor(private http: HttpClient) {}

  getPlaylists(): Observable<Playlist[]> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.http.post<Playlist[]>(`${this.apiUrl}/user`, {
      ID_Usuario: this.userId
    }, { 
      headers,
      withCredentials: false
    });
  }

  createPlaylist(name: string): Observable<Playlist> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    const newPlaylist = {
      name,
      description: '',
      coverUrl: `https://picsum.photos/seed/${Date.now()}/300/300`,
      ID_Usuario: this.userId
    };

    return this.http.post<{message: string, playlist: Playlist}>(this.apiUrl, newPlaylist, { 
      headers,
      withCredentials: false
    }).pipe(
      map(response => response.playlist)
    );
  }

  deletePlaylist(playlistId: string): Observable<void> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.http.delete<void>(`${this.apiUrl}/${playlistId}`, {
      headers,
      withCredentials: false
    });
  }
}