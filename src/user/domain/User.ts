import { Uuid } from "../../shared/domain/value-object/Uuid";

export class User {
    readonly id: Uuid;
    readonly email: string;
    readonly name: string;
    readonly lastName: string;
    readonly userName: string;
    readonly password: string;
    readonly shop: Uuid;
    
    constructor (
      id: Uuid,
      email: string,
      name: string,
      lastName: string,
      userName: string,
      password: string,
      shop: Uuid
    ) {
      this.id = id;
      this.email = email;
      this.name = name;
      this.lastName = lastName;
      this.userName = userName;
      this.password = password;
      this.shop = shop;
    }

    toPrimitives() {
      return {
       id: this.id.value,
       email: this.email,
       name: this.name,
       lastName: this.lastName,
       userName: this.userName,
       password: this.password,
       shop: this.shop.value,
      };
    }
 
    static fromPrimitives(data: { id: string; email: string; name: string; lastName: string; userName: string; password: string; shop: string; isAdmin: boolean; isDemo: boolean  }): User {
      return new User(
        new Uuid(data.id),
        data.email,
        data.name,
        data.lastName,
        data.userName,
        data.password,
        new Uuid(data.shop)
      );
    }

  }
  