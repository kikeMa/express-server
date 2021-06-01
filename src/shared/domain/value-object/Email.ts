import { InvalidArgumentError } from "./InvalidArgumentError";
import { validate } from "email-validator";

export class Email {
    readonly value: string;
  
    constructor(value: string) {
      this.ensureIsValidEmail(value);
  
      this.value = value;
    }
  
    private ensureIsValidEmail(email: string): void {
      if (!validate(email)) {
        throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${email}>`);
      }
    }
  
    toString(): string {
      return this.value;
    }
  }
  