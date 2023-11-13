import { useState } from "react";
import { useUserAuth } from "../../context/UserAuth";
import { useNavigate, NavLink } from "react-router-dom";
import ErrerMessage from "../../helper/ErrerMessage/ErrerMessage";
import "../SignUp/SignUp.css";

const LogIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    errer: "",
  });
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  let name, value;
  const getUser = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setUser({
      ...user,
      errer: "",
    });
    try {
        await logIn(user.email, user.password);
        navigate("/");
    } catch (err) {
      setUser({
        ...user,
        errer: err.message,
      });
    }
  };

  return (
    <div className="container signup__container">
      <form action="" className="sign-up" onSubmit={handleSignUp}>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={getUser}
          placeholder="Enter your email"
          required
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={getUser}
          placeholder="Enter your password"
          required
        />
        {user.errer && <ErrerMessage message={user.errer} />}
        <button type="submit" className="btn">
          Log In
        </button>

        <p
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          color: "rgba(0, 0, 0, 0.7)",
          fontSize: "16px"
        }}>Don't have an account? <NavLink to="/sign-up"
        style={{
          textDecoration: "underline",
          color: "black",
          paddingLeft: "8px"
        }}> Sign Up</NavLink></p>
      </form>
    </div>
  );
};

export default LogIn;
