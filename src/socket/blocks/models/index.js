const SHA256 = require("crypto-js/sha256");
const Vote = require("../../votes/models");

module.exports = class Block {
  constructor(index, timestamp, votes, previousHash = "", scrutineer) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.votes = votes;
    this.scrutineer = scrutineer;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index + this.previousHash + this.timestamp + this.votes + this.scrutineer
    ).toString();
  }

  hasValidVotes() {
    for (const v of this.votes){
      const a = Vote.clone(v);
      if (!a.isValid()) return false;
    } 
    return true;
  }

  static clone(obj){
    const a = new Block(); 
    Object.assign(a, obj)
    return a;
  }
};
