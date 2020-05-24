import Ipfs from 'ipfs';
import { useState, useEffect } from 'react';

let ipfs = null


export default function useIpfs(){
  const [ipfsState, setIpfsState] = useState(Boolean(ipfs))

  useEffect(() => {
    async function startIpfs () {
      if (ipfs) {
        console.log('IPFS already started')
      } else if (window.ipfs && window.ipfs.enable) {
        console.log('Found window.ipfs')
        ipfs = await window.ipfs.enable({ commands: ['id'] })
      } else {
        try {
          console.time('IPFS Started')
          ipfs = await Ipfs.create()
          console.timeEnd('IPFS Started')
        } catch (error) {
          console.error('IPFS init error:', error)
          ipfs = null
        }
      }

      setIpfsState(Boolean(ipfs))
    }

    startIpfs()
    return function cleanup () {
      if (ipfs && ipfs.stop) {
        console.log('Stopping IPFS')
        ipfs.stop().catch(err => console.error(err))
        ipfs = null
        setIpfsState(false)
      }
    }
  }, [])
    
  console.log('rendered ipfs node! returning state: ', ipfsState)
  return { ipfs, ipfsState }
}
