interface CharacterCategory {
  available: number;
  collectionURI: string;
  items: [{ resourceURI: string; name: string; type?: string }];
  returned: number;
}

interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: { path: string; extension: string };
  resourceURI: string;
  comics: CharacterCategory;
  series: CharacterCategory;
  stories: CharacterCategory;
  events: CharacterCategory;
  urls: [{ type: string; url: string }];
  [index: string]:
    | CharacterCategory
    | string
    | number
    | Record<string, unknown>
    | Record<string, unknown>[];
}
