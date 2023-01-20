// Import stylesheets
import './style.css';

// Write TypeScript code!
import { CryptographyService } from './securityService.ts';
import { Buffer } from 'buffer';

const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>Cryptography service</h1>`;

const appHash: HTMLElement = document.getElementById('hash');
const appKey: HTMLElement = document.getElementById('key');
const appKeyCustom: HTMLElement = document.getElementById('keyCustom');
const appIVCustom: HTMLElement = document.getElementById('ivCustom');
const appPlaintext: HTMLElement = document.getElementById('plaintext');
const appEncrypted: HTMLElement = document.getElementById('encrypted');
const appDecrypted: HTMLElement = document.getElementById('decrypted');

const securityService = new CryptographyService();
appHash.append(securityService.generateHash());

securityService.generateKeyAndIV();
// Key from API
securityService.key = '134CD3EC1746CA71';
appKey.append(securityService.key);
appKeyCustom.append(securityService.keyCustomeAES);
appIVCustom.append(securityService.ivCustomeAES);
let plainText = '1234';

appPlaintext.append(plainText);
let encrypted = securityService.encryptAES128(plainText);
appEncrypted.append(encrypted);
let decrypted = securityService.decryptAES128(encrypted);
appDecrypted.append(decrypted);

// getKey from API
// const base64Key = 'XwhuAlnxf5A=';
// const buffer = Buffer.from(base64Key, 'base64');
// const bufString = buffer.toString('hex');
// console.log("bufString : ", bufString);
// let a = securityService.hexToBase64(bufString)
// console.log("a : ", a);
// let b = securityService.base64ToHex(a)
// console.log("b : ", b);

// let c = '2709FB0EA7DF9EB9882D3146E214A298F3E160C1A3D2B42BB3B611D2CF3177A4';
// let a = securityService.base64ToHex(base64Key);
// appKey.append(a);

// console.log(securityService.key);
// securityService.key = a;
// console.log(securityService.key);
// console.log(c === a);
// console.log(securityService.hexToBase64(a));
