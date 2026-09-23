const express = require("express");
const fs = require("fs");

const router = express.Router();
const filePath = "./data/students.json";

router.get("/", (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const students = JSON.parse(data);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: "Unable to read students data"
    });
  }
});

router.get("/:id", (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const students = JSON.parse(data);
    const id = Number(req.params.id);
    const student = students.find((s) => s.id === id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Unable to read student data"
    });
  }
});

router.post("/", (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const students = JSON.parse(data);
    const { name, course } = req.body;

    if (!name || !course) {
      return res.status(400).json({
        message: "Name and course are required"
      });
    }

    const newStudent = {
      id: students.length
        ? students[students.length - 1].id + 1
        : 1,
      name,
      course
    };

    students.push(newStudent);

    fs.writeFileSync(
      filePath,
      JSON.stringify(students, null, 2)
    );

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create student"
    });
  }
});

router.put("/:id", (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const students = JSON.parse(data);
    const id = Number(req.params.id);

    const studentIndex = students.findIndex(
      (s) => s.id === id
    );

    if (studentIndex === -1) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    const { name, course } = req.body;

    if (!name || !course) {
      return res.status(400).json({
        message: "Name and course are required"
      });
    }

    students[studentIndex] = {
      id,
      name,
      course
    };

    fs.writeFileSync(
      filePath,
      JSON.stringify(students, null, 2)
    );

    res.status(200).json(students[studentIndex]);
  } catch (error) {
    res.status(500).json({
      message: "Unable to update student"
    });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const students = JSON.parse(data);
    const id = Number(req.params.id);

    const studentIndex = students.findIndex(
      (s) => s.id === id
    );

    if (studentIndex === -1) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    fs.writeFileSync(
      filePath,
      JSON.stringify(students, null, 2)
    );

    res.status(200).json({
      message: "Student deleted successfully",
      student: deletedStudent[0]
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete student"
    });
  }
});

module.exports = router;
