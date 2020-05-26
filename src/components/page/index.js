import React from 'react';
import { useEffect, useState } from 'react';
import {Buffer} from 'buffer';


export default function Page({cid, ipfs}){
  const [imgBuffer, setImgBuffer] = useState([])
  const [controller] = useState(new AbortController())
  const [done, setDone] = useState(false)

  useEffect(() => {
    //starts to load image from given cid into buffer and aborts  
    //via controller if component will unmout
    async function handleStream(){
      for await(const chunk of ipfs.cat(cid, {signal: controller.signal})){
        setImgBuffer(oldBuff => [...oldBuff, chunk]) 
      }
      setDone(true)
    }

    if(ipfs && cid) handleStream()

    return function cleanup () {
      if(!done) controller.abort()
      setImgBuffer([])
      setDone(false)
    }
  }, [cid, ipfs])

  return (//just returns image for now, will probably integrate translations later
    <>
    <img src={`data:image/jpg;base64,${Buffer.concat(imgBuffer).toString('base64')}`}/>
    </>
  )
}
