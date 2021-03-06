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
  email: "",
  password: "",
};

const Signin = () => {
  const [signinInfo, setSigninInfo] = useState(initialState);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = signinInfo;

    if (!email || !password) {
      return;
    }

    try {
      const response = await axios.post(
        "https://iwallet-api.herokuapp.com/api/auth/signin",
        { ...signinInfo }
      );

      cookies.set(null, "token", response.data.token, { path: "/" });

      const { plannedRoute } = cookies.get();
      // convert the cookies tring into the object

      const parsedPlannedRoute = plannedRoute && JSON.parse(plannedRoute);
      const plannedHrefRoute = parsedPlannedRoute
        ? parsedPlannedRoutee.href
        : "/[country]";
      const plannedAsRoute = parsedPlannedRoute ? parsedPlannedRoute.as : "/us";

      router.replace(plannedHrefRoute, plannedAsRoute);
      console.log("Signin", response);
    } catch (error) {
      console.log("Errror", error);
      // create a state
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSigninInfo({
      ...signinInfo,
      [name]: value,
    });
  };
  // onSubmit is gonna recieve a call back

  return (
    <div className="signin">
      <form onSubmit={handleSubmit}>
        <CustomInput
          type="email"
          name="email"
          placeholder="Enter your email"
          value={signinInfo.email}
          onChange={handleInputChange}
          onBlur={validEmail}
        />
        <CustomInput
          type="password"
          name="password"
          placeholder="Enter your password"
          value={signinInfo.password}
          onChange={handleInputChange}
          onBlur={validateRequired}
        />

        {error && <div className="error">{error}</div>}

        <Link href="/signup">
          <a> Create an account </a>
        </Link>

        {/* <input
          name="email"
          placeholder="Email"
          value={signinInfo.email}
          onChange={handleInputChange}
        ></input> */}
        {/* <input
          name="password"
          placeholder="Password"
          type="password"
          value={signinInfo.password}
          onChange={handleInputChange}
        ></input> */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signin;
