import Comment from "../../types/comment";
import { Topic } from "../../types/common";
import Country from "../../types/country";
import Album from "../../types/album";
import Song from "../../types/song";

export type CommentsResponse = {
  comments: Comment[];
};

export type CommentRequest = {
  topic: Topic;
  topicSlug: string;
  content: string;
};

export type ArtistOverview = {
  albumCount: number;
  songCount: number;
  ratingCount: number;
  country: Country;
  foundationYear: number;
  social?: {
    spotify?: string;
    youtube?: string;
    instagram?: string;
  };
  addedByUser: {
    username: string;
    avatar?: string;
  };
};

export type AlbumWithSongs = Album & {
  songs: Song[];
};