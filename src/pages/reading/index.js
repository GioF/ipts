import useIpfs from '../../hooks/useIpfs.js';
import {useEffect, useState} from 'react';
import React from 'react';


export default function Reading(){
  const { ipfs, ipfsState } = useIpfs()
  const [data, setData] = useState([])
  const [nodeInfo, setNodeInfo]  = useState()


  useEffect(() => {

    function getNodeId() {
      ipfs.id()
        .then(setNodeInfo)
        .catch(console.log);

    }
    if (ipfsState) getNodeId() 

  }, [ipfs, ipfsState])



  return(
    <>
    {ipfsState && nodeInfo ? `Node set with id ${nodeInfo.id}` : 'Node not set yet'}
    </>
  )
}
