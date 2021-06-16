import { ProductNotExist } from "../domain/ProductNotExist";
import { ProductRepository } from "../domain/ProductRepository";

export class SearchAllProducts {
    constructor(private repository: ProductRepository) {}
  
    async run() {
      const counter = await this.repository.search();
      if (!counter) {
        throw new ProductNotExist();
      }
  
      return counter;
    }
  }
  