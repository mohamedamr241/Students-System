package stud.example.students.Models;

import java.util.ArrayList;

public class AjaxResponseBody {
    String msg;
    public ArrayList<Student> stu = new ArrayList<>();

    public void setMsg(String message) {
        msg = message;
    }

    public String getMsg() {
        return msg;
    }
}
