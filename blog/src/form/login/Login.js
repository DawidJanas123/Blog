import React from "react";
import {validPassword, validEmail} from "../singin/regex/Regex"
import {getUser} from "./getUser";

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.props.setLogin(false);

        this.state = {
            email: '', password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (validPassword.test(this.state.password) && validEmail.test(this.state.email)) {

            getUser(this.state.password, this.state.email)

            this.setState({
                email: '',
                password: ''
            })
        } else {
            this.props.setLogin(true);
        }
    }

    handleChange(event) {
        switch (event.target.name) {
            case 'email':
                this.setState({
                    email: event.target.value
                })
                break;
            case 'password':
                this.setState({
                    password: event.target.value
                })
                break;
        }
    }


    render() {
        return (<>
            <form onSubmit={this.handleSubmit}>
                <div className='mb-3'>
                    <label className='form-label'>
                        Email
                        <input className='form-control' type='email' name='email'
                               placeholder='Type your email'
                               value={this.state.email}
                               onChange={this.handleChange}/>
                    </label>
                    {!this.props.login && <div className={`form-text ${this.props.login ? 'is-invalid' : ''}`}>Type your
                        email-address</div>}
                    {this.props.login && <p>*Your email-address is incorrect</p>}
                </div>
                <div className='mb-3'>
                    <label className='form-label'>
                        Password
                        <input className={`form-control ${this.props.login ? 'is-invalid' : ''}`} type="password"
                               name='password' value={this.state.password}
                               onChange={this.handleChange} placeholder='Type your password'/>
                    </label>
                    {this.props.login && <p>*Your password is incorrect</p>}
                </div>
                <input className='btn btn-primary' type="submit" value='Submit'/>
            </form>
        </>)
    }
}

export default Login;