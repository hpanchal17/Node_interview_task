import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class HashService {
  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt();
    return hash(data, salt);
  }

  compare(passwod: string | Buffer, encrypted: string): Promise<boolean> {
    return compare(passwod, encrypted);
  }
}
