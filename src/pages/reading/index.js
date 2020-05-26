import useIpfs from '../../hooks/useIpfs.js';
import {useEffect, useState} from 'react';
import React from 'react';


export default function Reading(){
  const { ipfs, ipfsState } = useIpfs()
  const [data, setData] = useState([])
  const [nodeInfo, setNodeInfo]  = useState()
  const [topic, setTopic] = useState('')


  async function setupListener(event){
    event.preventDefault()
    
    ipfs.pubsub.subscribe(topic, msg => {
      console.log(msg)
      setData(oldData => [ ...oldData, msg.data.toString()])
    })
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

    <form onSubmit={setupListener}>
      <label htmlFor='topicForm'>Tópico</label>
      <input 
        id='topicForm'
        type='text'
        placeholder='legosi feet pics'
        onChange={event => setTopic(event.target.value)}
      />
      <button type='submit'>Inscrever</button>
    </form>
    {data.map((msg,index) => {
      if( index === data.length - 1 ) return (
        <>
        <h3>Nova mensagem!</h3>
        <p>{msg}</p>
        </>
      )

      return (
        <p>{msg}</p>
      )
    })}
    </>
  )
}
