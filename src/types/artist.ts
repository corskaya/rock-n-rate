import Genre from "./genre";

type Artist = {
  _id: string;
  name: string;
  rating: number;
  ratingCount: number;
  about?: string;
  genres: Genre[];
  isConfirmed: boolean;
  foundationYear: number;
  image: string;
  ratingOfRelevantUser?: number;
  createdAt: string;
  updatedAt: string;
};

export default Artist;