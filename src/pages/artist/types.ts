import Comment from "../../types/comment";
import { Topic } from "../../types/common";
import Country from "../../types/country";

export type CommentsResponse = {
  comments: Comment[];
};

export type CommentRequest = {
  topic: Topic;
  topicId: string;
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