export class LoginNotCorrect extends Error {
    constructor() {
      super('User or password is incorrect');
    }
  }
  