// static/js/compare.js
async function submitForm() {
    // Get the form data
    const form = document.getElementById('compareForm');
    const formData = new FormData(form);
    
    try {
        // Send the form data via fetch (AJAX)
        const response = await fetch('http://localhost:8000/compare', {
            method: 'POST',
            body: formData
        });
        
        // Get the JSON response from the server
        const result = await response.json();
        
        // Display the result in the page
        document.getElementById('comparisonResult').innerText = result.result;
        
        // If YAMLs are identical, turn the background green
        if (result.result === "yamls are identical") {
            document.getElementById('yaml1').style.backgroundColor = "lightgreen";
            document.getElementById('yaml2').style.backgroundColor = "lightgreen";
        } else {
            // Reset the background color if they are not identical
            document.getElementById('yaml1').style.backgroundColor = "";
            document.getElementById('yaml2').style.backgroundColor = "";
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('comparisonResult').innerText = 'An error occurred while comparing the YAMLs';
    }
}