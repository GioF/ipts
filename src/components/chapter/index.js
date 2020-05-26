import React from 'react';
import {useState, useEffect} from 'react';
import Page from '../page/';

export default function Chapter({cid, ipfs}){
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
      for await(const chunk of ipfs.ls(cid)){
        setFiles(oldList => [...oldList, chunk])
      }
    }

    if(ipfs) getFolderInfo()

  }, [ipfs])

  return(
    <>
      <Page ipfs={ipfs} cid={files[pageNumber] ? files[pageNumber].cid : null}/>
      <button onClick={decr}>{"<"}</button>{pageNumber}<button onClick={incr}>{">"}</button>
    </>
  )
}
