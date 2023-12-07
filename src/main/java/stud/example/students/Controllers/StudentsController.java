package stud.example.students.Controllers;

import java.io.IOException;
import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.xml.sax.SAXException;

import stud.example.students.Models.AjaxResponseBody;
import stud.example.students.Models.SortTemp;
import stud.example.students.Models.Student;

@RestController
public class StudentsController {

    public StudentsController() throws SAXException, IOException {
        XmlController.buildXml();
        XmlController.readTheData();
    }

    @RequestMapping(value = "/student/create", method = RequestMethod.POST)
    public ResponseEntity<?> StoreStudent(@RequestBody Student stu)
            throws SAXException, IOException {
        AjaxResponseBody result = new AjaxResponseBody();
        String pattern = "^[a-z]+$";
        if (stu._ID == "" || stu._ID == null) {
            result.setMsg("Id can't be null");
            return ResponseEntity.ok(result);
        } else if (stu._FirstName == "" || stu._FirstName == null) {
            result.setMsg("Firstname can't be null");
            return ResponseEntity.ok(result);
        } else if (!stu._FirstName.matches(pattern)) {
            result.setMsg("Firstname characters must be between a to z");
            return ResponseEntity.ok(result);
        } else if (stu._LastName == "" || stu._LastName == null) {
            result.setMsg("Lastname can't be null");
            return ResponseEntity.ok(result);
        } else if (!stu._LastName.matches(pattern)) {
            result.setMsg("Lastname characters must be between a to z");
            return ResponseEntity.ok(result);
        } else if (stu._Gender == "" || stu._Gender == null) {
            result.setMsg("Gender can't be null");
            return ResponseEntity.ok(result);
        } else if (stu._Address == "" || stu._Address == null) {
            result.setMsg("Address can't be null");
            return ResponseEntity.ok(result);
        } else if (stu._Level == "" || stu._Level == null) {
            result.setMsg("Level can't be null");
            return ResponseEntity.ok(result);
        } else if (stu._GPA == "" || stu._GPA == null) {
            result.setMsg("Gpa can't be null");
            return ResponseEntity.ok(result);
        } else if (Double.parseDouble(stu._GPA) < 0 || Double.parseDouble(stu._GPA) > 4) {
            result.setMsg("Gpa must be number between 0 to 4");
            return ResponseEntity.ok(result);
        } else {
            System.out.println("controller " + stu._ID);
            Student std = new Student(stu._ID, stu._FirstName, stu._LastName, stu._Gender, stu._Address, stu._GPA,
                    stu._Level);

            String msg = XmlController.StoreData(std);
            result.setMsg(msg);
            return ResponseEntity.ok(result);
        }
    }

    @RequestMapping(value = "/student/get", method = RequestMethod.GET)
    public ArrayList<Student> getAllStudents() {
        return XmlController.AllStudents;
    }

    @RequestMapping(value = "/student/get/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getstudent(@PathVariable String id) {
        ArrayList<Student> result = new ArrayList<Student>();
        for (Student stu : XmlController.AllStudents) {
            if (stu._ID.equals(id)) {
                result.add(stu);
                break;
            }
        }
        AjaxResponseBody res = new AjaxResponseBody();
        res.stu = result;
        return ResponseEntity.ok(res);
    }

    // IMPLEMENT THIS JOE
    @RequestMapping(value = "/student/delete", method = RequestMethod.POST)
    public ResponseEntity<?> DeleteStudent(@RequestBody Student stu) {
        String res = XmlController.deleteStudentById(stu._ID);
        AjaxResponseBody result = new AjaxResponseBody();
        result.setMsg(res);
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = "/student/searchId", method = RequestMethod.POST)
    public ResponseEntity<?> SearchStudentById(@RequestBody Student stu) {
        ArrayList<Student> result = XmlController.getStudentsById(stu._ID);
        AjaxResponseBody response = new AjaxResponseBody();
        response.stu = result;
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/student/searchFirstName", method = RequestMethod.POST)
    public ResponseEntity<?> SearchStudentByFirstname(@RequestBody Student stu) {
        ArrayList<Student> result = XmlController.getStudentsByFirstName(stu._FirstName);
        AjaxResponseBody response = new AjaxResponseBody();
        response.stu = result;
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/student/searchLastName", method = RequestMethod.POST)
    public ResponseEntity<?> SearchStudentByLastname(@RequestBody Student stu) {
        ArrayList<Student> result = XmlController.getStudentsByLastName(stu._LastName);
        AjaxResponseBody response = new AjaxResponseBody();
        response.stu = result;
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/student/searchGender", method = RequestMethod.POST)
    public ResponseEntity<?> SearchStudentByGender(@RequestBody Student stu) {
        ArrayList<Student> result = XmlController.getStudentsByGender(stu._Gender);
        AjaxResponseBody response = new AjaxResponseBody();
        response.stu = result;
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/student/searchAddress", method = RequestMethod.POST)
    public ResponseEntity<?> SearchStudentByAddress(@RequestBody Student stu) {
        ArrayList<Student> result = XmlController.getStudentsByAddress(stu._Address);
        AjaxResponseBody response = new AjaxResponseBody();
        response.stu = result;
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/student/searchGpa", method = RequestMethod.POST)
    public ResponseEntity<?> SearchStudentByGpa(@RequestBody Student stu) {
        ArrayList<Student> result = XmlController.getStudentsByGPA(stu._GPA);
        AjaxResponseBody response = new AjaxResponseBody();
        response.stu = result;
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/student/searchLevel", method = RequestMethod.POST)
    public ResponseEntity<?> SearchStudentByLevel(@RequestBody Student stu) {
        ArrayList<Student> result = XmlController.getStudentsByLevel(stu._Level);
        AjaxResponseBody response = new AjaxResponseBody();
        response.stu = result;
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/student/sort", method = RequestMethod.POST)
    public ResponseEntity<?> sortFile(@RequestBody SortTemp ss) {
        XmlController.sortXMLFile(ss.sortAttribute, ss.sortOrder);
        AjaxResponseBody response = new AjaxResponseBody();
        response.stu = XmlController.AllStudents;
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/student/edit", method = RequestMethod.POST)
    public ResponseEntity<?> editStudent(@RequestBody Student stu) {
        XmlController.updateStudentDetails(stu._ID, stu._FirstName, stu._LastName, stu._Gender, stu._GPA, stu._Level,
                stu._Address);
        AjaxResponseBody response = new AjaxResponseBody();
        response.stu = XmlController.AllStudents;
        return ResponseEntity.ok(response);
    }
}
