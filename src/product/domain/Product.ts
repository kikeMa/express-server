import { Model } from "../../shared/domain/Model";
import { Uuid } from "../../shared/domain/value-object/Uuid";
import { Ingredients } from "./Ingredients";

export class Product extends Model {

  id: Uuid;
  EAN: string;
  brand: string;
  description: string;
  shops: Uuid[];
  ingredients: Ingredients[];


  constructor(
    id: Uuid,
    EAN: string,
    brand: string,
    description: string,
    shops: Uuid[],
    ingredients: Ingredients[]
  ) {
    super();
    this.id = id;
    this.EAN = EAN;
    this.brand = brand;
    this.description = description;
    this.shops = shops;
    this.ingredients = ingredients;
  }

   toPrimitives() {
     return {
      id: this.id.value,
      EAN: this.EAN,
      brand: this.brand,
      description: this.description,
      shops: this.shops.map(shop => shop.value),
      ingredients: this.ingredients.map(productDetail => productDetail.toPrimitives())
     };
   }

   static fromPrimitives(data: { id: string; EAN: string; brand: string; description: string; shops: string[]; ingredients: any[]; }): Product {
     return new Product(
       new Uuid(data.id),
       data.EAN,
       data.brand,
       data.description,
       data.shops.map( shop => new Uuid(shop)),
       data.ingredients.map( entry => Ingredients.fromPrimitives(entry))
     );
   }


}
