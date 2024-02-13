document.getElementById('triviaBtn').classList.add('selected');
setFactType('trivia');

function setFactType(factType) {
    document.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('selected');
    });
    // Add selected class to the clicked button
    document.getElementById(factType + 'Btn').classList.add('selected');
    selectedFactType = factType;
}

function searchNumberFact() {
    var numberInput = document.getElementById("numberInput");
    var number = numberInput.value.trim();

    var apiUrl = "http://numbersapi.com/" + number + "/" + selectedFactType;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("factResult").innerText = data;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("factResult").innerText = "Error: Invalid input. Please try again.";
        });
}

// Listen for "Enter" key press
document.getElementById('numberInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        searchNumberFact(); // Trigger search function
    }
});

function fetchFact(url, elementId) {
    // Hide all fact divs
    var factDivs = document.querySelectorAll('.randomfact');
    factDivs.forEach(div => div.style.display = 'none');

    // Show the targeted fact div
    var targetDiv = document.getElementById(elementId);
    targetDiv.style.display = 'block';

    // Fetch and display the fact
    fetch(url)
        .then(response => response.text())
        .then(data => {
            targetDiv.innerText = data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}