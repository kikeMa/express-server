import { Express } from 'express';
import { ProductsGetController } from '../controllers/ProductsGetController';
import { ProductsInsertController } from '../controllers/ProductsInsertController';
import { AuthValidation } from '../shared/domain/AuthValidation';
import AuthValidationJWT from '../shared/infrastructure/AuthValidationJWT';


export const register = (app: Express) => {

  const verifyAdmin: AuthValidation = new AuthValidationJWT();

  const productsGetController: ProductsGetController = new ProductsGetController();
  app.get('/product', verifyAdmin.verifyAdmin, productsGetController.run.bind(productsGetController));
  
  const productsInsertController: ProductsInsertController = new ProductsInsertController();
  app.get('/product-insert', productsInsertController.run.bind(productsInsertController));
};