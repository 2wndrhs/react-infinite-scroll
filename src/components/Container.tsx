import { CSSProperties, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div style={styles.container}>{children}</div>;
};

const styles: { container: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
};

export default Container;
