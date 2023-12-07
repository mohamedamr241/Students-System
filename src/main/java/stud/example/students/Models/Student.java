package stud.example.students.Models;

public class Student {
    public String _ID;
    public String _FirstName;
    public String _LastName;
    public String _Gender;
    public String _Address;
    public String _GPA;
    public String _Level;

    public Student() {
        _ID = "";
        _FirstName = "";
        _LastName = "";
        _Gender = "";
        _Address = "";
        _GPA = "";
        _Level = "";
    }

    public Student(String id, String firstname, String lastname, String gender, String address, String gpa,
            String level) {
        _ID = id;
        _FirstName = firstname;
        _LastName = lastname;
        _Gender = gender;
        _Address = address;
        _GPA = gpa;
        _Level = level;
    }
}
