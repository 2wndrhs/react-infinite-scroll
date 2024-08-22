import axios from "axios";
import { PaginationParams } from "../hooks/useInfiniteScroll";
import { PaginationResponse, User } from "../mocks/handlers";

// [코드 6] 유저 목록 API 호출 함수
export const fetchUsers = (params: PaginationParams) =>
  axios.get<PaginationResponse<User>>("/users", {
    params,
  });
