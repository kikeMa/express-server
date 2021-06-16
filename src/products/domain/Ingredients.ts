import { Uuid } from "../../shared/domain/value-object/Uuid";

export class Ingredients {
  id: Uuid;
  name: string;
  description: string;
  allergens: string[];


  constructor(
      id: Uuid,
      name: string,
      description: string,
      allergens: string[],
    ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.allergens = allergens
  }


  toPrimitives() {
    return {
       id: this.id.value,
       name: this.name,
       description: this.description,
       allergens: this.allergens,
    };
  }

   static fromPrimitives(data: { id: string; 
                                 name: string; 
                                 description: string; 
                                 allergens: string[]; 
                                }): Ingredients {
     return new Ingredients(
        new Uuid(data.id),
        data.name,
        data.description,
        data.allergens,
     );
   }
}
