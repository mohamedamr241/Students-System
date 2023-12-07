let form = document.getElementById('delete');

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    let form_data = {
        _ID:form[0].value
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/student/delete",
        data: JSON.stringify(form_data),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            document.getElementById("danger").textContent="";
            document.getElementById("success").textContent="";
            if(data.msg == "User not found!"){
                document.getElementById("danger").textContent= `User with id: ${form[0].value} not found!`
            }
            else{

                document.getElementById("success").textContent= `Successfully deleted student with id: ${form[0].value}`
            }
        },
        error: function (e) {
            document.getElementById("danger").textContent="";
            document.getElementById("danger").textContent= `error while deleting student with id: ${form[0].value}`

        }
    });
})