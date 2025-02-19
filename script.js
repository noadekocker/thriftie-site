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
        document.getElementById('result').innerText = JSON.stringify(data, null, 2);
    };
}
