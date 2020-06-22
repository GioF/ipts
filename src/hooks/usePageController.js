import { useState, useEffect, useCallback } from "react";
import { useHistory, useRouteMatch, generatePath } from "react-router-dom";

export default function usePageController(initPage = 0, chapterLength) {
  const match = useRouteMatch("/reading/:cid/:urlPage");
  const [page, setLocalPage] = useState(
    match ? parseInt(match.params.urlPage) : 0
  );
  const history = useHistory();

  const setPage = useCallback(
    (amount) => {
      if (amount > 0) {
        setLocalPage((currentPage) =>
          currentPage + amount < chapterLength
            ? currentPage + amount
            : currentPage
        );
      } else if (amount < 0) {
        setLocalPage((currentPage) =>
          currentPage + amount >= 0 ? currentPage + amount : 0
        );
      }
    },
    [chapterLength]
  );

  //side effect that pushes the current page number to the history
  useEffect(() => {
    const cid = match.params.cid;
    const path = generatePath(match.path, { cid, urlPage: page });
    history.push(path);
  }, [page, match.params.cid, match.path, history]);

  const setPageByEvent = useCallback(
    ({ code }) => {
      switch (code) {
        case "ArrowLeft":
          setPage(-1);
          break;
        case "ArrowRight":
          setPage(+1);
          break;
        default:
      }
    },
    [setPage]
  );

  return [page, setPage, setPageByEvent];
}
