'use strict'

// Private
const studentList = [
  {
    name: 'Kwezi',
    studentNumber: 453528
  },
  {
    name: 'Pieter',
    studentNumber: 454345
  },
  {
    name: 'Jade',
    studentNumber: 678345
  },
  {
    name: 'Kiren',
    studentNumber: 567893
  }
]
// Public
module.exports = {
  add: function (student) {
    studentList.push({ name: student.name, studentNumber: student.studentNumber })
  },
  edit: function (student, index) {
    studentList[index] = student
  },
  get: function () {
    return studentList
  },
  delete: function (index) {
    studentList.splice(index, 1) // remove one element starting from index
  }
}
