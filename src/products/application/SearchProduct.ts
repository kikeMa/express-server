import { ProductNotExist } from "../domain/ProductNotExist";
import { ProductRepository } from "../domain/ProductRepository";
import { ProductResponse } from "./ProductResponse";

export class SearchProduct {
    constructor(private repository: ProductRepository) {}
  
    async run() {
      const product = await this.repository.search();
      if (!product) {
        throw new ProductNotExist();
      }
  
      return new ProductResponse(product.id.toString(), product.EAN );
    }
  }
  