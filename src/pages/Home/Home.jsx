import { useUserAuth } from '../../context/UserAuth'

import './Home.css'

const Home = () => {
  const { user, logOut } = useUserAuth();

  const handleLogOut = async () =>{
    try{
      await logOut();
    }catch(err){
      console.log(err.message);
    }
  }

  return (
    <div className="container home">
      <h2>Hello! Welcome to</h2>
      <h3>{user && user.email}</h3>

      <button className='btn' onClick={handleLogOut}>Log Out</button>
      {console.log(user)}
    </div>
  )
}

export default Home