import useIpfs from '../../hooks/useIpfs.js';
import {useEffect, useState} from 'react';
import React from 'react';


export default function Reading(){
  const { ipfs, ipfsState } = useIpfs()
  const [data, setData] = useState({});

  console.log('rendered! ', ipfs)

  useEffect(() => {
    async function getNodeId() {
      console.log('nodeState:', ipfsState)
      if(ipfsState){
        ipfs.id().then(res => {console.log(res); setData(res)}).catch(err => console.log('error ocurred while getting node data: ', err))
      }
    }

    getNodeId()
  }, [ipfs, ipfsState])



  return(
    <>
    {ipfsState ? data.id : 'node not set yet'}
    </>
  )
}
