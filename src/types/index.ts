export type PostType = {
  title: string;
  description: string;
  media_url: string;
  profile_pic: string;
  created_at: string;
  id: number;
  name: string;
  user_id: number;
  likes: number[];
};

export type CommentType = {
  id: number;
  created_at: string;
  post_id: string;
  profile_pic: string;
  content: string;
  user_id: number;
  name: string;
};

export type UserType = {
  id: number;
  name: string;
  username: string;
  profile_pic: string;
  followers: number;
  following: number;
};
