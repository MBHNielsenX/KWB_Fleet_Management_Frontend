import {AUTH_URL} from "../../../settings.js";

let URL = AUTH_URL + "/login"

let router;


export async function initLogin(navigoRouter) {
    router = navigoRouter
    document.getElementById("login-btn").onclick = loginLogoutClick
    document.getElementById("logout-btn").onclick = loginLogoutClick
}




async function handleHttpErrors(res) {
    if (!res.ok) {
        const errorResponse = await res.json();
        const error = new Error(errorResponse.message)
        error.apiError = errorResponse
        throw error
    }
    return res.json()
}

function toggleLoginStatus(loggedIn) {

    const loginStatus = document.getElementById("login-status")

    loginStatus.style.color = loggedIn ? "green" : "red"
    loginStatus.innerText = loggedIn ? "Logged in" : "Not logged in"

    /*
    loginContainer.style.display = loggedIn ? "none" : "block"
    logoutContainer.style.display = loggedIn ? "block" : "none"
     */
}

function storeLoginDetails(res) {
    localStorage.setItem("token", res.token)
    localStorage.setItem("user", res.username)
    localStorage.setItem("roles", res.roles)
    //Update UI
    toggleLoginStatus(true)
}

function clearLoginDetails() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("roles")
    //Update UI
    toggleLoginStatus(false)
}

async function loginLogoutClick(evt) {
    const userNameInput = document.getElementById("userName-input")
    const passwordInput = document.getElementById("password-input")
    evt.stopPropagation()  //prevents the event from bubling further up
    const logInWasClicked = evt.target.id === "login-btn" ? true : false
    if (logInWasClicked) {
        //Make the request object
        const loginRequest = {}
        console.log(userNameInput.value)
        console.log(passwordInput.value)
        loginRequest.username = userNameInput.value
        loginRequest.password = passwordInput.value
        const options = {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(loginRequest)
        }
        try {
            const res = await fetch(URL, options).then(handleHttpErrors)
            storeLoginDetails(res)
        } catch (err) {
            console.log(err)
            if (err.apiError) {
                console.log(err.apiError.message)
            } else {
                console.log(err.message)
            }
        }
    } else {
        //Logout was clicked
        clearLoginDetails()
    }
}

export async function checkToken() {
    const options = {
        method: "GET",
        headers: {"Accept": "application/json"}
    };
    if (localStorage.getItem("token") !== null) {
        const token = localStorage.getItem("token")
        if (!token) {
            alert("You must login to use this feature")
            return
        }
        options.headers.Authorization = "Bearer " + token
    }
    return options;
}

export async function checkToken2(object) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(object)
    };
    if (localStorage.getItem("token") !== null) {
        const token = localStorage.getItem("token")
        if (!token) {
            alert("You must login to do this feature")
            return
        }
        options.headers.Authorization = "Bearer " + token
    }
    return options;
}

