import React from 'react';
import { useEffect, useState } from 'react';
import {Buffer} from 'buffer';
import {Box, Container} from './styles';


export default function Page({data, image, ipfs}){
  const [imgBuffer, setImgBuffer] = useState([])
  const [translation, setTranslation] = useState()
  const [controller] = useState(new AbortController())


  useEffect(() => {
    //starts to load image then translation from given cid into buffer and aborts  
    //via controller if component will unmout
    async function handleStream(){
      const signal = controller.signal
      for await(const chunk of ipfs.cat(image.cid, { signal })){
        setImgBuffer(oldBuff => [...oldBuff, chunk]) 
      }

      let textBuffer = []
      //will only begin loading translation data if component isn't unloading
      for await(const chunk of ipfs.cat(data.cid, { signal })){
        textBuffer = [...textBuffer, chunk]
      }
      setTranslation(JSON.parse(Buffer.concat(textBuffer).toString()))
    }

    if(ipfs && data) handleStream()

    return function cleanup () {
      controller.abort()
      setImgBuffer([])
    }
  }, [data, image, ipfs])

  return (
    <Container>
      <img src={`data:image/jpg;base64,${Buffer.concat(imgBuffer).toString('base64')}`}/>
      {translation ? translation.map( (props, index) => {
        return <Box key={index} { ...props } title={props.text} />
      }) : null}
    </Container>
  )
}
