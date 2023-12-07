let radio = document.getElementsByClassName('rad');
console.log(radio);
let formId = document.getElementById("id");
let formfirstname = document.getElementById("firstname");
let formlastname = document.getElementById("lastname");
let formgender = document.getElementById("gender");
let formAddress = document.getElementById("address");
let formgpa = document.getElementById("gpa");
let formlevel = document.getElementById("level");

radio[0].addEventListener("change", (e) => {
    if (e.target.checked) {
        formId.removeAttribute("hidden");
        formfirstname.setAttribute('hidden', 'true');
        formlastname.setAttribute('hidden', 'true');
        formgender.setAttribute('hidden', 'true');
        formAddress.setAttribute('hidden', 'true');
        formgpa.setAttribute('hidden', 'true');
        formlevel.setAttribute('hidden', 'true');
    }
});

radio[1].addEventListener("change", (e) => {
    if (e.target.checked) {
        formfirstname.removeAttribute("hidden");
        formId.setAttribute('hidden', 'true');
        formlastname.setAttribute('hidden', 'true');
        formgender.setAttribute('hidden', 'true');
        formAddress.setAttribute('hidden', 'true');
        formgpa.setAttribute('hidden', 'true');
        formlevel.setAttribute('hidden', 'true');
    }
});

radio[2].addEventListener("change", (e) => {
    if (e.target.checked) {
        formlastname.removeAttribute("hidden");
        formId.setAttribute('hidden', 'true');
        formfirstname.setAttribute('hidden', 'true');
        formgender.setAttribute('hidden', 'true');
        formAddress.setAttribute('hidden', 'true');
        formgpa.setAttribute('hidden', 'true');
        formlevel.setAttribute('hidden', 'true');
    }
});

