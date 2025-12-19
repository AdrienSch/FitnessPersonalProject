// Event listeners for Add and Delete buttons
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addBtn').addEventListener('click', addRow);
    // Global delete button removed — deletion now handled per-row via a Delete button
});

// THIS FUNCTION WORKS! 
function addRow() {
    // These are the values for the exercise form fields, the name matches the given Id in the html code
    const exerciseName = document.getElementById('exerciseName').value.trim();
    const numReps = Number(document.getElementById('numReps').value);
    const totalWeight = Number(document.getElementById('totalWeight').value);
    const numSets = Number(document.getElementById('numSets').value);
    const repMax = numReps * totalWeight * numSets; // Number
    // Append " Lbs." to repMax for display
    const repMaxCell = repMax + " Lbs.";
    
    // Basic validation to ensure all fields are filled
    if (!exerciseName || !numReps || !totalWeight || !numSets) {
        alert("Please fill in all fields.");
        return;
    }

    // Insert a new row at the end of the table
    const table = document.getElementById('exerciseTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // Insert cells and set their text content
    const cells = [exerciseName, numReps, totalWeight, numSets, repMaxCell];
    cells.forEach(text => {
        const cell = newRow.insertCell();
        cell.textContent = text;
    });
    
    const buttonCell = newRow.insertCell();
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    // Use addEventListener and pass the button explicitly via event.currentTarget
    editButton.addEventListener('click', function(event) {
        editRow(event.currentTarget);
    });
    buttonCell.appendChild(editButton);

    // Create per-row Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', function(event) {
        const btn = event.currentTarget;
        const row = btn.parentNode.parentNode;
        // Remove the row from the table
        row.parentNode.removeChild(row);
    });
    buttonCell.appendChild(deleteButton);

    // Clear input fields
    document.getElementById('exerciseName').value = '';
    document.getElementById('numReps').value = '';
    document.getElementById('totalWeight').value = '';
    document.getElementById('numSets').value = '';
}

// THIS FUNCTION WORKS!
// Function to delete the last row of the exercise table
function deleteRow() {
    // Delete the last row of the table if it exists
    const table = document.getElementById('exerciseTable').getElementsByTagName('tbody')[0];
    const rowCount = table.rows.length;
    // Only delete if there is at least one row
    if (rowCount > 0) {
        table.deleteRow(rowCount - 1);
    } else {
        alert("No rows to delete.");
    }
}

// STILL WORKING ON THIS FUNCTION! It lets me edit and save the new results, 
// but the calculated rep max does not update yet.
function editRow(button) {
    // Get the row where the button was clicked
    let row = button.parentNode.parentNode;
    let exerciseCell = row.cells[0];
    let repsCell = row.cells[1];
    let weightCell = row.cells[2];
    let setsCell = row.cells[3];
    let repMaxCell = row.cells[4];

    // If already editing, save changes
    if (button.textContent === "Save") {
        exerciseCell.textContent = exerciseCell.querySelector("input").value;
        repsCell.textContent = repsCell.querySelector("input").value;
        weightCell.textContent = weightCell.querySelector("input").value;
        setsCell.textContent = setsCell.querySelector("input").value;
        // Recalculate rep max after saving updated values
        const newReps = parseInt(repsCell.textContent, 10) || 0;
        const newWeight = parseFloat(weightCell.textContent) || 0;
        const newSets = parseInt(setsCell.textContent, 10) || 0;
        repMaxCell.textContent = (newReps * newWeight * newSets) + " lbs.";
        button.textContent = "Edit";
    } else {
        // Turn cells into input fields
        let exerciseValue = exerciseCell.textContent;
        // Use proper JS number parsing (int() is not a built-in in JS)
        let repsValue = parseInt(repsCell.textContent, 10) || 0;
        let weightValue = parseFloat(weightCell.textContent) || 0;
        let setsValue = parseInt(setsCell.textContent, 10) || 0;
        let repMaxValue = (repsValue * weightValue * setsValue) + " lbs.";

        exerciseCell.innerHTML = `<input type="text" value="${exerciseValue}">`;
        repsCell.innerHTML = `<input type="number" value="${repsValue}">`;
        weightCell.innerHTML = `<input type="number" value="${weightValue}">`;
        setsCell.innerHTML = `<input type="number" value="${setsValue}">`;
        repMaxCell.innerHTML = repMaxValue;


        button.textContent = "Save";
    }
}
