import { Repository } from '../models/repository.model';

export function sortRepositories(repos: Repository[]): Repository[] {
  return repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
}
