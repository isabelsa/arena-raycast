export type Block = {
  id: string;
  name: string;
  title: string;
  generated_title: string;
  content: string;
  source?: {
    title: string;
  };
  image: {
    square?: {
      url?: string;
    };
  };
};

export type Slug = {
  id: string;
};

export type Channel = {
  index: string;
  title: string;
  user: string;
  length: number;
  updated: string;
  follower_count: string;
  slug: string;
};

export type State = {
  searchText: string;
  items: Channel[];
};
