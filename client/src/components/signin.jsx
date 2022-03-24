import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import Joi from "joi-browser";

import userService from "../services/userService";
import { Redirect } from "react-router-dom";

class Signin extends Form {
    state = {
        data: { email: "", password: "" },
        errors: {}
    }

    schema = {
        email: Joi.string().required().email().label("Email"),
        password: Joi.string().required().min(6).label("Password").regex(RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/))
    }

    doSubmit = async () => {
        const { email, password } = this.state.data;
        try {
            await userService.login(email, password);
            window.location = "/";
        } catch (ex) {
            if (ex.response?.status === 400) {
                this.setState({ errors: { email: ex.response.data } });
            }
        }
    }

    connectAsAdmin = async () => {
        const { email, password } = this.state.data;
        try {
            await userService.loginAsAdmin(email, password);
            window.location = "/";
        } catch (ex) {
            if (ex.response?.status === 400) {
                this.setState({ errors: { email: ex.response.data } });
            }
        }
    }

    render() {

        if (userService.getCurrentUser()) return <Redirect to="/" />

        return (
            <div className="container">
                <PageHeader titleText="Login InstruMentaliszt"></PageHeader>
                <div className="row">
                    <div className="col-12">
                        <p>Login to your account at InstruMentaliszt</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
                            {this.renderInput("email", "Email", "email")}
                            {this.renderInput("password", "Password", "password")}
                            <div className="d-flex justify-content-center">
                            {this.renderButton("Submit")}
                            </div>
                        </form>
                        <div className="d-flex justify-content-center">
                        <button className="btn btn-warning m-3" onClick={this.connectAsAdmin}>Connect as Admin</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signin;
