import * as CryptoJS from 'crypto-js';
import { Observable, Subscription } from 'rxjs';

const encrypt = (data: string, key: string): string => {
  return CryptoJS.AES.encrypt(data, key).toString();
}

const decrypt = (data: string, key: string): string => {
  const valueDecrypt = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
  return valueDecrypt;
}

export class Util {
  constructor() { }

  sendEncrypt(clave: string, key: string) {
    return encrypt(clave, key);
  }

  getDecrypt(clave: string, key: string) {
    return decrypt(clave, key);
  }
}
