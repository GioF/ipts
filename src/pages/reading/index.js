import useIpfs from '../../hooks/useIpfs.js';
import {useEffect, useState} from 'react';
import React from 'react';

import Chapter from '../../components/chapter'

export default function Reading(){
  const { ipfs, ipfsState } = useIpfs()
  const [nodeInfo, setNodeInfo]  = useState()
  const [CID, setCID] = useState()
  const [formInput, setFormInput] = useState()

  function updateFolder(event){
    event.preventDefault()
    setCID(formInput)
  }

  useEffect(() => {
    if(ipfsState){
      ipfs.id().then(setNodeInfo)
        .catch(console.log)

      if(process.env.NODE_ENV === 'development'){
          ipfs.swarm.connect(process.env.REACT_APP_IPFS_MULTIADDR)
            .then(console.log('connected to dev node'))
            .catch(console.log)
      }
    }
  }, [ipfs, ipfsState])


  return(
    <>
      {ipfsState && nodeInfo ? `Node set with id ${nodeInfo.id}` : 'Node not set yet'}
      <form onSubmit={updateFolder}>
        <input type='text' placeholder='Insert folder CID' onChange={event => setFormInput(event.target.value)}/>
        <button type='submit'>Get files</button>
      </form>
      <Chapter ipfs={ipfs} cid={CID}/>
    </>
  )
}
