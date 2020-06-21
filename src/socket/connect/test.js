import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import BlockChain from "../blockchains/models";
import Block from "../blocks/models";
import {SOCKET_ENDPOINT} from '../../config';
const blockchain = new BlockChain();
var objCodec = require('object-encode');
const ENDPOINT = SOCKET_ENDPOINT;
console.log(ENDPOINT);
const check ={
  count:0,
  validCount: 0,
  isChecking: false
}

function Test() {
  const [sockets, setSockets] = useState();
  const updateChain = (chain)=>{
    const temp = [];
      for (var i = 0; i < chain.length; i++) {
        const block = new Block();
        Object.assign(block,chain[i]);
        temp.push(block);
      }
      blockchain.updateLatestChain(temp);  
  }
  const saveChain = () =>{
    const d = objCodec.encode(JSON.stringify(blockchain.chain), 'base64', 10);
    localStorage.setItem('block-chain-data', d);
  }

  useEffect(() => {
    const d = localStorage.getItem('block-chain-data');
    if (!!d) {
      const chain = JSON.parse(objCodec.decode(d, 'base64', 10));
      updateChain(chain);
    }
    const socket = socketIOClient(ENDPOINT);
    socket.on("CONNECT", data => {
      console.log(data);
      setSockets(data.sockets);
      socket.emit('COMPARE LATEST BLOCK',blockchain.getLastedBlock());
      console.log(blockchain.chain);
    });
    socket.on('NEW BLOCK', (block) => {
      console.log(block);
      blockchain.add(block);
      saveChain();
    });

    socket.on('SV REQUEST CHAIN', ()=>{
      socket.emit('CL SEND CHAIN', blockchain);;
    })



    socket.on('COMPARE LATEST BLOCK', (data)=>{
      console.log('COMPARE LATEST BLOCK');
      socket.emit('RESULT COMPARE LATEST BLOCK',{idSocket:data.idSocket,block:data.block,result:data.block.hash===blockchain.hash});
    })


    socket.on('COMPARE CHAIN', (idSocket,bChain)=>{
      console.log('COMPARE CHAIN');
      socket.emit('RESULT COMPARE CHAIN',{idSocket,blockchain:bChain,result:compareChain(bChain,blockchain)});
    })

    socket.on('RESULT COMPARE LATEST BLOCK',(data)=>{
      console.log('RESULT COMPARE LATEST BLOCK');
      console.log(data);
      console.log(data.result);
      check.count++;
      if(check.isChecking) check.validCount++;
      if(sockets.length * 0.5 < (check.count - check.validCount)){
        socket.emit('CL REQUEST CHAIN');
        check.isChecking = false;
        check.count = 0;
        check.validCount = 0;
      }
    })

    socket.on('RESULT COMPARE CHAIN',(socketId,bchain, result)=>{
      if(sockets.length ===2 && blockchain.getLength()>bchain.getLength()){
         updateChain(bchain.chain);
          return;
      }
      check.count++;
      if(check.isChecking) check.validCount++;
      if(sockets.length * 0.5 < (check.count - check.validCount)){
        check.isChecking = false;
        socket.emit('CL REQUEST CHAIN');
        check.count = 0;
        check.validCount = 0;
      }
      if(sockets.length * 0.49 < check.validCount) updateChain(blockchain.chain);
    })

    socket.on('SV SEND CHAIN', bChain=>{
      socket.emit('COMPARE CHAIN', bChain);
    })

    function compareChain(bChain,blockchain){
      if(bChain.getLength() < blockchain.getLength()) return false;
      if(!bChain.isValid()) return false;
      for(var i =0;i<blockchain.getLength();i++)
        if(bChain.chain[i].calculateHash() !== blockchain.chain[i].calculateHash()) return false;
      return true;
    }
    
  }, []);

  return (
    <p>
      POA networks
    </p>
  );
}

export default Test;