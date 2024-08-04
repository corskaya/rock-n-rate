export type ErrorPayload = {
  message: string;
};

export type CommonTopic = {
  _id: string;
  name: string;
  image: string;
  year: number;
  type: Topic;
};

export enum Topic {
  Artist = 'artist',
  Album = 'album',
  Song = 'song,'
}