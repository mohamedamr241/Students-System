let currentUrl = window.location.href;
let pathVariables = currentUrl.split('/');
let userId = pathVariables[4];
console.log(userId)
let form =document.getElementById("edit");
$.ajax({
    type: "GET",
    contentType: "application/json",
    url: `/student/get/${userId}`,
    cache: false,
    timeout: 600000,
    success: function (data) {
        let stu = data.stu;
        console.log(stu[0]);
        console.log(document.getElementById('id'))
        document.getElementById('id').value=stu[0]._ID;
        document.getElementById('fname').value=stu[0]._FirstName;
        document.getElementById('lname').value=stu[0]._LastName;
        document.getElementById('gender').value=stu[0]._Gender;
        document.getElementById('address').value=stu[0]._Address;
        document.getElementById('gpa').value=stu[0]._GPA;
        document.getElementById('level').value=stu[0]._Level;
    },
    error: function (e) {
        console.log("ERROR");
    }
});


form.addEventListener('submit', function (e) {
    e.preventDefault(); 
    var pattern = /^[a-z]+$/;
    let formdata = this;
    console.log(pattern.test(formdata[3].value));
    document.getElementById(`_ID`).innerText="";
    document.getElementById(`_FirstName`).innerText="";
    document.getElementById(`_LastName`).innerText="";
    document.getElementById(`_Gender`).innerText="";
    document.getElementById(`_Address`).innerText="";
    document.getElementById(`_GPA`).innerText="";
    document.getElementById(`_Level`).innerText=""
    if(formdata[0].value == ""){
        document.getElementById(`_ID`).innerText="Id can't be null";
    }
    else if(formdata[1].value == ""){
        document.getElementById(`_FirstName`).innerText="Firstname can't be null";
    }
    else if(!pattern.test(formdata[1].value)){
        document.getElementById(`_FirstName`).innerText="Firstname characters must be between a to z";
    }
    else if(formdata[2].value == ""){
        document.getElementById(`_LastName`).innerText="Lastname can't be null";
    }
    else if(!pattern.test(formdata[2].value)){
        document.getElementById(`_LastName`).innerText="Lastname characters must be between a to z";
    }
    else if(formdata[3].value == ""){
        document.getElementById(`_Gender`).innerText="Gender can't be null";
    }
    else if(formdata[4].value == ""){
        document.getElementById(`_Address`).innerText="Address can't be null";
    }
    else if(formdata[5].value == ""){
        document.getElementById(`_GPA`).innerText="Gpa can't be null";
    }
    else if(formdata[5].value<0 || formdata[5].value>4){
        document.getElementById(`_GPA`).innerText="Gpa must be number between 0 to 4";
    }
    else if(formdata[6].value == ""){
        document.getElementById(`_Level`).innerText="Level can't be null";
    }
    else{
        let form_data = {
            _ID : formdata[0].value,
            _FirstName:formdata[1].value,
            _LastName: formdata[2].value,
            _Gender: formdata[3].value,
            _Address: formdata[4].value,
            _GPA: formdata[5].value,
            _Level: formdata[6].value
        }
        console.log(form_data);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/student/edit",
            data: JSON.stringify(form_data),
            dataType: 'json',
            cache: false,
            timeout: 600000,
            success: function (data) {
                console.log(data);
                window.location.href = "http://localhost:8080/show";
            },
            error: function (e) {
                console.log("ERROR");
            }
        });
    }

});