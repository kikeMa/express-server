import { Uuid } from "../../shared/domain/value-object/Uuid";

export class User {
    readonly id: Uuid;
    readonly email: string;
    readonly name: string;
    readonly lastName: string;
    readonly userName: string;
    readonly password: string;
    readonly isAdmin: boolean;
    readonly isDemo: boolean;
    readonly shop: Uuid;

    constructor (
        id: Uuid,
        email: string,
        name: string,
        lastName: string,
        userName: string,
        password: string,
        isAdmin: boolean,
        isDemo: boolean,
        shop: Uuid
    ) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.isAdmin = isAdmin;
        this.isDemo = isDemo;
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
            isAdmin: this.isAdmin,
            isDemo: this.isDemo,
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
            data.isAdmin,
            data.isDemo,
            new Uuid(data.shop)
        );
    }

}
  