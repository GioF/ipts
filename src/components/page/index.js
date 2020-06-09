import React from 'react';
import { useEffect, useState } from 'react';
import {Buffer} from 'buffer';
import {Box, Container} from './styles';


export default function Page({cid, ipfs}){
  const [imgBuffer, setImgBuffer] = useState([])
  const [translation, setTranslation] = useState()
  const [controller] = useState(new AbortController())
  const [done, setDone] = useState(false)

  useEffect(() => {
    //starts to load image then translation from given cid into buffer and aborts  
    //via controller if component will unmout
    async function handleStream(){
      const signal = controller.signal
      for await(const chunk of ipfs.cat(cid, { signal })){
        setImgBuffer(oldBuff => [...oldBuff, chunk]) 
      }

      let textBuffer = []
      //will only begin loading translation data if component isn't unloading
      for await(const chunk of ipfs.cat(trCid, { signal })){
        textBuffer = [...textBuffer, chunk]
      }
      setTranslation(JSON.parse(Buffer.concat(textBuffer).toString()))
      setDone(true)
    }

    if(ipfs && cid) handleStream()

    return function cleanup () {
      if(!done) controller.abort()
      setImgBuffer([])
      setDone(false)
    }
  }, [cid, ipfs])

  return (
    <Container>
      <img src={`data:image/jpg;base64,${Buffer.concat(imgBuffer).toString('base64')}`}/>
      {translation ? translation.map( (props, index) => {
        return <Box key={index} { ...props } title={props.text} />
      }) : null}
    </Container>
  )
}
