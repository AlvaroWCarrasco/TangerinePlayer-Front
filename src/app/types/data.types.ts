export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  audioUrl: string;
  genre: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  createdBy: string;
  songs: string[];
  followers: number;
}

export interface Genre {
  id: string;
  name: string;
  coverUrl: string;
  description: string;
  popularSongs: string[];
  popularArtists: string[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  profilePic: string;
  playlists: string[];
}

export interface SongsData {
  songs: Song[];
}

export interface PlaylistsData {
  playlists: Playlist[];
}

export interface GenresData {
  genres: Genre[];
}

export interface UserData {
  user: User;
}