package stud.example.students.Controllers;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import stud.example.students.Models.Student;

public class XmlController {
    public static ArrayList<Student> AllStudents = new ArrayList<Student>();

    public static void SaveInList(Student std) {
        AllStudents.add(std);
    }

    public static void buildXml() {
        try {
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();

            // Create Document
            Document doc = dBuilder.newDocument();

            // Create root element (University)
            Element universityElement = doc.createElement("University");
            doc.appendChild(universityElement);

            // Create student element with attributes
            Element studentElement = doc.createElement("Student");
            studentElement.setAttribute("ID", "20200134");
            universityElement.appendChild(studentElement);

            // Create child elements under student
            createElementWithTextContent(doc, studentElement, "FirstName", "Ahmed");
            createElementWithTextContent(doc, studentElement, "LastName", "Mohamed");
            createElementWithTextContent(doc, studentElement, "Gender", "Male");
            createElementWithTextContent(doc, studentElement, "GPA", "3.17");
            createElementWithTextContent(doc, studentElement, "Level", "4");
            createElementWithTextContent(doc, studentElement, "Address", "Giza");

            // Write the XML to a file
            writeXMLToFile(doc, "students.xml");
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        }
    }

    public static void readTheData() throws SAXException, IOException {
        try {
            File inputFile = new File("students.xml");

            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(inputFile);

            doc.getDocumentElement().normalize();

            NodeList studentList = doc.getElementsByTagName("Student");

            for (int temp = 0; temp < studentList.getLength(); temp++) {
                Node studentNode = studentList.item(temp);

                if (studentNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element studentElement = (Element) studentNode;
                    Student std = new Student();
                    std._ID = studentElement.getAttribute("ID");
                    std._FirstName = studentElement.getElementsByTagName("FirstName").item(0).getTextContent();
                    std._LastName = studentElement.getElementsByTagName("LastName").item(0).getTextContent();
                    std._Gender = studentElement.getElementsByTagName("Gender").item(0).getTextContent();
                    std._GPA = studentElement.getElementsByTagName("GPA").item(0).getTextContent();
                    std._Level = studentElement.getElementsByTagName("Level").item(0).getTextContent();
                    std._Address = studentElement.getElementsByTagName("Address").item(0).getTextContent();

                    SaveInList(std);
                }
            }
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        }
    }

    private static void createElementWithTextContent(Document doc, Element parent, String elementName,
            String textContent) {
        Element element = doc.createElement(elementName);
        element.appendChild(doc.createTextNode(textContent));
        parent.appendChild(element);
    }

