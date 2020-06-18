import React from "react";
import { useState, useEffect } from "react";
import Page from "../page";
import { Controller, Container } from "./styles";
import { modeType } from "../../../utils";

export default function Chapter({ cid, ipfs }) {
  const [controller] = useState(new AbortController());
  const [done, setDone] = useState(false);
  const [files, setFiles] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageData, setPageData] = useState({});
  const [mode, setMode] = useState();

  function incr() {
    setPageNumber(pageNumber < files.length - 1 ? pageNumber + 1 : pageNumber);
  }

  function decr() {
    setPageNumber(pageNumber > 0 ? pageNumber - 1 : 0);
  }

  useEffect(() => {
    //gets both translation and image IPFS objects if on scanlation mode
    //gets only image IPFS object if on imageOnly mode
    async function getPageData() {
      switch (mode) {
        case modeType.scanlation:
          let pair = [];
          for await (const item of ipfs.ls(files[pageNumber].cid, {
            signal: controller.signal,
          })) {
            pair = [...pair, item];
          }
          const image = pair.find((item) => item.name.includes("jpg"));
          const data = pair.find((item) => item.name.includes("json"));
          setPageData({ image, data });
          break;

        case modeType.imageOnly:
          ipfs.files
            .stat(`/ipfs/${files[pageNumber].cid}`)
            .then((image) => setPageData({ image }))
            .catch(console.log);
          break;

        default:
          alert(`Badly formatted mode: ${mode}`);
      }
    }

    if (done) {
      getPageData();
    }

    return function cleanup() {
      setPageData({});
    };
  }, [done, pageNumber]);

  useEffect(() => {
    //function checks given ipfs for folder info and sets
    //mode based on its structure
    //TODO: refactor for better clarity
    async function getFolderInfo() {
      let dirData = [];
      for await (const item of ipfs.ls(cid, { signal: controller.signal })) {
        dirData.push(item);
      }
      setFiles(dirData);
      if (dirData.length > 0) {
        const result = dirData.filter((file) => file.type === "dir");
        result.length > 0
          ? setMode(modeType.scanlation)
          : setMode(modeType.imageOnly);
      }
      setDone(true);
    }

    if (ipfs && cid) getFolderInfo();

    return function cleanup() {
      setFiles([]);
      if (!done) controller.abort();
      setPageNumber(0);
    };
  }, [ipfs, cid]);

  return (
    <Container>
      <Controller onClick={decr}>{"<"}</Controller>
      <Page mode={mode} ipfs={ipfs} {...pageData} />
      <Controller onClick={incr}>{">"}</Controller>
    </Container>
  );
}
