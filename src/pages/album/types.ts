import Comment from "../../types/comment";
import { Topic } from "../../types/common";

export type CommentsResponse = {
  comments: Comment[];
};

export type CommentRequest = {
  topic: Topic;
  topicSlug: string;
  content: string;
};

export type AlbumOverview = {
  artist: {
    name: string;
    slug: string;
  };
  songCount: number;
  ratingCount: number;
  releaseDate: string;
  addedByUser: {
    username: string;
    avatar?: string;
  };
};