radio[3].addEventListener("change", (e) => {
    if (e.target.checked) {
        formgender.removeAttribute("hidden");
        formId.setAttribute('hidden', 'true');
        formlastname.setAttribute('hidden', 'true');
        formfirstname.setAttribute('hidden', 'true');
        formAddress.setAttribute('hidden', 'true');
        formgpa.setAttribute('hidden', 'true');
        formlevel.setAttribute('hidden', 'true');
    }
});
radio[4].addEventListener("change", (e) => {
    if (e.target.checked) {
        formAddress.removeAttribute("hidden");
        formId.setAttribute('hidden', 'true');
        formlastname.setAttribute('hidden', 'true');
        formfirstname.setAttribute('hidden', 'true');
        formgender.setAttribute('hidden', 'true');
        formgpa.setAttribute('hidden', 'true');
        formlevel.setAttribute('hidden', 'true');
    }
});
radio[5].addEventListener("change", (e) => {
    if (e.target.checked) {
        formgpa.removeAttribute("hidden");
        formId.setAttribute('hidden', 'true');
        formlastname.setAttribute('hidden', 'true');
        formfirstname.setAttribute('hidden', 'true');
        formAddress.setAttribute('hidden', 'true');
        formgender.setAttribute('hidden', 'true');
        formlevel.setAttribute('hidden', 'true');
    }
});
radio[6].addEventListener("change", (e) => {
    if (e.target.checked) {
        formlevel.removeAttribute("hidden");
        formId.setAttribute('hidden', 'true');
        formlastname.setAttribute('hidden', 'true');
        formfirstname.setAttribute('hidden', 'true');
        formAddress.setAttribute('hidden', 'true');
        formgpa.setAttribute('hidden', 'true');
        formgender.setAttribute('hidden', 'true');
    }
});
function resetNumber(lenOfStud){
    document.getElementById("numofstudent").innerText=`number of students is ${lenOfStud}`;
}
formlevel.addEventListener('submit',(e)=>{
    e.preventDefault();

    let form_data = {
        _Level:formlevel[0].value
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/student/searchLevel",
        data: JSON.stringify(form_data),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            let student = data.stu;
            console.log(data.stu);
            let tableT = document.getElementById('tt');
            if(tableT != null){
                tableT.remove()
            }
            if(student.length == 0){
                resetNumber(0);
                document.getElementById('error').textContent="No result found"
            }
            else{
                document.getElementById('error').textContent=""
                resetNumber(student.length);
                
                let target = document.getElementById('all');
                    var table = document.createElement('table');
                    table.className = 'table table-bordered table-striped';
                    table.id = 'tt';
                    // Create thead element and its row
                    var thead = document.createElement('thead');
                    var theadRow = document.createElement('tr');
        
                    // Array of header titles
                    var headers = ['Id', 'Firstname', 'Lastname', 'Gender', 'Address', 'GPA', 'Level'];
        
                    // Create th elements for headers
                    for (var i = 0; i < headers.length; i++) {
                        var th = document.createElement('th');
                        th.appendChild(document.createTextNode(headers[i]));
                        theadRow.appendChild(th);
                    }
        
                    // Append theadRow to thead and thead to table
                    thead.appendChild(theadRow);
                    table.appendChild(thead);
                for(let x =0; x<student.length;x++){
                    
        
                    // Create tbody element and its row
                    var tbody = document.createElement('tbody');
                    var tbodyRow = document.createElement('tr');
        
                    // Create td elements for table data
                    let td = document.createElement('td');
                    td.appendChild(document.createTextNode(student[x]._ID));
                    tbodyRow.appendChild(td);
                    let td2 = document.createElement('td');
                    td2.appendChild(document.createTextNode(student[x]._FirstName));
                    tbodyRow.appendChild(td2);
                    let td3 = document.createElement('td');
                    td3.appendChild(document.createTextNode(student[x]._LastName));
                    tbodyRow.appendChild(td3);
                    let td4 = document.createElement('td');
                    td4.appendChild(document.createTextNode(student[x]._Gender));
                    tbodyRow.appendChild(td4);
                    let td5 = document.createElement('td');
                    td5.appendChild(document.createTextNode(student[x]._Address));
                    tbodyRow.appendChild(td5);
                    let td6 = document.createElement('td');
                    td6.appendChild(document.createTextNode(student[x]._GPA));
                    tbodyRow.appendChild(td6);
                    let td7 = document.createElement('td');
                    td7.appendChild(document.createTextNode(student[x]._Level));
                    tbodyRow.appendChild(td7)
        
                    // Append tbodyRow to tbody and tbody to table
                    tbody.appendChild(tbodyRow);
                    table.appendChild(tbody);
                    target.appendChild(table);
                }
            }
        },
        error: function (e) {
            console.log("ERROR");
        }
    });
})
formId.addEventListener('submit',(e)=>{
    e.preventDefault();

    let form_data = {
        _ID:formId[0].value
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/student/searchId",
        data: JSON.stringify(form_data),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            let student = data.stu;
            console.log(data.stu);
            let tableT = document.getElementById('tt');
            if(tableT != null){
                tableT.remove()
            }
            if(student.length == 0){
                resetNumber(0);
                document.getElementById('error').textContent="No result found"
            }
            else{
                document.getElementById('error').textContent=""
                resetNumber(student.length);
                
                let target = document.getElementById('all');
                    var table = document.createElement('table');
                    table.className = 'table table-bordered table-striped';
                    table.id = 'tt';
                    // Create thead element and its row
                    var thead = document.createElement('thead');
                    var theadRow = document.createElement('tr');
        
                    // Array of header titles
                    var headers = ['Id', 'Firstname', 'Lastname', 'Gender', 'Address', 'GPA', 'Level'];
        
                    // Create th elements for headers
                    for (var i = 0; i < headers.length; i++) {
                        var th = document.createElement('th');
                        th.appendChild(document.createTextNode(headers[i]));
                        theadRow.appendChild(th);
                    }
        
                    // Append theadRow to thead and thead to table
                    thead.appendChild(theadRow);
                    table.appendChild(thead);
                for(let x =0; x<student.length;x++){
                    
        
                    // Create tbody element and its row
                    var tbody = document.createElement('tbody');
                    var tbodyRow = document.createElement('tr');
        
                    // Create td elements for table data
                    let td = document.createElement('td');
                    td.appendChild(document.createTextNode(student[x]._ID));
                    tbodyRow.appendChild(td);
                    let td2 = document.createElement('td');
                    td2.appendChild(document.createTextNode(student[x]._FirstName));
                    tbodyRow.appendChild(td2);
                    let td3 = document.createElement('td');
                    td3.appendChild(document.createTextNode(student[x]._LastName));
                    tbodyRow.appendChild(td3);
                    let td4 = document.createElement('td');
                    td4.appendChild(document.createTextNode(student[x]._Gender));
                    tbodyRow.appendChild(td4);
                    let td5 = document.createElement('td');
                    td5.appendChild(document.createTextNode(student[x]._Address));
                    tbodyRow.appendChild(td5);
                    let td6 = document.createElement('td');
                    td6.appendChild(document.createTextNode(student[x]._GPA));
                    tbodyRow.appendChild(td6);
                    let td7 = document.createElement('td');
                    td7.appendChild(document.createTextNode(student[x]._Level));
                    tbodyRow.appendChild(td7)
        
                    // Append tbodyRow to tbody and tbody to table
                    tbody.appendChild(tbodyRow);
                    table.appendChild(tbody);
                    target.appendChild(table);
                }
            }
        },
        error: function (e) {
            console.log("ERROR");
        }
    });
})
formlastname.addEventListener('submit',(e)=>{
    e.preventDefault();

    let form_data = {
        _LastName:formlastname[0].value
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/student/searchLastName",
        data: JSON.stringify(form_data),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            let student = data.stu;
            console.log(data.stu);
            let tableT = document.getElementById('tt');
            if(tableT != null){
                tableT.remove()
            }
            if(student.length == 0){
                resetNumber(0);
                document.getElementById('error').textContent="No result found"
            }
            else{
                document.getElementById('error').textContent=""
                resetNumber(student.length);
                
                let target = document.getElementById('all');

                    var table = document.createElement('table');
                    table.className = 'table table-bordered table-striped';
                    table.id = 'tt';
                    // Create thead element and its row
                    var thead = document.createElement('thead');
                    var theadRow = document.createElement('tr');
        
                    // Array of header titles
                    var headers = ['Id', 'Firstname', 'Lastname', 'Gender', 'Address', 'GPA', 'Level'];
        
                    // Create th elements for headers
                    for (var i = 0; i < headers.length; i++) {
                        var th = document.createElement('th');
                        th.appendChild(document.createTextNode(headers[i]));
                        theadRow.appendChild(th);
                    }
        
                    // Append theadRow to thead and thead to table
                    thead.appendChild(theadRow);
                    table.appendChild(thead);
                for(let x =0; x<student.length;x++){
                    
        
                    // Create tbody element and its row
                    var tbody = document.createElement('tbody');
                    var tbodyRow = document.createElement('tr');
        
                    // Create td elements for table data
                    let td = document.createElement('td');
                    td.appendChild(document.createTextNode(student[x]._ID));
                    tbodyRow.appendChild(td);
                    let td2 = document.createElement('td');
                    td2.appendChild(document.createTextNode(student[x]._FirstName));
                    tbodyRow.appendChild(td2);
                    let td3 = document.createElement('td');
                    td3.appendChild(document.createTextNode(student[x]._LastName));
                    tbodyRow.appendChild(td3);
                    let td4 = document.createElement('td');
                    td4.appendChild(document.createTextNode(student[x]._Gender));
                    tbodyRow.appendChild(td4);
                    let td5 = document.createElement('td');
                    td5.appendChild(document.createTextNode(student[x]._Address));
                    tbodyRow.appendChild(td5);
                    let td6 = document.createElement('td');
                    td6.appendChild(document.createTextNode(student[x]._GPA));
                    tbodyRow.appendChild(td6);
                    let td7 = document.createElement('td');
                    td7.appendChild(document.createTextNode(student[x]._Level));
                    tbodyRow.appendChild(td7)
        
                    // Append tbodyRow to tbody and tbody to table
                    tbody.appendChild(tbodyRow);
                    table.appendChild(tbody);
                    target.appendChild(table);
                }
            }
        },
        error: function (e) {
            console.log("ERROR");
        }
    });
})
formAddress.addEventListener('submit',(e)=>{
    e.preventDefault();

    let form_data = {
        _Address:formAddress[0].value
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/student/searchAddress",
        data: JSON.stringify(form_data),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            let student = data.stu;
            console.log(data.stu);
            let tableT = document.getElementById('tt');
            if(tableT != null){
                tableT.remove()
            }
            if(student.length == 0){
                resetNumber(0);
                document.getElementById('error').textContent="No result found"
            }
            else{
                document.getElementById('error').textContent=""
                resetNumber(student.length);
                
                let target = document.getElementById('all');
                    var table = document.createElement('table');
                    table.className = 'table table-bordered table-striped';
                    table.id = 'tt';
                    // Create thead element and its row
                    var thead = document.createElement('thead');
                    var theadRow = document.createElement('tr');
        
                    // Array of header titles
                    var headers = ['Id', 'Firstname', 'Lastname', 'Gender', 'Address', 'GPA', 'Level'];
        
                    // Create th elements for headers
                    for (var i = 0; i < headers.length; i++) {
                        var th = document.createElement('th');
                        th.appendChild(document.createTextNode(headers[i]));
                        theadRow.appendChild(th);
                    }
        
                    // Append theadRow to thead and thead to table
                    thead.appendChild(theadRow);
                    table.appendChild(thead);
                for(let x =0; x<student.length;x++){
                    
        
                    // Create tbody element and its row
                    var tbody = document.createElement('tbody');
                    var tbodyRow = document.createElement('tr');
        
                    // Create td elements for table data
                    let td = document.createElement('td');
                    td.appendChild(document.createTextNode(student[x]._ID));
                    tbodyRow.appendChild(td);
                    let td2 = document.createElement('td');
                    td2.appendChild(document.createTextNode(student[x]._FirstName));
                    tbodyRow.appendChild(td2);
                    let td3 = document.createElement('td');
                    td3.appendChild(document.createTextNode(student[x]._LastName));
                    tbodyRow.appendChild(td3);
                    let td4 = document.createElement('td');
                    td4.appendChild(document.createTextNode(student[x]._Gender));
                    tbodyRow.appendChild(td4);
                    let td5 = document.createElement('td');
                    td5.appendChild(document.createTextNode(student[x]._Address));
                    tbodyRow.appendChild(td5);
                    let td6 = document.createElement('td');
                    td6.appendChild(document.createTextNode(student[x]._GPA));
                    tbodyRow.appendChild(td6);
                    let td7 = document.createElement('td');
                    td7.appendChild(document.createTextNode(student[x]._Level));
                    tbodyRow.appendChild(td7)
        
                    // Append tbodyRow to tbody and tbody to table
                    tbody.appendChild(tbodyRow);
                    table.appendChild(tbody);
                    target.appendChild(table);
                }
            }
        },
        error: function (e) {
            console.log("ERROR");
        }
    });
})
formgender.addEventListener('submit',(e)=>{
    e.preventDefault();

    let form_data = {
        _Gender:formgender[0].value
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/student/searchGender",
        data: JSON.stringify(form_data),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            let student = data.stu;
            console.log(data.stu);
            let tableT = document.getElementById('tt');
            if(tableT != null){
                tableT.remove()
            }
            if(student.length == 0){
                resetNumber(0);
                document.getElementById('error').textContent="No result found"
            }
            else{
                document.getElementById('error').textContent=""
                resetNumber(student.length);
                
                let target = document.getElementById('all');
                    var table = document.createElement('table');
                    table.className = 'table table-bordered table-striped';
                    table.id = 'tt';
                    // Create thead element and its row
                    var thead = document.createElement('thead');
                    var theadRow = document.createElement('tr');
        
                    // Array of header titles
                    var headers = ['Id', 'Firstname', 'Lastname', 'Gender', 'Address', 'GPA', 'Level'];
        
                    // Create th elements for headers
                    for (var i = 0; i < headers.length; i++) {
                        var th = document.createElement('th');
                        th.appendChild(document.createTextNode(headers[i]));
                        theadRow.appendChild(th);
                    }
        
                    // Append theadRow to thead and thead to table
                    thead.appendChild(theadRow);
                    table.appendChild(thead);
                for(let x =0; x<student.length;x++){
                    
        
                    // Create tbody element and its row
                    var tbody = document.createElement('tbody');
                    var tbodyRow = document.createElement('tr');
        
                    // Create td elements for table data
                    let td = document.createElement('td');
                    td.appendChild(document.createTextNode(student[x]._ID));
                    tbodyRow.appendChild(td);
                    let td2 = document.createElement('td');
                    td2.appendChild(document.createTextNode(student[x]._FirstName));
                    tbodyRow.appendChild(td2);
                    let td3 = document.createElement('td');
                    td3.appendChild(document.createTextNode(student[x]._LastName));
                    tbodyRow.appendChild(td3);
                    let td4 = document.createElement('td');
                    td4.appendChild(document.createTextNode(student[x]._Gender));
                    tbodyRow.appendChild(td4);
                    let td5 = document.createElement('td');
                    td5.appendChild(document.createTextNode(student[x]._Address));
                    tbodyRow.appendChild(td5);
                    let td6 = document.createElement('td');
                    td6.appendChild(document.createTextNode(student[x]._GPA));
                    tbodyRow.appendChild(td6);
                    let td7 = document.createElement('td');
                    td7.appendChild(document.createTextNode(student[x]._Level));
                    tbodyRow.appendChild(td7)
        
                    // Append tbodyRow to tbody and tbody to table
                    tbody.appendChild(tbodyRow);
                    table.appendChild(tbody);
                    target.appendChild(table);
                }
            }
        },
        error: function (e) {
            console.log("ERROR");
        }
    });
})
formgpa.addEventListener('submit',(e)=>{
    e.preventDefault();

    let form_data = {
        _GPA: formgpa[0].value
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/student/searchGpa",
        data: JSON.stringify(form_data),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            let student = data.stu;
            console.log(data.stu);
            let tableT = document.getElementById('tt');
            if(tableT != null){
                tableT.remove()
            }
            if(student.length == 0){
                resetNumber(0);
                document.getElementById('error').textContent="No result found"
            }
            else{
                document.getElementById('error').textContent=""
                resetNumber(student.length);
                
                let target = document.getElementById('all');
                    var table = document.createElement('table');
                    table.className = 'table table-bordered table-striped';
                    table.id = 'tt';
                    // Create thead element and its row
                    var thead = document.createElement('thead');
                    var theadRow = document.createElement('tr');
        
                    // Array of header titles
                    var headers = ['Id', 'Firstname', 'Lastname', 'Gender', 'Address', 'GPA', 'Level'];
        
                    // Create th elements for headers
                    for (var i = 0; i < headers.length; i++) {
                        var th = document.createElement('th');
                        th.appendChild(document.createTextNode(headers[i]));
                        theadRow.appendChild(th);
                    }
        
                    // Append theadRow to thead and thead to table
                    thead.appendChild(theadRow);
                    table.appendChild(thead);
                for(let x =0; x<student.length;x++){
                    
        
                    // Create tbody element and its row
                    var tbody = document.createElement('tbody');
                    var tbodyRow = document.createElement('tr');
        
                    // Create td elements for table data
                    let td = document.createElement('td');
                    td.appendChild(document.createTextNode(student[x]._ID));
                    tbodyRow.appendChild(td);
                    let td2 = document.createElement('td');
                    td2.appendChild(document.createTextNode(student[x]._FirstName));
                    tbodyRow.appendChild(td2);
                    let td3 = document.createElement('td');
                    td3.appendChild(document.createTextNode(student[x]._LastName));
                    tbodyRow.appendChild(td3);
                    let td4 = document.createElement('td');
                    td4.appendChild(document.createTextNode(student[x]._Gender));
                    tbodyRow.appendChild(td4);
                    let td5 = document.createElement('td');
                    td5.appendChild(document.createTextNode(student[x]._Address));
                    tbodyRow.appendChild(td5);
                    let td6 = document.createElement('td');
                    td6.appendChild(document.createTextNode(student[x]._GPA));
                    tbodyRow.appendChild(td6);
                    let td7 = document.createElement('td');
                    td7.appendChild(document.createTextNode(student[x]._Level));
                    tbodyRow.appendChild(td7)
        
                    // Append tbodyRow to tbody and tbody to table
                    tbody.appendChild(tbodyRow);
                    table.appendChild(tbody);
                    target.appendChild(table);
                }
            }
        },
        error: function (e) {
            console.log("ERROR");
        }
    });
})

