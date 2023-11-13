import { useState } from "react";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../../context/UserAuth";
import { useNavigate, NavLink } from "react-router-dom";
import ErrerMessage from "../../helper/ErrerMessage/ErrerMessage";
import "./SignUp.css";

const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    cPassword: "",
    errer: "",
  });
  const { signUp, googleSignIn } = useUserAuth();
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
      if (user.password === user.cPassword) {
        await signUp(user.email, user.password);
        setUser({
          email: "",
          password: "",
          cPassword: "",
          errer: "success",
        });
        navigate("/log-in")
      } else {
        setUser({
          ...user,
          errer: "password not mached",
        });
      }
    } catch (err) {
      setUser({
        ...user,
        errer: err.message,
      });
    }
  };



  const handleGoogleSignIn = async(e) =>{
    e.preventDefault();

    try{
      await googleSignIn();
      navigate("/")
    }catch(err){
      setUser({
        ...user,
        errer: err.message,
      });
    }
  }

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
        <input
          type="password"
          name="cPassword"
          value={user.cPassword}
          onChange={getUser}
          placeholder="Enter your confirm password"
          required
        />
        {user.errer && <ErrerMessage message={user.errer} />}
        <GoogleButton style={{ width: "100%" }}
        onClick={handleGoogleSignIn} />
        <button type="submit" className="btn">
          Sign Up
        </button>

        <p
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          color: "rgba(0, 0, 0, 0.7)",
          fontSize: "16px"
        }}>Already have an account? <NavLink to="/log-in"
        style={{
          textDecoration: "underline",
          color: "black",
          paddingLeft: "8px"
        }}> Log In</NavLink></p>
      </form>
    </div>
  );
};

export default SignUp;
