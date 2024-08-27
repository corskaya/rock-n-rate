import Comment from "../../types/comment";
import { Topic } from "../../types/common";

export type CommentsResponse = {
  comments: Comment[];
};

export type CommentRequest = {
  topic: Topic;
  topicId: string;
  content: string;
};

export type SongOverview = {
  artist: {
    name: string;
    _id: string;
  };
  album: {
    name: string;
    _id: string;
  };
  ratingCount: number;
  releaseDate: string;
  addedByUser: {
    username: string;
    avatar?: string;
  };
};