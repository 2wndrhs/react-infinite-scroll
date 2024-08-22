import { delay, http, HttpResponse } from "msw";

// [코드 1] 무한스크롤 응답 인터페이스
export interface PaginationResponse<T> {
  contents: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
  isFirstPage: boolean;
}

export interface User {
  id: number;
  name: string;
}

// [코드 2] MSW 유저 목록 모킹 API
const users = Array.from({ length: 1024 }).map((_, id) => ({
  id,
  name: `user${id}`,
}));

export const handlers = [
  http.get("/users", async ({ request }) => {
    const url = new URL(request.url);
    const size = Number(url.searchParams.get("size"));
    const page = Number(url.searchParams.get("page"));
    const totalCount = users.length;
    const totalPages = Math.round(totalCount / size);

    await delay(500);

    return HttpResponse.json<PaginationResponse<User>>(
      {
        contents: users.slice(page * size, (page + 1) * size),
        pageNumber: page,
        pageSize: size,
        totalPages,
        totalCount,
        isLastPage: totalPages <= page,
        isFirstPage: page === 0,
      },
      {
        status: 200,
      }
    );
  }),
];
