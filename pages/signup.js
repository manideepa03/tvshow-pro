import Axios from "axios";
import { useState } from "react";
import axios from "axios";
import CustomInput from "../components/CustomInput";
import { useRouter } from "next/router";
import cookies from "nookies";
import validEmail from "../utils/validators/validateEmail";
import validateRequired from "../utils/validators/validateRequired";
import Link from "next/link";
const initialState = {
  name: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState(initialState);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, name } = signupInfo;

    if (!email || !password || !name) {
      return;
    }

    try {
      const response = await axios.post(
        "https://iwallet-api.herokuapp.com/api/auth/signup",
        { ...signupInfo }
      );

      cookies.set(null, "token", response.data.token, { path: "/" });
      router.replace("/[country]", "/us");
      console.log("Signin", response);
    } catch (error) {
      console.log("Errror", error);
      // create a state
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSignupInfo({
      ...signupInfo,
      [name]: value,
    });
  };
  // onSubmit is gonna recieve a call back

  return (
    <div className="signin">
      <form onSubmit={handleSubmit}>
        <CustomInput
          type="name"
          name="name"
          placeholder="Enter your Name"
          value={signupInfo.name}
          onChange={handleInputChange}
          onBlur={validateRequired}
        />
        <CustomInput
          type="email"
          name="email"
          placeholder="Enter your email"
          value={signupInfo.email}
          onChange={handleInputChange}
          onBlur={validEmail}
        />
        <CustomInput
          type="password"
          name="password"
          placeholder="Enter your password"
          value={signupInfo.password}
          onChange={handleInputChange}
          onBlur={validateRequired}
        />

        {error && <div className="error">{error}</div>}

        <Link href="/signin">
          <a> Already have an account ?</a>
        </Link>

        {/* <input
          name="email"
          placeholder="Email"
          value={signupInfo.email}
          onChange={handleInputChange}
        ></input> */}
        {/* <input
          name="password"
          placeholder="Password"
          type="password"
          value={signupInfo.password}
          onChange={handleInputChange}
        ></input> */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
