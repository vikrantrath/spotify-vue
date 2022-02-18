export type Track = {
    _id: string,
    name: string,
    year: number | null,
    artist: string | null,
    album: string | null,
    duration_s: number,
    imageUri: string,
    type: string,
    uri: string
};

export type Album = {
    type: string,
    _id: string,
    name: string,
    year: number,
    total_tracks: number,
    description: string,
    imageUri: string,
    tracks: Track[]
};

export type PlayList = Album[]