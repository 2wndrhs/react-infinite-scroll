import { CSSProperties } from "react";

interface CardProps {
  name: string;
}

const Card = ({ name }: CardProps) => {
  return (
    <div style={styles.card}>
      <div style={styles.details}>
        <h3>{name}</h3>
      </div>
    </div>
  );
};

const styles: { card: CSSProperties; details: CSSProperties } = {
  card: {
    width: "200px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  details: {
    fontSize: "14px",
    color: "#333",
  },
};

export default Card;
