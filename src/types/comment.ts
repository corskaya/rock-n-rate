import { Topic } from "./common";

type Comment = {
  _id: string;
  username?: string;
  avatar?: string;
  topic: Topic;
  topicSlug: string;
  userId: string;
  content: string;
  likes: string[];
  likeCount: number;
  createdAt: string;
  updatedAt: string;
};

export default Comment;