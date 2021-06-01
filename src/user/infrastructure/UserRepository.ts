import { Nullable } from '../../shared/domain/Nullable';
import { MongoRepository } from '../../shared/infrastructure/mongo/MongoRepository';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  public save(user: User): Promise<void> {
    return this.persist(user.id.value, user);
  }

  public async search(email: string): Promise<Nullable<User>> {
    const collection = await this.collection();
    const document = await collection.findOne({email: email});
    return document ? User.fromPrimitives({ ...document, id: document._id }) : null  
  }

  protected moduleName(): string {
    return 'users';
  }
}
