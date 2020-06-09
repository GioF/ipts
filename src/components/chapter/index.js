import React from 'react';
import {useState, useEffect} from 'react';
import Page from '../page/';

export default function Chapter({cid, ipfs}){
  const [controller] = useState(new AbortController())
  const [done, setDone] = useState(false)
  const [files, setFiles] = useState([])
  const [pageNumber, setPageNumber] = useState(0)

  function incr(){
    setPageNumber(pageNumber < files.length - 1 ? pageNumber + 1 : pageNumber)
  }

  function decr(){
    setPageNumber(pageNumber > 0 ? pageNumber - 1 : 0)
  }

  useEffect(() => {
    async function getFolderInfo(){
      for await(const item of ipfs.ls(cid, {signal: controller.signal})){
        setFiles(oldList => [...oldList, item])
      }
      setDone(true)
    }

    if(ipfs && cid) getFolderInfo()

    return function cleanup(){
      setFiles([])
      if(!done) controller.abort()
      setPageNumber(0)
    }
  }, [ipfs, cid])

  return(
    <>
      <Page ipfs={ipfs} cid={files[pageNumber] ? files[pageNumber].cid : null}/>
      <button onClick={decr}>{"<"}</button>{pageNumber}<button onClick={incr}>{">"}</button>
    </>
  )
}
