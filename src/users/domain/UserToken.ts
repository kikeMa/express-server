import { Uuid } from "../../shared/domain/value-object/Uuid";

export class UserToken {
    readonly id: Uuid;
    readonly isAdmin: boolean;
    readonly isDemo: boolean;
  
    constructor(id: Uuid, isAdmin: boolean, isDemo: boolean ) {
      this.id = id;
      this.isAdmin = isAdmin;
      this.isDemo = isDemo;
    }

    
    // static fromObject(data: Object): UserToken {
    //     data = Object.assign({}, this);

    //     return new UserToken(
    //       new Uuid(data.id),
    //       data.isAdmin,
    //       data.isDemo
    //     );
    //   }

  }
  