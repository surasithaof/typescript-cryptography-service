import * as CryptoJS from 'crypto-js';

export class CryptographyService {
  private keySize = 256;
  private ivSize = 128;
  private iterations = 100;

  private keyAES: string;
  private keyCustomeAES: string;
  private ivCustomeAES: string;

  // for Caesar cipher
  private shift: number = 3;

  constructor() {}

  set key(key) {
    this.keyAES = key;
  }
  set keyCustom(key) {
    this.keyCustomeAES = key;
  }
  set ivCustom(iv) {
    this.ivCustomeAES = iv;
  }

  get key() {
    return this.keyAES;
  }
  get keyCustom() {
    return this.keyCustomeAES;
  }
  get ivCustom() {
    return this.ivCustomeAES;
  }

  gererateHash() {
    return CryptoJS.lib.WordArray.random(128 / 8).toString();
  }

  gererateKeyAndIV(pass = null) {
    if (pass == null) {
      pass = CryptoJS.lib.WordArray.random(128 / 8);
    }
    this.gererateKey(pass);
    this.gererateIV();
  }

  gererateKey(pass = null) {
    var salt = CryptoJS.lib.WordArray.random(128 / 8);
    if (pass == null) {
      pass = CryptoJS.lib.WordArray.random(128 / 8);
    }
    var key = CryptoJS.PBKDF2(pass, salt, {
      keySize: this.keySize / 32,
      iterations: this.iterations
    });
    this.key = key.toString().toUpperCase();
    this.keyCustomeAES = key.toString().toUpperCase();
  }

  gererateIV() {
    this.ivCustomeAES = CryptoJS.lib.WordArray.random(this.ivSize / 8)
      .toString()
      .toUpperCase();
  }

  // Caesar cipher
  encipher(text, shift = this.shift) {
    var result = '';

    //loop through each caharacter in the text
    for (var i = 0; i < text.length; i++) {
      //get the character code of each letter
      var c = text.charCodeAt(i);

      // handle uppercase letters
      if (c >= 65 && c <= 90) {
        result += String.fromCharCode(((c - 65 + shift) % 26) + 65);

        // handle lowercase letters
      } else if (c >= 97 && c <= 122) {
        result += String.fromCharCode(((c - 97 + shift) % 26) + 97);

        // its not a letter, let it through
      } else {
        result += text.charAt(i);
      }
    }
    return result;
  }

  decipher(text, shift = this.shift) {
    var result = '';
    shift = (26 - shift) % 26;
    result = this.encipher(text, shift);
    return result;
  }

  // Hex to Base64
  hexToBase64(str) {
    return btoa(
      String.fromCharCode.apply(
        null,
        str
          .replace(/\r|\n/g, '')
          .replace(/([\da-fA-F]{2}) ?/g, '0x$1 ')
          .replace(/ +$/, '')
          .split(' ')
      )
    );
  }

  // Base64 to Hex
  base64ToHex(str) {
    for (
      var i = 0, bin = atob(str.replace(/[ \r\n]+$/, '')), hex = [];
      i < bin.length;
      ++i
    ) {
      let tmp = bin.charCodeAt(i).toString(16);
      if (tmp.length === 1) tmp = '0' + tmp;
      hex[hex.length] = tmp;
    }
    return hex.join('').toUpperCase();
  }

  encryptAES128(plainText) {
    var key = CryptoJS.enc.Utf8.parse(this.keyAES);
    var iv = CryptoJS.enc.Utf8.parse(this.keyAES);
    var encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(plainText),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );

    return encrypted.toString();
  }

  decryptAES128(cipherText) {
    var key = CryptoJS.enc.Utf8.parse(this.keyAES);
    var iv = CryptoJS.enc.Utf8.parse(this.keyAES);
    var decrypted = CryptoJS.AES.decrypt(cipherText, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  encryptCustomAES128(plainText) {
    var plainText = CryptoJS.enc.Utf16LE.parse(plainText);
    // var byteVal;
    // var byteValIv;
    // var strKey = "";
    // var strIv = "";
    // var byteArrKey = [2, 67, 187, 210, 247, 53, 18, 223,
    //          74, 22, 54, 99, 210, 220, 22, 208,
    //          4, 248, 102, 212, 9, 44, 135, 244,
    //          180, 176, 237, 213, 233, 149, 67, 86];
    // var byteArrIV = [74, 22, 54, 99, 210, 220, 22, 208,
    //     219, 121, 54, 221, 33, 120, 72, 186];
    // for (var i = 0; i < byteArrKey.length; i++) {
    //     byteVal = byteArrKey[i];
    //     if (byteVal < 16) { strKey += "0"; }
    //     strKey += byteVal.toString(16);
    // };
    // for (var i = 0; i < byteArrIV.length; i++) {
    //     byteValIv = byteArrIV[i];
    //     if (byteValIv < 16) { strIv += "0"; }
    //     strIv += byteValIv.toString(16);
    // };
    var key = CryptoJS.enc.Hex.parse(this.keyCustomeAES);
    var iv = CryptoJS.enc.Hex.parse(this.ivCustomeAES);
    var encrypted = CryptoJS.AES.encrypt(plainText, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  decryptCustomAES128(cipherText) {
    var key = CryptoJS.enc.Hex.parse(this.keyCustomeAES);
    var iv = CryptoJS.enc.Hex.parse(this.ivCustomeAES);

    var decrypted = CryptoJS.AES.decrypt(cipherText, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf16LE);
  }
}
