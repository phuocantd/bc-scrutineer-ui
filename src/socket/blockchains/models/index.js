const Block = require("../../blocks/models");

module.exports = class BlockChain {
  constructor() {
    this.chain = [this.getGenesisBlock()];
    this.pendingVotes = [];
  }
  

  getGenesisBlock() {
    return new Block(0, Date.parse("2020-01-01"), [], "0");
  }

  getLastedBlock() {
    return this.chain[this.chain.length - 1];
  }

  add(block) {
    this.chain.push(block);
  }

  addVote(vote) {
    if (!vote.info || !vote.voteTo) throw "Vote must include info and voteTo";
    // if (!vote.isValid()) throw "Cannot add invalid vote to block";
    this.pendingVotes.push(vote);
  }

  getPendingVotes() {
    let votes = [];
    for (const v of this.pendingVotes) {
      votes.push(v);
    }
    return votes;
  }

  getAllVotes() {
    let votes = [];
    for (const block of this.chain) {
      for (const v of block.votes) {
        votes.push(v);
      }
    }
    return votes;
  }

  isValidChain() {
    if (JSON.stringify(this.chain[0]) !== JSON.stringify(this.getGenesisBlock())) return false;
    for (let i = 1; i < this.chain.length - 1; i++) {
      const currentBlock =  Block.clone(this.chain[i]);
      const previousBlock = Block.clone(this.chain[i - 1]);
      
      if (!currentBlock.hasValidVotes()) return false;
      if (currentBlock.hash !== currentBlock.calculateHash()) return false;
      if (currentBlock.previousHash !== previousBlock.calculateHash()) return false;
    }
    return true;
  }

  updateLatestChain(latestChain) {
    this.chain = latestChain;
  }

  getLength() {
    return this.chain.length;
  }

  static clone(obj){
    const a = new BlockChain(); 
    Object.assign(a, obj)
    return a;
  }
};
