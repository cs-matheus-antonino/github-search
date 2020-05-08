import { Repository } from './repository.model';

export interface User {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  company: string;
  location: string;
  public_repos: number;
  followers: number;
  repos: Repository[];
}
