async function runClarifaiWorkflow() {
    const fileInput = document.getElementById('imageUpload');
    if (!fileInput.files.length) {
        alert("Upload een afbeelding!");
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.onload = async function () {
        const base64Image = reader.result.split(',')[1];

        const response = await fetch('https://api.clarifai.com/v2/workflows/4zg98pruwzj4/results', {
            method: 'POST',
            headers: {
                'Authorization': 'Key ecb507c8243b4a05bd983da95ca73790',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: [{ data: { image: { base64: base64Image } } }]
            })
        });

        const data = await response.json();
        console.log(data);  // Voeg deze log toe om te zien wat de API terugstuurt
        if (data && data.results) {
            document.getElementById('result').innerText = JSON.stringify(data, null, 2);
        } else {
            document.getElementById('result').innerText = "Geen resultaten gevonden.";
        }
    };
}

const results = data.results[0].outputs[0].data.concepts;  // Dit is slechts een voorbeeld, afhankelijk van je workflow
if (results) {
    document.getElementById('result').innerText = "Herkenbare items: " + results.map(item => item.name).join(", ");
} else {
    document.getElementById('result').innerText = "Geen resultaten gevonden.";
}


