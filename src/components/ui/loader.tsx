import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

// Define the spin animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled loader component
const LoaderContainer = styled.div<{ $size?: React.CSSProperties["width"] }>`
  align-items: center;
  display: flex;
  height: ${(props) => props.$size || "40px"};
  justify-content: center;
  width: ${(props) => props.$size || "40px"};
`;

const Spinner = styled.div`
  animation: ${spin} 1s linear infinite;
  border-radius: 50%;
  border-top: 4px solid ${(props) => props.color || "#3498db"};
  border: 4px solid #f3f3f3;
  height: 100%;
  width: 100%;
`;

type LoaderProps = {
  color?: React.CSSProperties["color"];
  size?: React.CSSProperties["width"];
};

// Loader component
const Loader = ({ size, color }: LoaderProps) => {
  return (
    <LoaderContainer $size={size}>
      <Spinner color={color} />
    </LoaderContainer>
  );
};

export default Loader;
