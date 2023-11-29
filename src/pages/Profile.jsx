
import Header from "../component/Header/Header";
import { useSelector } from "react-redux";
import CustomButton from "../component/CustomButton/CustomButton";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

function Profile() {
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log(user);
 

  if (!user) {
    return <p>Loading......</p>;
  }

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        toast.success("User logged out");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  return (
    <>
      <Header />
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
      <h1>{user.uid}</h1>
      <CustomButton value={"Logout"} onclick={handleLogOut} />
    </>
  );
}

export default Profile;
