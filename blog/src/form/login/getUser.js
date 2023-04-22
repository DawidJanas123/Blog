export const getUser = async (password, email) => {

    const userPassword = password.toString();
    const userEmail = email.toString();
    const response = await fetch('http://localhost:8080/blog/login?' + new URLSearchParams({
        email: userEmail,
        password: userPassword
    }));

    const data = await response.json();

    if (response?.ok) {
        console.log('Logged in');
    }

    return data;
}



