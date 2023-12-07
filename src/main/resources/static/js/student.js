$(function(){
    $("#form").on('submit',function(e){
        e.preventDefault();
        let number = document.getElementById("num").value;
        document.cookie = `students=${number}`; 

        window.location.href = "http://localhost:8080/students";
    })
});