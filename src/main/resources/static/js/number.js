function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');

    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return null; 
}
function deleteCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
let number = getCookie("students");

let target = document.getElementById('target');

for(let i=0;i<number;i++){
        // Create form element
        var form = document.createElement('form');
        form.setAttribute('action', '');
        // form.setAttribute('method', 'post');
        form.classList.add('ff');

        // Create div elements with associated labels, inputs, and spans
        var fields = [
            { label: 'Id', name: '_ID' },
            { label: 'First name', name: '_FirstName' },
            { label: 'Last name', name: '_LastName' },
            { label: 'Gender', name: '_Gender' },
            { label: 'Address', name: '_Address' },
            { label: 'GPA', name: '_GPA' },
            { label: 'Level', name: '_Level' }
        ];
        var h4 = document.createElement('h4');
        h4.classList.add('text-primary');
        h4.textContent = `Add Student ${i+1}`;
        form.appendChild(h4);
        fields.forEach(function(field) {
        var div = document.createElement('div');
        div.classList.add('mb-3');

        var label = document.createElement('label');
        label.textContent = field.label;

        var input = document.createElement('input');
        input.classList.add('form-control');
        input.setAttribute('name', field.name);
        //input.setAttribute('required', 'true');
        // if(field.name == "_FirstName" || field.name == "_LastName"){
        //     input.setAttribute("pattern", "^[a-z]+$");
        //     label.textContent = field.label + "(Enter only characters (a-z)";
        // }
        // if(field.name == "_GPA"){
        //     //input.setAttribute("pattern", "^[0-4](\.\d+)?$");
        //     label.textContent = field.label + "(Enter only number (0-4)";
        // }
        var span = document.createElement('span');
        span.classList.add('text-danger');
        span.id = field.name+(i+1);
        div.appendChild(label);
        div.appendChild(input);
        div.appendChild(span);
        form.appendChild(div);
});

    // Create submit button
    var button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.classList.add('btn', 'btn-primary');
    button.setAttribute('style', 'width: 150px');
    button.textContent = 'Create';

    // Create success message paragraph
    var successMessage = document.createElement('p');
    successMessage.classList.add('text-danger');
    successMessage.id=`form${i+1}`

    // Append form, button, and success message to the body
    document.body.appendChild(form);
    form.appendChild(button);
    form.appendChild(successMessage);
    target.appendChild(form);
}


let AllForms = document.getElementsByClassName('ff');
console.log(AllForms);
// Iterate over each form and add a submit event listener
for (let i = 0; i < AllForms.length; i++) {
    AllForms[i].addEventListener('submit', function (e) {
        e.preventDefault(); 
        var pattern = /^[a-z]+$/;
        let formdata = this;
        console.log(pattern.test(formdata[3].value));
        document.getElementById(`_ID${i+1}`).innerText="";
        document.getElementById(`_FirstName${i+1}`).innerText="";
        document.getElementById(`_LastName${i+1}`).innerText="";
        document.getElementById(`_Gender${i+1}`).innerText="";
        document.getElementById(`_Address${i+1}`).innerText="";
        document.getElementById(`_GPA${i+1}`).innerText="";
        document.getElementById(`_Level${i+1}`).innerText=""
        if(formdata[0].value == ""){
            document.getElementById(`_ID${i+1}`).innerText="Id can't be null";
        }
        else if(formdata[1].value == ""){
            document.getElementById(`_FirstName${i+1}`).innerText="Firstname can't be null";
        }
        else if(!pattern.test(formdata[1].value)){
            document.getElementById(`_FirstName${i+1}`).innerText="Firstname characters must be between a to z";
        }
        else if(formdata[2].value == ""){
            document.getElementById(`_LastName${i+1}`).innerText="Lastname can't be null";
        }
        else if(!pattern.test(formdata[2].value)){
            document.getElementById(`_LastName${i+1}`).innerText="Lastname characters must be between a to z";
        }
        else if(formdata[3].value == ""){
            document.getElementById(`_Gender${i+1}`).innerText="Gender can't be null";
        }
        else if(formdata[4].value == ""){
            document.getElementById(`_Address${i+1}`).innerText="Address can't be null";
        }
        else if(formdata[5].value == ""){
            document.getElementById(`_GPA${i+1}`).innerText="Gpa can't be null";
        }
        else if(formdata[5].value<0 || formdata[5].value>4){
            document.getElementById(`_GPA${i+1}`).innerText="Gpa must be number between 0 to 4";
        }
        else if(formdata[6].value == ""){
            document.getElementById(`_Level${i+1}`).innerText="Level can't be null";
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
                url: "/student/create",
                data: JSON.stringify(form_data),
                dataType: 'json',
                cache: false,
                timeout: 600000,
                success: function (data) {
                    console.log(data);
                    if(data.msg =="Id already exist!"){
                        document.getElementById(`form${i+1}`).innerText=data.msg;
                    }
                    else{

                        console.log("SUCCESS");
                        formdata.remove();
                        let targetDiv = document.getElementById('target');
                        let children = targetDiv.children;
                        let check =false;
                        for (let i = 0; i < children.length; i++) {
                            if (children[i].tagName.toLowerCase() === 'form') {
                                check=true;
                                break;
                            }
                        }
                        if(!check){
                            deleteCookie("students");
                            window.location.href = "http://localhost:8080/";
                        }
                    }
                },
                error: function (e) {
                    console.log("ERROR");
                }
            });
        }

    });
}