    private static void writeXMLToFile(Document doc, String fileName) {
        try {
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            DOMSource source = new DOMSource(doc);

            // Specify the file path
            String filePath = System.getProperty("user.dir") + File.separator + fileName;

            StreamResult result = new StreamResult(new File(filePath));
            transformer.transform(source, result);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void saveChangesToFile(Document doc, String filePath) {
        try {
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            DOMSource source = new DOMSource(doc);

            StreamResult result = new StreamResult(new File(filePath));
            transformer.transform(source, result);

            System.out.println("Tag appended to University in XML file: " + filePath);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String StoreData(Student stud) throws SAXException, IOException {

        try {
            boolean check = false;
            for (Student student : AllStudents) {
                if (student._ID.equals(stud._ID)) {
                    check = true;
                    break;
                }
            }
            if (!check) {
                String filePath = "students.xml";

                // Parse the XML file
                DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                DocumentBuilder builder = factory.newDocumentBuilder();
                Document doc = builder.parse(new File(filePath));

                Element universityElement = (Element) doc.getElementsByTagName("University").item(0);
                Element studentElement = doc.createElement("Student");
                studentElement.setAttribute("ID", stud._ID);
                universityElement.appendChild(studentElement);

                // Create child elements under student
                createElementWithTextContent(doc, studentElement, "FirstName", stud._FirstName);
                createElementWithTextContent(doc, studentElement, "LastName", stud._LastName);
                createElementWithTextContent(doc, studentElement, "Gender", stud._Gender);
                createElementWithTextContent(doc, studentElement, "GPA", stud._GPA);
                createElementWithTextContent(doc, studentElement, "Level", stud._Level);
                createElementWithTextContent(doc, studentElement, "Address", stud._Address);

                saveChangesToFile(doc, "students.xml");
                SaveInList(stud);
                return "success";
            } else {
                return "Id already exist!";
            }
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
            return "error";
        }
    }

    public static ArrayList<Student> getStudentsByGPA(String targetGPA) {
        ArrayList<Student> result = new ArrayList<>();
        for (Student student : AllStudents) {
            if (student._GPA.equals(targetGPA)) {
                System.out.println("yes");
                result.add(student);
            }
        }

        return result;
    }

    public static ArrayList<Student> getStudentsByFirstName(String targetFirstName) {
        ArrayList<Student> result = new ArrayList<>();

        for (Student student : AllStudents) {
            if (student._FirstName.equalsIgnoreCase(targetFirstName)) {
                result.add(student);
            }
        }
        return result;
    }

    public static ArrayList<Student> getStudentsByLastName(String targetFirstName) {
        ArrayList<Student> result = new ArrayList<>();

        for (Student student : AllStudents) {
            if (student._LastName.equalsIgnoreCase(targetFirstName)) {
                result.add(student);
            }
        }
        return result;
    }

    public static ArrayList<Student> getStudentsById(String targetFirstName) {
        ArrayList<Student> result = new ArrayList<>();

        for (Student student : AllStudents) {
            if (student._ID.equalsIgnoreCase(targetFirstName)) {
                result.add(student);
            }
        }
        return result;
    }

    public static ArrayList<Student> getStudentsByGender(String targetFirstName) {
        ArrayList<Student> result = new ArrayList<>();

        for (Student student : AllStudents) {
            if (student._Gender.equalsIgnoreCase(targetFirstName)) {
                result.add(student);
            }
        }
        return result;
    }

    public static ArrayList<Student> getStudentsByAddress(String targetFirstName) {
        ArrayList<Student> result = new ArrayList<>();

        for (Student student : AllStudents) {
            if (student._Address.equalsIgnoreCase(targetFirstName)) {
                result.add(student);
            }
        }
        return result;
    }

    public static ArrayList<Student> getStudentsByLevel(String targetFirstName) {
        ArrayList<Student> result = new ArrayList<>();

        for (Student student : AllStudents) {
            if (student._Level.equalsIgnoreCase(targetFirstName)) {
                result.add(student);
            }
        }
        return result;
    }

    public static String deleteStudentById(String studentId) {
        try {
            boolean check = false;
            for (Student stu : AllStudents) {
                if (stu._ID.equals(studentId)) {
                    check = true;
                    break;
                }
            }
            if (!check) {
                return "User not found!";
            } else {

                File inputFile = new File("students.xml");

                DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
                DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
                Document doc = docBuilder.parse(inputFile);

                NodeList studentList = doc.getElementsByTagName("Student");

                for (int i = 0; i < studentList.getLength(); i++) {
                    Node studentNode = studentList.item(i);

                    if (studentNode.getNodeType() == Node.ELEMENT_NODE) {
                        Element studentElement = (Element) studentNode;
                        String id = studentElement.getAttribute("ID");

                        if (id.equals(studentId)) {
                            // Found the student with the specified ID, remove it
                            studentNode.getParentNode().removeChild(studentNode);
                            break;
                        }
                    }
                }

                // Write the updated content back to the XML file
                TransformerFactory transformerFactory = TransformerFactory.newInstance();
                Transformer transformer = transformerFactory.newTransformer();
                DOMSource source = new DOMSource(doc);
                StreamResult result = new StreamResult(inputFile);
                transformer.transform(source, result);
                for (Student student : AllStudents) {
                    if (student._ID.equals(studentId)) {
                        AllStudents.remove(student);
                        break;
                    }
                }
                System.out.println("Student with ID " + studentId + " deleted successfully.");
                return "User deleted Successfully";
            }

        } catch (ParserConfigurationException | SAXException | IOException | TransformerException e) {
            e.printStackTrace();
            return "error";
        }
    }

    // ############## ASSIGNMENT 2 #####################3
    public static void sortXMLFile(String sortAttribute, String sortOrder) {
        String filePath = "students.xml"; // Replace this with the actual file path

        try {
            File xmlFile = new File(filePath);

            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(xmlFile);
            document.getDocumentElement().normalize();

            NodeList studentNodes = document.getElementsByTagName("Student");
            ArrayList<Student> students = new ArrayList<>();

            // Extracting student elements and creating Student objects
            for (int i = 0; i < studentNodes.getLength(); i++) {
                if (studentNodes.item(i).getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
                    Element studentElement = (Element) studentNodes.item(i);
                    String ID = studentElement.getAttribute("ID");
                    String firstName = studentElement.getElementsByTagName("FirstName").item(0).getTextContent();
                    String lastName = studentElement.getElementsByTagName("LastName").item(0).getTextContent();
                    String gender = studentElement.getElementsByTagName("Gender").item(0).getTextContent();
                    String GPA = studentElement.getElementsByTagName("GPA").item(0).getTextContent();
                    String level = studentElement.getElementsByTagName("Level").item(0).getTextContent();
                    String address = studentElement.getElementsByTagName("Address").item(0).getTextContent();

                    Student student = new Student(ID, firstName, lastName, gender, address, GPA, level);
                    students.add(student);
                }
            }

            // Sort students based on the chosen attribute
            Collections.sort(students, new Comparator<Student>() {
                @Override
                public int compare(Student student1, Student student2) {
                    String value1 = getValueForAttribute(student1, sortAttribute);
                    String value2 = getValueForAttribute(student2, sortAttribute);

                    if (sortOrder.equalsIgnoreCase("ascending")) {
                        return value1.compareTo(value2);
                    } else {
                        return value2.compareTo(value1);
                    }
                }

                private String getValueForAttribute(Student student, String attribute) {
                    switch (attribute) {
                        case "ID":
                            return student._ID;
                        case "FirstName":
                            return student._FirstName;
                        case "LastName":
                            return student._LastName;
                        case "Gender":
                            return student._Gender;
                        case "GPA":
                            return student._GPA;
                        case "Level":
                            return student._Level;
                        case "Address":
                            return student._Address;
                        default:
                            return "";
                    }
                }
            });

            // Rebuild XML file with sorted students
            Element universityElement = (Element) document.getElementsByTagName("University").item(0);
            universityElement.setTextContent(""); // Clear existing content

            for (Student student : students) {
                Element studentElement = document.createElement("Student");
                studentElement.setAttribute("ID", student._ID);

                Element firstNameElement = document.createElement("FirstName");
                firstNameElement.setTextContent(student._FirstName);
                studentElement.appendChild(firstNameElement);

                Element lastNameElement = document.createElement("LastName");
                lastNameElement.setTextContent(student._LastName);
                studentElement.appendChild(lastNameElement);

                Element genderElement = document.createElement("Gender");
                genderElement.setTextContent(student._Gender);
                studentElement.appendChild(genderElement);

                Element gpaElement = document.createElement("GPA");
                gpaElement.setTextContent(student._GPA);
                studentElement.appendChild(gpaElement);

                Element levelElement = document.createElement("Level");
                levelElement.setTextContent(student._Level);
                studentElement.appendChild(levelElement);

                Element addressElement = document.createElement("Address");
                addressElement.setTextContent(student._Address);
                studentElement.appendChild(addressElement);

                universityElement.appendChild(studentElement);
            }

            // Save the changes to the original file
            FileOutputStream outputStream = new FileOutputStream(filePath);
            javax.xml.transform.TransformerFactory.newInstance().newTransformer().transform(
                    new javax.xml.transform.dom.DOMSource(document),
                    new javax.xml.transform.stream.StreamResult(outputStream));
            outputStream.close();

            System.out.println("File sorted and updated successfully.");

            // Update MainStudentList with the sorted students
            updateMainStudentList(document);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void updateMainStudentList(Document document) {
        AllStudents.clear(); // Clear existing list
        NodeList updatedStudentNodes = document.getElementsByTagName("Student");
        for (int i = 0; i < updatedStudentNodes.getLength(); i++) {
            if (updatedStudentNodes.item(i).getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
                Element studentElement = (Element) updatedStudentNodes.item(i);
                String ID = studentElement.getAttribute("ID");
                String firstName = studentElement.getElementsByTagName("FirstName").item(0).getTextContent();
                String lastName = studentElement.getElementsByTagName("LastName").item(0).getTextContent();
                String gender = studentElement.getElementsByTagName("Gender").item(0).getTextContent();
                String GPA = studentElement.getElementsByTagName("GPA").item(0).getTextContent();
                String level = studentElement.getElementsByTagName("Level").item(0).getTextContent();
                String address = studentElement.getElementsByTagName("Address").item(0).getTextContent();
                Student student = new Student(ID, firstName, lastName, gender, address, GPA, level);

                AllStudents.add(student);
            }
        }
    }

    public static void updateStudentDetails(String id, String firstName, String lastName,
            String gender, String GPA, String level, String address) {
        try {
            File inputFile = new File("students.xml");
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document document = dBuilder.parse(inputFile);
            document.getDocumentElement().normalize();

            NodeList studentList = document.getElementsByTagName("Student");

            for (int i = 0; i < studentList.getLength(); i++) {
                Element student = (Element) studentList.item(i);
                String studentID = student.getAttribute("ID");
                if (studentID.equals(id)) {
                    if (firstName != null && !firstName.isEmpty()) {
                        updateAttribute(student, "FirstName", firstName);
                    }
                    if (lastName != null && !lastName.isEmpty()) {
                        updateAttribute(student, "LastName", lastName);
                    }
                    if (gender != null && !gender.isEmpty()) {
                        updateAttribute(student, "Gender", gender);
                    }
                    if (GPA != null && !GPA.isEmpty()) {
                        updateAttribute(student, "GPA", GPA);
                    }
                    if (level != null && !level.isEmpty()) {
                        updateAttribute(student, "Level", level);
                    }
                    if (address != null && !address.isEmpty()) {
                        updateAttribute(student, "Address", address);
                    }
                    break;
                }
            }

            // Write the updated XML back to the original file
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            DOMSource source = new DOMSource(document);
            StreamResult result = new StreamResult(inputFile);
            transformer.transform(source, result);
            updateMainStudentList(document);

            System.out.println("Student details updated successfully!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void updateAttribute(Element element, String tagName, String value) {
        NodeList nodeList = element.getElementsByTagName(tagName);
        Element targetElement = (Element) nodeList.item(0);
        targetElement.setTextContent(value);
    }
}
