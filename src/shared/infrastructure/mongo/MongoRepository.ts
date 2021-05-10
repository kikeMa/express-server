import { Collection, MongoClient } from 'mongodb';
import { Model } from '../../domain/Model';

export abstract class MongoRepository<T extends Model> {
  constructor(private _client: Promise<MongoClient>) {}

  protected abstract moduleName(): string;

  protected client(): Promise<MongoClient> {
    return this._client;
  }

  protected async collection(): Promise<Collection> {
    return (await this._client).db().collection(this.moduleName());
  }

  protected async persist(id: string, doc: T): Promise<void> {
    const collection = await this.collection();

    const document = { ...doc.toPrimitives(), _id: id, id: undefined };

    await collection.updateOne({ _id: id }, { $set: document }, { upsert: true });
  }
}
