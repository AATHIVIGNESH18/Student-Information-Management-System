let formMode = 'create'; // Initially set to 'create'
let editedIndex = -1; // Initially set to -1
let rowData = []; // Array to store row data

// Function to handle saving form data
function saveData() {
    //input values
    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value.trim();
    let gender = document.querySelector('input[name="gender"]:checked');
    let course = document.getElementById("course").value.trim();
    let email = document.getElementById("email").value.trim();

    // Validate form input
    if (name !== '' && age !== '' && gender && course !== '' && email !== '') {
        // Create data object
        let data = {
            name: name,
            age: age,
            gender: gender.value,
            course: course,
            email: email
        };

        // Check form mode and handle
        if (formMode === 'create') {
            // Add data to row data array
            rowData.push(data);
            // Add row to table
            addRow(data);
        } else {
            // Update data in row data array
            rowData[editedIndex] = data;
            // Update row in table
            updateRow(data, editedIndex);
            // Switch back to 'create' mode
            formMode = 'create';
        }

        // Reset form
        document.getElementById("studentForm").reset();
    } else {
        // Alert if any field is empty
        alert('Please fill in all fields.');
    }

}

// Function to add row to table
function addRow(data) {
    // Get table body
    let detailsTable = document.getElementById("detailsBody");
    // Insert new row
    let newRow = detailsTable.insertRow();

    // Insert cells with data
    newRow.insertCell(0).textContent = data.name;
    newRow.insertCell(1).textContent = data.age;
    newRow.insertCell(2).textContent = data.gender;
    newRow.insertCell(3).textContent = data.course;
    newRow.insertCell(4).textContent = data.email;

    // Create action cell
    let actionCell = newRow.insertCell(5);

    // Create edit button and attach onclick function
    let editButton = createButton('Edit', function () {
        editRow(newRow.rowIndex - 1); // Pass the row index to editRow function
    });
    actionCell.appendChild(editButton);

    // Create delete button and attach onclick function
    let deleteButton = createButton('Delete', function () {
        deleteRow(newRow.rowIndex - 1); // Pass the row index to deleteRow function
    });
    actionCell.appendChild(deleteButton);
}

// Function to update row in table
function updateRow(data, rowIndex) {
    // Get table body
    let detailsTable = document.getElementById("detailsBody");
    // Get row to update
    let rowToUpdate = detailsTable.rows[rowIndex];

    // Update cells with new data
    rowToUpdate.cells[0].textContent = data.name;
    rowToUpdate.cells[1].textContent = data.age;
    rowToUpdate.cells[2].textContent = data.gender;
    rowToUpdate.cells[3].textContent = data.course;
    rowToUpdate.cells[4].textContent = data.email;
}

// Function to handle editing a row
function editRow(rowIndex) {
    // Set form mode to 'edit'
    formMode = 'edit';
    // Store the index of the row being edited
    editedIndex = rowIndex;

    //data from row data array
    let data = rowData[rowIndex];
    // Set form inputs with data from the selected row
    document.getElementById("name").value = data.name;
    document.getElementById("age").value = data.age;
    document.getElementById(data.gender.toLowerCase()).checked = true;
    document.getElementById("course").value = data.course;
    document.getElementById("email").value = data.email;
}

// Function to delete a row
function deleteRow(rowIndex) {
    // Get table body
    let detailsTable = document.getElementById("detailsBody");
    // Delete the row from the table
    detailsTable.deleteRow(rowIndex);
    // Remove the corresponding data from the row data array
    rowData.splice(rowIndex, 1);
}

// Function to create a button element with specified text and onclick function
function createButton(text, onclickFunction) {
    let button = document.createElement('button');
    button.textContent = text;
    button.onclick = onclickFunction;
    return button;
}