const Student = require("../Database/studentModel");

// GET all students
exports.getStudents = async (req, res) => {
    const id = req.params.id;
    const students = await Student.findById(id);
    res.json(students);
};

// POST 
exports.addStudent = async (req, res) => {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json({ message : "Student added" });
};

// PUT update students
exports.updateStudent = async (req, res) => {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "STudent updated"});
};

// DELTE
exports.deleteStudent = async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "STudent deleted" });
};
