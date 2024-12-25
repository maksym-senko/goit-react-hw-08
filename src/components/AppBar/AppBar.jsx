import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";
import Header from "../Header/Header";


const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Header>
      <div>
        <Navigation />
        <div >
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </div>
      </div>
    </Header>
  );
};


export default AppBar;