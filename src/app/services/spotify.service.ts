import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of, from } from 'rxjs';
import { map, catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface SpotifySearchResult {
  id: string;
  title: string;
  artist: string;
  album: string;
  image: string;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private token = new BehaviorSubject<string>('');
  private searchSubject = new BehaviorSubject<string>('');
  private apiUrl = 'https://api.spotify.com/v1';
  private tokenExpirationTime: number = 0;

  constructor(private http: HttpClient) {
    this.initializeToken();
    
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.searchTracks(query))
    );
  }

  private async initializeToken() {
    if (this.tokenExpirationTime > Date.now()) {
      return;
    }

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(environment.spotifyClientId + ':' + environment.spotifyClientSecret)
        },
        body: new URLSearchParams({
          'grant_type': 'client_credentials'
        }).toString()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.token.next(data.access_token);
      this.tokenExpirationTime = Date.now() + (data.expires_in * 1000);
    } catch (error) {
      console.error('Error getting Spotify token:', error);
      this.token.next('');
    }
  }

  private async ensureValidToken(): Promise<string> {
    if (this.tokenExpirationTime <= Date.now()) {
      await this.initializeToken();
    }
    return this.token.value;
  }

  getFeaturedPlaylists(): Observable<SpotifyPlaylist[]> {
    return from(this.ensureValidToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        return this.http.get(`${this.apiUrl}/browse/featured-playlists`, { headers }).pipe(
          map((response: any) => {
            return response.playlists.items.map((playlist: any) => ({
              id: playlist.id,
              name: playlist.name,
              description: playlist.description,
              image: playlist.images[0]?.url
            }));
          }),
          catchError(error => {
            console.error('Error fetching featured playlists:', error);
            return of([]);
          })
        );
      })
    );
  }

  getPlaylistsByGenre(genreId: string): Observable<SpotifyPlaylist[]> {
    return from(this.ensureValidToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        const params = new HttpParams()
          .set('seed_genres', genreId)
          .set('limit', '5');

        return this.http.get(`${this.apiUrl}/recommendations`, { headers, params }).pipe(
          map((response: any) => {
            return response.tracks.map((track: any) => ({
              id: track.id,
              name: track.name,
              description: track.artists[0].name,
              image: track.album.images[0]?.url
            }));
          }),
          catchError(error => {
            console.error('Error fetching genre playlists:', error);
            return of([]);
          })
        );
      })
    );
  }

  search(query: string): Observable<SpotifySearchResult[]> {
    if (!query.trim()) {
      return of([]);
    }

    return from(this.ensureValidToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        const params = new HttpParams()
          .set('q', query)
          .set('type', 'track')
          .set('limit', '5');

        return this.http.get(`${this.apiUrl}/search`, { headers, params }).pipe(
          map((response: any) => {
            return response.tracks.items.map((track: any) => ({
              id: track.id,
              title: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              image: track.album.images[0]?.url
            }));
          }),
          catchError(error => {
            console.error('Error searching Spotify:', error);
            return of([]);
          })
        );
      })
    );
  }

  private searchTracks(query: string): Observable<SpotifySearchResult[]> {
    return this.search(query);
  }

  updateSearch(query: string) {
    this.searchSubject.next(query);
  }
}