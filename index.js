const crypto = require('crypto');  // Correct crypto import
const { get } = require('http');

class Block {
    constructor(index, timestamp, data, prevHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.computeHash();
        this.nonce = 0; 
    }

    computeHash() {
        return crypto
            .createHash('sha256')
            .update(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce)
            .digest('hex');  // Correct hash calculation
    }

    proofOfWork(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.computeHash();
        }
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.startGenesisBlock()];
        this.difficulty = 4;
    }

    startGenesisBlock() {
        return new Block(0, "05/11/24", "Vansh made the first block of this chain", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addNewBlock(newBlock) {
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.proofOfWork(this.difficulty);
        this.chain.push(newBlock);
    }

    checkChainValidity() {
        for (let i = 1; i < this.chain.length; i++) {
            const currBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            if (currBlock.hash !== currBlock.computeHash() || currBlock.prevHash !== prevBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

// Testing the code
const date = new Date();
let webbites = new Blockchain();

webbites.addNewBlock(new Block(1, date.toDateString(), { "name": "Vansh", "age": 20 }));
webbites.addNewBlock(new Block(2, "05/11/24", { "name": "Manguu", "age": 79 }));
let index = 3;
function addBlock(data){
    // console.log(data)
    // data = data.toString();
    webbites.addNewBlock(new Block(index, date.toDateString(), data));
    index++;
}

// checking fxn addblock
// addBlock("hello")

console.log(JSON.stringify(webbites, null, 4));

function getLatestBlock(){
    console.log(webbites.getLatestBlock())
    return webbites.getLatestBlock();

}

function checkChainValidity(){
if (webbites.checkChainValidity()) {
    return true
} else {
    return false
}
}

function getAllBlocks(){
    return webbites.chain
}

module.exports = {webbites , checkChainValidity , getLatestBlock , addBlock , getAllBlocks}