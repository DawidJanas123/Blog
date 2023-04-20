import React from "react";


class SingIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            username: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch (event.target.name) {
            case 'email':
                this.setState({email: event.target.value});
                break;
            case 'password':
                this.setState({password: event.target.value});
                break;
            case 'username':
                this.setState({username: event.target.value});
                break;
        }
    }


    async handleSubmit(event) {

        await fetch("http://localhost:8080/blog/singin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.password
            })
        }).catch(error => {
            window.alert(error);
            return;
        })

        this.setState({
            username: '',
            password: '',
            email: ''
        })
    }


    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <div className='mb-3'>
                        <label for="email" className='form-label'>Email address</label>
                        <input type="email" name='email' className='form-control' id='email'
                               aria-describedby='emailHint' value={this.state.email} onChange={this.handleChange}/>
                        <div id='emailHint' className='form-text'>We'll never share your email with anyone else.</div>
                    </div>
                    <div className='mb-3'>
                        <label for="password" className='form-label'>Password</label>
                        <input type="password" name='password' className='form-control' id='password'
                               value={this.state.password} onChange={this.handleChange}/>
                    </div>
                    <div className='mb-3'>
                        <label for="username" className='form-label'>Username</label>
                        <input type='text' name='username' className='form-control' id='username'
                               value={this.state.username} onChange={this.handleChange}/>
                    </div>
                    <input type="submit" className='btn btn-primary' value='Submit'/>
                </form>
            </>
        )
    }
}

export default SingIn;