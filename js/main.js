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
    if(window.localStorage.getItem("loggedIn")){
        //render everything
        document.getElementById('main_content').innerHTML = `<h3>YOUR PROFILE</h3>
        <div class="section">
          <h5>Welcome back!</h5>
          <p>Username: <span id="username"></span></p>
          <p>Email: <span id="email"></span></p>
        </div>
        <div class="section">
          <h5>Change password</h5>
            <label for="exampleInputEmail1">Old password</label>
            <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="old password">
            <label for="exampleInputEmail1">New password</label>
            <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="new password">
            <br/>
            <button type="submit" class="btn btn-success" onclick="alert('Password successfully changed.');">Change password</button>
        </div>
        <div class="section">
          <h3>Current Bookings</h3>
          <div>
            <div class="box2" style="display: flex;">
              <div style="flex: 1;">
                <h5><span id="dest"></span></h5>
                <ul>
                  <li>DEPARTING FROM: <span id="from"></span></li>
                  <li>DEPARTING DATE: <span id="date"></span></li>
                  <li>DEPARTING TIME: <span id="departTime"></span></li>
                  <li>DURATION: <span id="duration"></span></li>
                  <li>ARRIVAL TIME: <span id="arrivalTime"></span></li>
                </ul>
              </div>
              <div style="flex: 1;">
                <h5>Details:</h5>
                <ul>
                  <li>CLASS: <span id="classType"></li>
                  <li>SEAT TYPE: <span id="seatType"></li>
                  <li>OPTIONAL EXTRAS: <span id="extras"></span></li>
                  <li>Cost: <span id="costs">$100</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>`

        const user = JSON.parse(window.localStorage.getItem("user"));

        //set username
        document.getElementById("username").innerHTML = user.username;
    
        //set email
        document.getElementById("email").innerHTML = user.email;
    
        //show current bookings
        updateBookingSummary();
    }
    else{
        document.getElementById('main_content').innerHTML = `<div class="section">
        <h5>Not signed up?</h5>
        <p>We recommend you sign up and login so you can access your profile.</p>
      </div>`
    }
}

const flights = [{"destination": "Fiji", 
                "departing_from": "Sydney", 
                "departing_date": "2/12/2021", 
                "departing_time": "09:00:00 AEST", 
                "duration": "4 hours", 
                "arrival_time": "13:00:00",
                }, 
                {"destination": "New Zealand", 
                "departing_from": "Sydney", 
                "departing_date": "5/12/2021", 
                "departing_time": "16:00:00 AEST", 
                "duration": "3.5 hours", 
                "arrival_time": "18:30:00"}, 
                {"destination": "Hawaii", 
                "departing_from": "Sydney", 
                "departing_date": "1/12/2021", 
                "departing_time": "07:00:00 AEST", 
                "duration": "8 hours", 
                "arrival_time": "15:00:00"}, 
                {"destination": "China", 
                "departing_from": "Melbourne", 
                "departing_date": "20/12/2021", 
                "departing_time": "11:00:00 AEST", 
                "duration": "12 hours", 
                "arrival_time": "23:00:00"}
                ];

flight_classes = [{"type":"ECONOMY", "price": 120}, 
{"type": "PREMIUM", "price": 250}, {"type":"BUSINESS", "price":800}, 
{"type":"FIRST", "price": 1500}];

function search(){
    document.getElementById("results").innerHTML = `<h3>Results:</h3>
    <div class="box">
        <div onclick="viewFlight(0);">
            <h3>Fiji</h3>
            <ul>
            <li>DEPARTING FROM: Sydney</li>
            <li>DEPARTING DATE: 2/12/2021</li>
            <li>DEPARTING TIME: 09:00:00 AEST</li>
            <li>DURATION: 4 hours</li>
            <li>ARRIVAL TIME: 13:00:00</li>
            </ul>
        </div>
        <div onclick="viewFlight(1);">
            <h3>New Zealand</h3>
            <ul>
            <li>DEPARTING FROM: Sydney</li>
            <li>DEPARTING DATE: 5/12/2021</li>
            <li>DEPARTING TIME: 16:00:00 AEST</li>
            <li>DURATION: 3.5 hours</li>
            <li>ARRIVAL TIME: 19:30:00</li>
            </ul>
        </div>
        <div onclick="viewFlight(2);">
            <h3>Hawaii</h3>
            <ul>
            <li>DEPARTING FROM: Sydney</li>
            <li>DEPARTING DATE: 1/12/2021</li>
            <li>DEPARTING TIME: 07:00:00 AEST</li>
            <li>DURATION: 8 hours</li>
            <li>ARRIVAL TIME: 15:00:00</li>
            </ul>
        </div>
        <div onclick="viewFlight(3);">
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

let selected_class = 0;

function viewFlight(flight_index){
    window.localStorage.setItem("flight_index", flight_index);

    location.href = "./BookingsDetails.html";
}

//called when BookingsDetails navigated to
function updateFlightSummary(){
    let flight = flights[window.localStorage.getItem("flight_index")];

    //update flight summary
    document.getElementById("dest").innerHTML = flight.destination;
    document.getElementById("from").innerHTML = flight.departing_from;
    document.getElementById("date").innerHTML = flight.departing_date;
    document.getElementById("departTime").innerHTML = flight.departing_time;
    document.getElementById("duration").innerHTML = flight.duration;
    document.getElementById("arrivalTime").innerHTML = flight.arrival_time;
}

function selectClass(class_index){
    selected_class = class_index;
}

extras = {"cookies": 3, "fruit":3, "c_wrap":10, "veg_wrap":8};

function confirmBooking(){
    let selected_flight = flights[window.localStorage.getItem("flight_index")];
    
    let price = 0;
    let class_type = flight_classes[selected_class];
    var select = document.getElementById('seat_choice');
    var seat = select.options[select.selectedIndex].value;
    
    let selected_extras = [];
    price+= class_type.price;

    let extras_elements = document.getElementsByName("extras");

    for(var i = 0; i<extras_elements.length; i++){
        console.log(extras_elements[i]);
        if(extras_elements[i].checked){
            selected_extras.push(extras_elements[i].value);
            price+=extras[extras_elements[i].value];
        }
    }

    console.log(price);

    let current_booking={"flight": selected_flight,
    "price": price, 
    "class":class_type,
    "seat_type":seat,
    "extras": selected_extras, 
    "paid": false}

    //save booking in localstorage
    let booking = JSON.stringify(current_booking);
    window.localStorage.setItem("booking", booking);

    location.href = "./Checkout.html";
}

function updateBookingSummary(){
    updateFlightSummary();

    //get localstorage booking
    let booking = JSON.parse(window.localStorage.getItem("booking"));

    document.getElementById("costs").innerHTML = "$"+booking.price;
    document.getElementById("classType").innerHTML = booking.class.type;
    document.getElementById("seatType").innerHTML = booking.seat_type;
    document.getElementById("extras").innerHTML = booking.extras;
}

function payNow(){
    if(window.localStorage.getItem("loggedIn")){
        let current_booking = JSON.parse(window.localStorage.getItem("booking"));
        current_booking.paid = true;
        let booking = JSON.stringify(current_booking);
        window.localStorage.setItem("booking", booking);
        alert('Your booking has been confirmed! Check your email for confirmation!'); 
        location.href = './Home.html';
    }
    else{
        alert("You must log in before you can book a flight.");
        return;
    }
}

//TODO
function changePassword(){}