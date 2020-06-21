const SHA256 = require("crypto-js/sha256");
const { ec } = require("elliptic");
const EC = new ec("secp256k1");

module.exports = class Vote {
  constructor(info, voteTo) {
    this.info = info;
    this.voteTo = voteTo;
  }

  calculateHash() {
    return SHA256(this.info + this.voteTo).toString();
  }

  // signIn(privateKey) {
  //   const key = EC.keyFromPrivate(privateKey, "hex");
  //   if (key.getPublic("hex") !== this.from) throw "You cannot sign transactions from other wallets";

  //   const signature = key.sign(this.calculateHash(), "base64").toDER("hex");
  //   this.signature = signature;
  // }

  isValid() {
    // if (!this.signature || this.signature.length == 0)
    //   throw "This vote do not have signature";

    // const key = EC.keyFromPublic(this.from, "hex");
    // return key.verify(this.calculateHash(), this.signature);
    return true;
  }


  static clone(obj){
    const a = new Vote(); 
    Object.assign(a, obj)
    return a;
  }
};
