import { forwardRef } from "react";

const Target = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} style={styles.target}>
      Target
    </div>
  );
});

const styles = {
  target: {
    width: "100%",
    height: "100px",
    backgroundColor: "lightblue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    color: "white",
  },
};

export default Target;
