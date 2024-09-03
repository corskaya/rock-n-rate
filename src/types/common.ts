export type ErrorPayload = {
  message: string;
};

export type CommonTopic = {
  slug: string;
  name: string;
  image: string;
  year: number;
  type: Topic;
};

export enum Topic {
  Artist = "Artist",
  Album = "Album",
  Song = "Song"
}

export type Social = {
  spotify?: string;
  youtube?: string;
  instagram?: string;
};