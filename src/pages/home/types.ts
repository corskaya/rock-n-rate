import Album from "../../types/album";
import Artist from "../../types/artist";
import Song from "../../types/song";

export type PopularArtistsResponse = {
  mostRatedArtists: Artist[];
};

export type PopularAlbumsResponse = {
  mostRatedAlbums: Album[];
};

export type PopularSongsResponse = {
  mostRatedSongs: Song[];
};