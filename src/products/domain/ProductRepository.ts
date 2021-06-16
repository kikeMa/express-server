import { Nullable } from '../../shared/domain/Nullable';
import { Product } from './Product';

export interface ProductRepository {
  search(): Promise<Nullable<Product>>;
  save(product: Product): Promise<void>;
}
