import { Request, Response } from 'express';
import httpStatus from 'http-status';
// import { SearchProduct } from '../product/application/SearchProduct';
import { Product } from '../products/domain/Product';
import { Ingredients } from '../products/domain/Ingredients';
import { ProductNotExist } from '../products/domain/ProductNotExist';
import { MongoProductRepository } from '../products/infrastructure/ProductRepository';
import { Uuid } from '../shared/domain/value-object/Uuid';
import { MongoClientFactory } from '../shared/infrastructure/mongo/MongoClientFactory';
import { Controller } from './Controller';

export class ProductsInsertController implements Controller {
  
  // private searchProduct: SearchProduct
  private productRepository: MongoProductRepository;

  constructor() {
    this.productRepository = new MongoProductRepository(MongoClientFactory.createClient("mooc", MongoClientFactory.createConfig()));
    // this.searchProduct = new SearchProduct(productRepository)
  }

  async run(req: Request, res: Response): Promise<void> {
    try {
      
      const product = new Product(Uuid.random(), "324564", "marca", "description", [Uuid.random()], [new Ingredients(Uuid.random(), "name", "description", ["aller1", "aller2"], )]);
      await this.productRepository.save(product)
      res.status(httpStatus.OK).json(product);
    } catch (e) {
      if (e instanceof ProductNotExist) {
        res.status(httpStatus.NOT_FOUND).send();
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  }
}
