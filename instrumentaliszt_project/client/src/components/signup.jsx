
import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import Joi from "joi-browser";

import http from "../services/httpService";
import { apiUrl } from "../config.json";

import { toast } from "react-toastify";
import { Redirect } from 'react-router-dom';

import userService from "../services/userService";

class Signup extends Form {
    state = {
        data: {name: "", email: "", phone: "", password: ""},
        errors: {}
    };

    schema = {
        name: Joi.string().required().min(2).label("Name"),
        email: Joi.string().required().email().label("Email"),
        phone: Joi.string().required().label("Phone").regex(RegExp(/^(?:0(?!(5|7))(?:2|3|4|8|9))(?:-?\d){7}$|^(0(?=5|7)(?:-?\d){9})$/)),
        password: Joi.string().required().min(6).label("Password").regex(RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)),   
    }

    doSubmit = async () => {
        const { data } = this.state;
        data.owner = false;

        try {
            await http.post(`${apiUrl}/users`, data);
            toast("A New Account was Created");
            this.props.history.replace("/signin");
        } catch (ex) {
            if (ex.response?.status === 400) {
                this.setState({ errors: { email: "Email is taken" } });
            }
        }
    }

    render() {

        if (userService.getCurrentUser()) return <Redirect to="/" />;
        return (


            <div className="container">
                <PageHeader titleText="Sign Up InstruMentaliszt"></PageHeader>
                <div className="row">
                    <div className="col-12">
                        <p>Open new account at InstruMentaliszt for free!</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
                            {this.renderInput("name", "Name")}
                            {this.renderInput("email", "Email", "email")}
                            {this.renderInput("phone", "Phone", "string")}
                            {this.renderInput("password", "Password", "password")}
                            {this.renderButton("Submit")}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Signup;