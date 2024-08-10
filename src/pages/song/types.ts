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