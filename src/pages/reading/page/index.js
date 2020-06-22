import ReactLoading from "react-loading";
import React, { useEffect, useState, useRef } from "react";
import { Buffer } from "buffer";
import { Box, Container } from "./styles";
import { modeType } from "../../../utils";

export default function Page({ data, image, ipfs, mode }) {
  const [imgBuffer, setImgBuffer] = useState([]);
  const [translation, setTranslation] = useState();
  const controller = useRef(new AbortController());

  useEffect(() => {
    //starts to load image then translation from given cid into buffer and aborts
    //via controller if component will unmout
    async function handleStream() {
      const signal = controller.signal;
      for await (const chunk of ipfs.cat(image.cid, { signal })) {
        setImgBuffer((oldBuff) => [...oldBuff, chunk]);
      }

      if (mode === modeType.scanlation) {
        let textBuffer = [];
        //will only begin loading translation data if component isn't unloading
        for await (const chunk of ipfs.cat(data.cid, { signal })) {
          textBuffer = [...textBuffer, chunk];
        }
        setTranslation(JSON.parse(Buffer.concat(textBuffer).toString()));
      }
    }

    if (ipfs && image && mode != null) handleStream();

    const abortControllerRef = controller.current;
    return function cleanup() {
      abortControllerRef.abort();
      setImgBuffer([]);
    };
  }, [data, image, ipfs, mode]);

  return (
    <Container>
      {imgBuffer.length > 0 ? (
        <>
          <img
            alt={`page`}
            src={`data:image/jpg;base64,${Buffer.concat(imgBuffer).toString(
              "base64"
            )}`}
          />
          {translation
            ? translation.map((props, index) => {
                return <Box key={index} {...props} title={props.text} />;
              })
            : null}
        </>
      ) : (
        <ReactLoading
          className={"loadingIndicator"}
          type={"spin"}
          color={"#4E5761"}
        />
      )}
    </Container>
  );
}
