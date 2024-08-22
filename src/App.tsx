import { fetchUsers } from "./apis/api";
import Card from "./components/Card";
import Container from "./components/Container";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { User } from "./mocks/handlers";

// [코드 3] Scroll event를 이용한 무한스크롤 예시
const PAGE_SIZE = 10;

function App() {
  const { data: users, isFetching } = useInfiniteScroll<User>(fetchUsers, {
    size: PAGE_SIZE,
  });

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
