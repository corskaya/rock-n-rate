import Genre from "./genre";

type Album = {
  _id: string;
  name: string;
  rating: number;
  ratingCount: number;
  about?: string;
  genres: Genre[];
  artistRefObjectId: string;
  artistRefName: string;
  isConfirmed: boolean;
  isComplete: boolean;
  releaseDate: string;
  image: string;
  ratingOfRelevantUser?: number;
  createdAt: string;
  updatedAt: string;
};

export default Album;