import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Card from "./components/Card";
import Container from "./components/Container";
import { PaginationResponse, User } from "./mocks/handlers";

// [코드 3] Scroll event를 이용한 무한스크롤 예시
const PAGE_SIZE = 10;

function App() {
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);

  const fetchUsers = useCallback(async () => {
    const { data } = await axios.get<PaginationResponse<User>>("/users", {
      params: { page, size: PAGE_SIZE },
    });

    setUsers(users.concat(data.contents));
    setPage(data.pageNumber + 1);
    setNextPage(!data.isLastPage);
    setFetching(false);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;

      if (window.innerHeight + scrollTop + 100 >= offsetHeight) {
        console.log("fetching more users...");
        setFetching(true);
      }
    };

    setFetching(true);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && hasNextPage) fetchUsers();
    else if (!hasNextPage) setFetching(false);
  }, [isFetching]);

  return (
    <Container>
      {users.map((user) => (
        <Card key={user.id} name={user.name} />
      ))}
      {isFetching && <p>Loading more users...</p>}
    </Container>
  );
}

export default App;
