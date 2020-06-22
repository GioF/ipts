import React, { useState, useEffect, useRef } from "react";
import Page from "../page";
import { Controller, Container } from "./styles";
import { modeType } from "../../../utils";
import usePageController from "../../../hooks/usePageController";

export default function Chapter({ cid, ipfs }) {
  const controller = useRef(new AbortController());
  const [done, setDone] = useState(false);
  const [files, setFiles] = useState([]);
  const [page, setPage, setPageByEvent] = usePageController(0, files.length);
  const [pageData, setPageData] = useState({});
  const [mode, setMode] = useState();

  useEffect(() => {
    document.addEventListener("keydown", setPageByEvent);
    return () => {
      document.removeEventListener("keydown", setPageByEvent);
    };
  }, [files, setPageByEvent]);

  useEffect(() => {
    //gets both translation and image IPFS objects if on scanlation mode
    //gets only image IPFS object if on imageOnly mode
    async function getPageData() {
      switch (mode) {
        case modeType.scanlation:
          let pair = [];
          for await (const item of ipfs.ls(files[page].cid, {
            signal: controller.current.signal,
          })) {
            pair = [...pair, item];
          }
          const image = pair.find((item) => item.name.includes("jpg"));
          const data = pair.find((item) => item.name.includes("json"));
          setPageData({ image, data });
          break;

        case modeType.imageOnly:
          ipfs.files
            .stat(`/ipfs/${files[page].cid}`)
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

    const abortControllerRef = controller.current;
    return function cleanup() {
      abortControllerRef.abort();
      setPageData({});
    };
  }, [done, page, mode, ipfs, files]);

  useEffect(() => {
    //function checks given ipfs for folder info and sets
    //mode based on its structure
    //TODO: refactor for better clarity
    async function getFolderInfo() {
      let dirData = [];
      for await (const item of ipfs.ls(cid, {
        signal: controller.current.signal,
      })) {
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

    const abortControllerRef = controller.current;

    return function cleanup() {
      abortControllerRef.abort();
      setFiles([]);
    };
  }, [ipfs, cid]);

  return (
    <Container>
      <Controller onClick={() => setPage(-1)}>{"<"}</Controller>
      <Page mode={mode} ipfs={ipfs} {...pageData} />
      <Controller style={{ right: "300px" }} onClick={() => setPage(+1)}>
        {">"}
      </Controller>
    </Container>
  );
}
