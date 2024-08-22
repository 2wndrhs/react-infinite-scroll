import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { PaginationResponse } from "../mocks/handlers";
import { throttleByAnimationFrame } from "../utils/throttleByAnimationFrame";

// [코드 5] Throttle 적용한 Custom Hook
interface InfiniteScrollOptions {
  size: number;
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
}

export interface PaginationParams {
  page: number;
  size: number;
}

export const useInfiniteScroll = <T>(
  fetcher: (
    params: PaginationParams
  ) => Promise<AxiosResponse<PaginationResponse<T>>>,
  { size, onSuccess, onError }: InfiniteScrollOptions
) => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<T[]>([]);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);

  const executeFetch = useCallback(async () => {
    try {
      const {
        data: { contents, pageNumber, isLastPage },
      } = await fetcher({ page, size });

      setData((prev) => prev.concat(contents));
      setPage(pageNumber + 1);
      setNextPage(!isLastPage);
      setFetching(false);
      onSuccess?.();
    } catch (err) {
      onError?.(err);
    }
  }, [page]);

  useEffect(() => {
    const handleScroll = throttleByAnimationFrame(() => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop + 100 >= offsetHeight) {
        console.log("fetching more users...");
        setFetching(true);
      }
    });

    setFetching(true);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && hasNextPage) executeFetch();
    else if (!hasNextPage) setFetching(false);
  }, [isFetching]);

  return { page, data, isFetching, hasNextPage };
};
