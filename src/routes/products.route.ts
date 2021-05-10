import { Express } from 'express';
import { ProductsGetController } from '../controllers/ProductsGetController';
import { ProductsInsertController } from '../controllers/ProductsInsertController';

export const register = (app: Express) => {
  const productsGetController: ProductsGetController = new ProductsGetController();
  app.get('/product', productsGetController.run.bind(productsGetController));
  
  const productsInsertController: ProductsInsertController = new ProductsInsertController();
  app.get('/product-insert', productsInsertController.run.bind(productsInsertController));
};