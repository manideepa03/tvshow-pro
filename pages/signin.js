import { useState } from "react";

const initialState = {
  email: "",
  password: "",
};

const Signin = () => {
  const [signinInfo, setsigninInfo] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("we are submitting");
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="signin">
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={signinInfo.email}
          onChange={handleInputChange}
        ></input>
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={signinInfo.password}
          onChange={handleInputChange}
        ></input>
        <submit type="submit">Submit</submit>
      </form>
    </div>
  );
};

export default Signin;
