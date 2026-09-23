const form = document.getElementById("studentForm");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Get values from form
    const name = document.getElementById("name").value;
    const rollno = document.getElementById("rollno").value;
    const section = document.getElementById("section").value;
    const course = document.getElementById("course").value;

    const message = document.getElementById("message");

    try {

        // Send data to backend
        const response = await fetch(
            "http://localhost:3000/api/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    rollno: rollno,
                    section: section,
                    course: course
                })
            }
        );

        // Convert response to JSON
        const data = await response.json();

        // Check response
        if (response.ok) {

            message.innerText = data.message;

            message.style.color = "green";

            // Clear form
            form.reset();

            console.log("Student registered:", data.student);

        } else {

            message.innerText = data.message;

            message.style.color = "red";
        }

    } catch (error) {

        console.error("Backend connection error:", error);

        message.innerText =
            "Unable to connect to the backend.";

        message.style.color = "red";
    }

});