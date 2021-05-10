import { User } from './User';

export interface UserRepository {
  search(): Promise<User>;
  save(user: User): Promise<void>;
}
