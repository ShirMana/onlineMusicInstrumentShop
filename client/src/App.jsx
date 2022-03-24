import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Payment from './components/payment';

import { Link, Route, Switch } from 'react-router-dom';
import About from './components/about';
import Home from './components/home';
import Signup from './components/signup';
import Signin from './components/signin';
import Logout from './components/logout';
import AddInstrument from './components/addInstrument';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Component } from 'react';
import userService from './services/userService';
import ProtectedRoute from './components/common/protectedRoute';
import UpdateInstrument from './components/updateInstrument';
import Delete from './components/delete';
import EditUser from './components/editUser';
import cart from './components/cart';
import Allinstruments from './components/allinstruments';


class App extends Component {
    state = {}

    async componentDidMount() {
        const user = userService.getCurrentUser();
        if (user) {
           this.setState({ user });
           let {data : { email }} = await userService.getCurrentUserDetails();
           if (email) this.setState( { email});
        }
    }

    render() {

        const { user } = this.state;
        const { email } = this.state;

        return (
            <React.Fragment>
                <ToastContainer />
                <header>
                    <Navbar user={user} />
                </header>
                {user && <Link to= "/edit-user"> <p className = "text-right mx-5 mt-4" > <i className="fas fa-user-check"></i>  { email}</p></Link>}
                <main style={{ minHeight: 900 }}>
                    <Switch>
                        <ProtectedRoute path="/edit-user" component={EditUser} />
                        <ProtectedRoute path="/delete/:id" component={Delete} owner={true} />
                        <ProtectedRoute path="/edit/:id" component={UpdateInstrument} owner={true} />
                        <ProtectedRoute path="/allinstruments" component={Allinstruments} />
                        <ProtectedRoute path="/cart" component={cart} />
                        <ProtectedRoute path="/create-item" component={AddInstrument} owner={true}/>
                        <ProtectedRoute path='/payment' component={Payment}  />
                        <Route path='/logout' component={Logout} />
                        <Route path='/about' component={About} />
                        <Route path='/signin' component={Signin} />
                        <Route path='/signup' component={Signup} />
                        <Route path='/' component={Home} />
                        
                    </Switch>
                </main>
                <footer>
                    <Footer />
                </footer>
            </React.Fragment>
        );
    }
}

export default App;
