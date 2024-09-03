import { Social } from "./common";
import Genre from "./genre";

type Artist = {
  _id: string;
  slug: string;
  name: string;
  rating: number;
  ratingCount: number;
  about?: string;
  genres: Genre[];
  isConfirmed: boolean;
  foundationYear: number;
  image: string;
  ratingOfRelevantUser?: number;
  country: string;
  social?: Social;
  createdAt: string;
  updatedAt: string;
};

export default Artist;