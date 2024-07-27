import Genre from "../../types/genre";
import Song from "../../types/song";

export type SongFilter = {
  searchTerm: string;
  genre: Genre,
  rating: number,
  year: string,
  orderBy: string,
  page?: number,
};

export type SongsResponse = {
  songs: Song[];
  count: number;
  pageCount: number;
};