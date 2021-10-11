function signUp(){
    //get email
    var email = document.getElementById("exampleInputEmail1").value;

    //get username
    var username = document.getElementById("username").value;

    //get password
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;


    if(email == ""){
        alert("Email cannot be blank.");
        return;
    }

    if(username == ""){
        alert("Username cannot be blank.");
        return;
    }

    if(password1 == ""){
        alert("Password cannot be blank.");
        return;
    }

    if(password1.length < 8){
        alert("Password should be at least 8 characters.");
        return;
    }

    if(password1 != password2){
        alert("Passwords do not match. Please reconfirm.");
        return;
    }

    //store in local storage
    var user = {"email": email, "username": username, "password":password1};
    const newUser = JSON.stringify(user);
    window.localStorage.setItem("user", newUser);

    alert("New account successfully created. Now you should try log in.");
    location.href = "./Home.html";
    return;
}

function login(){
    const user = JSON.parse(window.localStorage.getItem("user"));
    
    var username = document.getElementById("login_username").value;
    var password = document.getElementById("login_password").value;

    if((username != user.username) || (password != user.password)){
        alert("Username or password incorrect");
        return;
    }

    alert("Successfully logged in.")
    window.localStorage.setItem("loggedIn", true);
    location.href = "./Home.html";
    return;
}

function homeWelcome(){
    if(window.localStorage.getItem("loggedIn")){
        const user = JSON.parse(window.localStorage.getItem("user"));
        document.getElementById("welcome").innerHTML = "Welcome "+user.username+"!";
    }
}

//TODO: add bookings + add check for loggedIn
function loadProfile(){
    //should change this to only render if 'logged in'

    const user = JSON.parse(window.localStorage.getItem("user"));

    //set username
    document.getElementById("username").innerHTML = user.username;

    //set email
    document.getElementById("email").innerHTML = user.email;

    //show current bookings
    //loop through each booking and render
}

function search(){
    console.log('test');
    document.getElementById("results").innerHTML = `<h3>Results:</h3>
    <div class="box">
        <div onclick="confirmBooking();">
            <h3>Fiji</h3>
            <ul>
            <li>DEPARTING FROM: Sydney</li>
            <li>DEPARTING DATE: 2/12/2021</li>
            <li>DEPARTING TIME: 09:00:00 AEST</li>
            <li>DURATION: 4 hours</li>
            <li>ARRIVAL TIME: 13:00:00</li>
            </ul>
        </div>
        <div onclick="confirmBooking();">
            <h3>New Zealand</h3>
            <ul>
            <li>DEPARTING FROM: Sydney</li>
            <li>DEPARTING DATE: 5/12/2021</li>
            <li>DEPARTING TIME: 16:00:00 AEST</li>
            <li>DURATION: 3.5 hours</li>
            <li>ARRIVAL TIME: 19:30:00</li>
            </ul>
        </div>
        <div onclick="confirmBooking();">
            <h3>Hawaii</h3>
            <ul>
            <li>DEPARTING FROM: Sydney</li>
            <li>DEPARTING DATE: 1/12/2021</li>
            <li>DEPARTING TIME: 07:00:00 AEST</li>
            <li>DURATION: 8 hours</li>
            <li>ARRIVAL TIME: 15:00:00</li>
            </ul>
        </div>
        <div onclick="confirmBooking();">
            <h3>China</h3>
            <ul>
            <li>DEPARTING FROM: Melbourne</li>
            <li>DEPARTING DATE: 20/12/2021</li>
            <li>DEPARTING TIME: 11:00:00 AEST</li>
            <li>DURATION: 12 hours</li>
            <li>ARRIVAL TIME: 23:00:00</li>
            </ul>
        </div>
    </div>`;
}

function confirmBooking(){
    location.href = "./BookingsDetails.html"
}

function payNow(){}