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

export type SongOverview = {
  artist: {
    name: string;
    slug: string;
  };
  album: {
    name: string;
    slug: string;
  };
  ratingCount: number;
  releaseDate: string;
  addedByUser: {
    username: string;
    avatar?: string;
  };
};