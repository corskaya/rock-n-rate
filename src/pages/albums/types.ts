import Album from "../../types/album";
import Genre from "../../types/genre";

export type AlbumFilter = {
  searchTerm: string;
  genre: Genre,
  rating: number,
  year: string,
  orderBy: string,
  page?: number,
};

export type AlbumsResponse = {
  albums: Album[];
  count: number;
  pageCount: number;
};