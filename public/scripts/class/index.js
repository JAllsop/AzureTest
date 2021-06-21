'use strict'

// const fetch = require('node-fetch')

const getClassList = () => {
  fetch('/class/api/list') // Returns a Promise for the GET request
    .then(function (response) {
    // Check if the request returned a valid code
      if (response.ok) { return response.json() } // Return the response parse as JSON if code is valid
      else { throw new Error('Failed to load classlist: response code invalid!') }
    })
    .then(function (data) { // Display the JSON data appropriately
    // Retrieve the classList outer element

      switch (document.getElementById('categories').value) {
        case ('Name'):
          data = data.filter(student =>
            student.name.startsWith(document.getElementById('search-text').value))
          break
        case ('Number'):
          data = data.filter(student =>
            student.studentNumber.toString().startsWith(document.getElementById('search-text').value))
          break
      }

      const classList = document.getElementById('classList')
      classList.innerHTML = ''

      // Iterate through all students
      data.forEach(function (student) {
      // Create a new list entry
        const li = document.createElement('LI')
        const liText = document.createTextNode(`${student.name}: ${student.studentNumber}`)

        // Append the class to the list element
        li.className += 'student'

        // Append list text to list item and list item to list
        li.appendChild(liText)
        classList.appendChild(li)
      })
    })
    .catch(function (e) {
      alert(e)
    })
}

const addStudent = () => {
  fetch('/class/api/create', {
    method: 'post', // specify method to use
    headers: { // headers to specify the type of data needed
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: document.getElementById('newStudentName').value,
      studentNumber: document.getElementById('newStudentNumber').value
    }) // fill body of request. note that data in this example is a JSON object
  })
    .then(function (response) {
      if (response.ok) { return response.json() } // Return the response parse as JSON if code is valid
      else { throw new Error('Failed!') }
    })
    .then(function () {
      document.getElementById('newStudentName').value = ''
      document.getElementById('newStudentNumber').value = ''
    })
    .catch(function (e) { // Process error for request
      alert(e)
    })
  getClassList()
}

window.onload = () => {
  document.querySelector('#search-text').addEventListener('input', () => getClassList(), false)
  document.getElementById('addStudentButton').addEventListener('click', () => addStudent(), false)
}
