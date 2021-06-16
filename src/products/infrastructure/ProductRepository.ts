import { Nullable } from '../../shared/domain/Nullable';
import { MongoRepository } from '../../shared/infrastructure/mongo/MongoRepository';
import { Product } from '../domain/Product';
import { ProductRepository } from '../domain/ProductRepository';

export class MongoProductRepository extends MongoRepository<Product> implements ProductRepository {
  public save(product: Product): Promise<void> {
    return this.persist(product.id.value, product);
  }

  public async search(): Promise<Nullable<Product>> {
    const collection = await this.collection();

    const document = await collection.findOne({});
    return document ? Product.fromPrimitives({ ...document, id: document._id }) : null  
  }

  protected moduleName(): string {
    return 'products';
  }
}
