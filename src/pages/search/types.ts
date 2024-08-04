import { CommonTopic } from "../../types/common";

export type SearchResponse = {
  result: CommonTopic[];
};

export type SearchRequest = {
  searchTerm: string;
  limit?: number;
};