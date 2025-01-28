import "./styles.css";
import Otp from "./components/Otp";
export default function App() {
  return (
    <div className="App">
      <Otp length={4} />
    </div>
  );
}
