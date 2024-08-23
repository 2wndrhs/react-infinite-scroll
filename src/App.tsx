import Card from "./components/Card";
import Container from "./components/Container";
import Target from "./components/Target";
import { useFetchUsers } from "./hooks/useFetchUsers";
import { useIntersect } from "./hooks/useIntersect";

// [코드 3] Scroll event를 이용한 무한스크롤 예시
const PAGE_SIZE = 10;

function App() {
  const {
    data: users,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useFetchUsers({
    size: PAGE_SIZE,
  });

  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    console.log("unobserving...");

    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  return (
    <Container>
      {users && users.map((user) => <Card key={user.id} name={user.name} />)}
      {isFetching && <p>Loading more users...</p>}
      <Target ref={ref} />
    </Container>
  );
}

export default App;
