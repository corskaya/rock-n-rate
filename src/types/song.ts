import Genre from "./genre";

type Song = {
  _id: string;
  slug: string;
  name: string;
  rating: number;
  ratingCount: number;
  about?: string;
  genres: Genre[];
  artistRefSlug: string;
  artistRefName: string;
  albumRefSlug: string;
  albumRefName: string;
  isConfirmed: boolean;
  releaseDate: string;
  image: string;
  ratingOfRelevantUser?: number;
  createdAt: string;
  updatedAt: string;
};

export default Song;