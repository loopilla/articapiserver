export interface Artwork {
  id: string,
  title: string,
  artist_display: Array<string>,
  thumbnail: Record<string, string | number>,
}

// This is the list of the needed fileds from the artic api
export const Fields = [
  'id',
  'title',
  'artist_display',
  'thumbnail',
];
