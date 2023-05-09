export const getUser = async (password, email) => {

    let isLogged = false;
    const userPassword = password.toString();
    const userEmail = email.toString();
    const response = await fetch('http://localhost:8080/blog/login?' + new URLSearchParams({
        email: userEmail,
        password: userPassword
    })).then(response => response.json().then(data => ({
        data: data,
        status: response.status
    })).then(res => {
        if (res.data.message === 'Logged in') {
            isLogged = true;
        } else {
            isLogged = false;
        }
    }));


    return isLogged;
}



