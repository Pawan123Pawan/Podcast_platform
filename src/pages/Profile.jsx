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
      <div
        style={{
          display: "flex",
          margin:"30px",
          // justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "90vh",
          flexDirection: "column",
          background:"transparent",
        }}
      >
        <div style={{}}>
        <h3>UserName: {user.name}</h3>
        <h3>User Email: {user.email}</h3>
        <h3> UserId: {user.uid}</h3>
        <CustomButton value={"Logout"} onclick={handleLogOut} />
        </div>
      </div>
    </>
  );
}

export default Profile;
