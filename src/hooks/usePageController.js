import { useState, useCallback } from "react";

export default function usePageController(initPage = 0, chapterLength) {
  const [page, _setPage] = useState(0);

  function setPage(amount) {
    if (amount > 0) {
      console.log(chapterLength, page);
      _setPage((page) => (page < chapterLength - 1 ? page + amount : page));
    } else if (amount < 0) {
      _setPage((page) => (page > 0 ? page + amount : 0));
    }
  }

  const setPageByEvent = useCallback(
    ({ code }) => {
      switch (code) {
        case "ArrowLeft":
          _setPage((page) => (page > 0 ? page - 1 : 0));
          break;
        case "ArrowRight":
          _setPage((page) => (page < chapterLength - 1 ? page + 1 : page));
          break;
        default:
      }
    },
    [chapterLength]
  );

  return [page, setPage, setPageByEvent];
}
