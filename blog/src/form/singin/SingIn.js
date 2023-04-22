import React from "react";
import {validPassword, validUsername, validEmail} from "./regex/Regex";

class SingIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '', password: '', username: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch (event.target.name) {
            case 'email':
                this.setState({email: event.target.value});
                if (!validEmail.test(this.state.email)) {
                    this.props.setEmail(true);
                } else {
                    this.props.setEmail(false);
                }
                break;
            case 'password':
                this.setState({password: event.target.value});
                if (!validPassword.test(this.state.password)) {
                    this.props.setPassword(true);
                } else {
                    this.props.setPassword(false);
                }
                break;
            case 'username':
                this.setState({username: event.target.value});
                if (!validUsername.test(this.state.username)) {
                    this.props.setUsername(true);
                } else {
                    this.props.setUsername(false);
                }
                break;
        }
    }


    async handleSubmit(event) {
        event.preventDefault();

        if (validEmail.test(this.state.email) && validPassword.test(this.state.password) && validUsername.test(this.state.username)) {
            await fetch("http://localhost:8080/blog/singin", {
                method: "POST", headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    email: this.state.email,
                    date: new Date().toLocaleString()
                })
            }).then((res) => res.json())
                .then((post) => {
                    console.log(post);
                })
                .catch((err) => {
                    console.log(err.message);
                })
            this.setState({
                username: '', password: '', email: ''
            })
        }
    }


    render() {
        return (<>
            <form onSubmit={this.handleSubmit}>
                <div className='mb-3 has-validation'>
                    <label for="email" className='form-label'>Email address</label>
                    <input type="email" name='email'
                           className={`form-control ${this.props.email ? 'is-invalid' : 'is-valid'}`} id='email'
                           aria-describedby='emailHint' value={this.state.email} onChange={this.handleChange}/>
                    {!this.props.email &&
                        <div id='emailHint' className='form-text'>We'll never share your email with anyone
                            else.</div>}
                    {this.props.email && <p className='text-danger'>*Your email is invalid</p>}
                </div>
                <div className='mb-3'>
                    <label for="password"
                           className='form-label'>Password</label>
                    <input type="password" name='password'
                           className={`form-control ${this.props.password ? 'is-invalid' : 'is-valid'}`} id='password'
                           value={this.state.password} onChange={this.handleChange}/>
                    {this.props.password &&
                        <p className='text-danger'>*Your password must have include between 6 and 20 characters and
                            be at least one number
                            and one
                            special character</p>}
                </div>
                <div className='mb-3'>
                    <label for="username" className='form-label'>Username</label>
                    <input type='text' name='username'
                           className={`form-control ${this.props.username ? 'is-invalid' : 'is-valid'}`} id='username'
                           value={this.state.username} onChange={this.handleChange}/>
                    {this.props.username &&
                        <p className='text-danger'>*Your username is invalid,insert between 5 and 10 characters with
                            only letters and numbers</p>}
                </div>
                <input type="submit" className='btn btn-primary' value='Submit'/>
            </form>
        </>)
    }
}

export default SingIn;