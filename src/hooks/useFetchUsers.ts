import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../apis/api";
import { PaginationParams } from "./useInfiniteScroll";

export const useFetchUsers = ({ size }: PaginationParams) =>
  useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam }) => fetchUsers({ page: pageParam, size }),
    initialPageParam: 0,
    getNextPageParam: ({ data: { isLastPage, pageNumber } }) => {
      return isLastPage ? undefined : pageNumber + 1;
    },
  });
