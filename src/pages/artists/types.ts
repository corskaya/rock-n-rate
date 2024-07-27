import Artist from "../../types/artist";
import Genre from "../../types/genre";

export type ArtistFilter = {
  searchTerm: string;
  genre: Genre,
  rating: number,
  year: string,
  orderBy: string,
  page?: number,
};

export type ArtistsResponse = {
  artists: Artist[];
  count: number;
  pageCount: number;
};