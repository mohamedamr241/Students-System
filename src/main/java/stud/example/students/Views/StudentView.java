package stud.example.students.Views;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class StudentView {

    @GetMapping("/students")
    public String showIndexPage() {
        return "index";
    }

    @GetMapping("/delete")
    public String showDeletePage() {
        return "delete";
    }

    @GetMapping("/search")
    public String showSearchPage() {
        return "search";
    }

    @GetMapping("/")
    public String showstudentsPage() {
        return "students";
    }

    @GetMapping("/sort")
    public String showsortPage() {
        return "sort";
    }

    @GetMapping("/show")
    public String showPage() {
        return "show";
    }

    @GetMapping("/edit/{id}")
    public String editPage() {
        return "edit";
    }
}
