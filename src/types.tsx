export type Block = {
  id: string;
  name: string;
  title: string;
  generated_title: string;
  content: string;
  created_at: string;
  commentCount: string;
  description: string;
  source?: {
    title: string;
    url: string;
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
  updated_at: string;
  follower_count: string;
  slug: string;
  open: boolean;
};

export type State = {
  searchText: string;
  items: Channel[];
};
