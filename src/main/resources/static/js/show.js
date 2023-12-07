$.ajax({
    type: "GET",
    contentType: "application/json",
    url: "/student/get",
    cache: false,
    timeout: 600000,
    success: function (data) {
        let student = data;
        console.log(data);
        let tableT = document.getElementById('table');
        if(tableT != null){
            tableT.remove()
        }
        if(student.length == 0){
            document.getElementById('error').textContent="No result found"
        }
        else{
            document.getElementById('error').textContent=""
            
            let target = document.getElementById('all');
                var table = document.createElement('table');
                table.className = 'table table-bordered table-striped';
                table.id = 'tt';
                // Create thead element and its row
                var thead = document.createElement('thead');
                var theadRow = document.createElement('tr');
    
                // Array of header titles
                var headers = ['Id', 'Firstname', 'Lastname', 'Gender', 'GPA', 'Level', 'Address'];
    
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
                td5.appendChild(document.createTextNode(student[x]._GPA));
                tbodyRow.appendChild(td5);
                let td6 = document.createElement('td');
                td6.appendChild(document.createTextNode(student[x]._Level));
                tbodyRow.appendChild(td6);
                let td7 = document.createElement('td');
                td7.appendChild(document.createTextNode(student[x]._Address));
                tbodyRow.appendChild(td7)
                let td8 = document.createElement('td');
                var link = document.createElement("button");
                link.classList.add("btn", "btn-primary", "mx-2","edit");
                var icon = document.createElement("i");
                icon.classList.add("bi", "bi-pencil-square");
                link.appendChild(icon);
                link.appendChild(document.createTextNode("Edit"));
                td8.appendChild(link)
                tbodyRow.appendChild(td8)

                tbody.appendChild(tbodyRow);
                table.appendChild(tbody);
                target.appendChild(table);
            }
            let edit = document.querySelectorAll('.edit');
            console.log(edit)
            for(let x =0 ; x<edit.length;x++){
                edit[x].addEventListener('click',(e)=>{
                    let parent = (edit[x].parentNode).parentNode;
                    let id = ((parent.firstChild).firstChild).nodeValue;
                    console.log(id);
                    window.location.href=`http://localhost:8080/edit/${id}`
                })
            }

        }
    },
    error: function (e) {
        console.log("ERROR");
    }
});

