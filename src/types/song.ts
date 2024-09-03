import Genre from "./genre";

type Song = {
  _id: string;
  slug: string;
  name: string;
  rating: number;
  ratingCount: number;
  about?: string;
  genres: Genre[];
  artistRefObjectId: string;
  artistRefSlug: string;
  artistRefName: string;
  albumRefObjectId: string;
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