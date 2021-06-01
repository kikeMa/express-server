export class LoginResponse {
    readonly email: string;
    readonly shop: string;
    readonly token: string;
  
    constructor(email: string, shop: string, token: string) {
      this.email = email;
      this.shop = shop;
      this.token = token;
    }
  }
  