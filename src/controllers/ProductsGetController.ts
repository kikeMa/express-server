import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { SearchProduct } from '../product/application/SearchProduct';
import { ProductNotExist } from '../product/domain/ProductNotExist';
import { MongoProductRepository } from '../product/infrastructure/ProductRepository';
import { MongoClientFactory } from '../shared/infrastructure/mongo/MongoClientFactory';
import { Controller } from './Controller';

export class ProductsGetController implements Controller {
  
  private searchProduct: SearchProduct

  constructor() {
    const productRepository = new MongoProductRepository(MongoClientFactory.createClient("mooc", MongoClientFactory.createConfig()));
    this.searchProduct = new SearchProduct(productRepository)
  }

  async run(req: Request, res: Response): Promise<void> {
    try {
      const product = await this.searchProduct.run();
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