formfirstname.addEventListener('submit',(e)=>{
    e.preventDefault();

    let form_data = {
        _FirstName:formfirstname[0].value
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/student/searchFirstName",
        data: JSON.stringify(form_data),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            let student = data.stu;
            console.log(data.stu);
            let tableT = document.getElementById('tt');
            if(tableT != null){
                tableT.remove()
            }
            if(student.length == 0){
                resetNumber(0);
                document.getElementById('error').textContent="No result found"
            }
            else{
                document.getElementById('error').textContent=""
                resetNumber(student.length);
                
                let target = document.getElementById('all');
                var table = document.createElement('table');
                    table.className = 'table table-bordered table-striped';
                    table.id = 'tt';
                    // Create thead element and its row
                    var thead = document.createElement('thead');
                    var theadRow = document.createElement('tr');
        
                    // Array of header titles
                    var headers = ['Id', 'Firstname', 'Lastname', 'Gender', 'Address', 'GPA', 'Level'];
        
                    // Create th elements for headers
                    for (var i = 0; i < headers.length; i++) {
                        var th = document.createElement('th');
                        th.appendChild(document.createTextNode(headers[i]));
                        theadRow.appendChild(th);
                    }
        
                    // Append theadRow to thead and thead to table
                    thead.appendChild(theadRow);
                    table.appendChild(thead);
                for(let x =0; x<student.length;x++){
                    
        
                    // Create tbody element and its row
                    var tbody = document.createElement('tbody');
                    var tbodyRow = document.createElement('tr');
        
                    // Create td elements for table data
                    let td = document.createElement('td');
                    td.appendChild(document.createTextNode(student[x]._ID));
                    tbodyRow.appendChild(td);
                    let td2 = document.createElement('td');
                    td2.appendChild(document.createTextNode(student[x]._FirstName));
                    tbodyRow.appendChild(td2);
                    let td3 = document.createElement('td');
                    td3.appendChild(document.createTextNode(student[x]._LastName));
                    tbodyRow.appendChild(td3);
                    let td4 = document.createElement('td');
                    td4.appendChild(document.createTextNode(student[x]._Gender));
                    tbodyRow.appendChild(td4);
                    let td5 = document.createElement('td');
                    td5.appendChild(document.createTextNode(student[x]._Address));
                    tbodyRow.appendChild(td5);
                    let td6 = document.createElement('td');
                    td6.appendChild(document.createTextNode(student[x]._GPA));
                    tbodyRow.appendChild(td6);
                    let td7 = document.createElement('td');
                    td7.appendChild(document.createTextNode(student[x]._Level));
                    tbodyRow.appendChild(td7)
        
                    // Append tbodyRow to tbody and tbody to table
                    tbody.appendChild(tbodyRow);
                    table.appendChild(tbody);
                    target.appendChild(table);
                }
            }
        },
        error: function (e) {
            console.log("ERROR");
        }
    });
})