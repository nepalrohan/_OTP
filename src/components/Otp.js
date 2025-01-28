import { useState, useRef, useEffect } from "react";

export default function Otp({ length }) {
  const otpvalue = "1234";
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [error, setError] = useState(null);
  const inputRef = useRef([]);
  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Allow only numeric input
    let newArray = [...otp];
    newArray[index] = value;
    setOtp(newArray);

    if (value && index < length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKey = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  useEffect(() => {
    if (otp.join("") !== "" && otp.join("") !== otpvalue) {
      setError("OTP not valid");
    } else {
      setError(null);
    }
    console.log(otp);
    console.log(otp.join());
    console.log(otp.join("") === otpvalue);
  }, [otp]);
  return (
    <div>
      <h3>Enter the OTP to verify your account.</h3>
      <div className="otp-div">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            ref={(ref) => (inputRef.current[index] = ref)}
            className="otp-input"
            maxLength="1"
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKey(e, index)}
          />
        ))}
      </div>

      {error && <p className="error">{error}</p>}
      <button className="btn">Verify</button>
    </div>
  );
}
