import "./App.css";
import React from "react";
import Homepage from "./pages/homepage/Homepage";
import { Route, Switch, Redirect } from "react-router-dom";
import Shoppage from "./pages/shoppage/shoppage";
import Header from "./components/header/header";
import SignInAndSignUp from "./pages/signin-and-signup/signin-and-signup";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/users-action/users.action';

class App extends React.Component {
  unsubscribefromAuth = null;

  componentDidMount() {
    const {setCurrentUser}=this.props;
    this.unsubscribefromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })

        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribefromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage}></Route>
          <Route exact path="/shop/" component={Shoppage}></Route>
          <Route exact path="/signin/" render={()=>this.props.currentUser?(<Redirect to='./' />):(<SignInAndSignUp />)}></Route>
    }
        </Switch>
      </div>
    );
  }
}

const mapStateToProps=({user})=>({
  currentUser:user.currentUser
});

const mapDispatchToProps=dispatch=>({
  setCurrentUser:user=>dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
