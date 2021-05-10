export class ProductNotExist extends Error {
    constructor() {
      super('The product does not exists');
    }
  }
  