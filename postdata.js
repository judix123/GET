const URL = "https://jsonplaceholder.typicode.com/users";


function displayData(data) {
    const output = document.getElementById("output");
    output.textContent = JSON.stringify(data, null, 2);
}


function getFormData() {
    const id = document.getElementById("userIdInput").value;
    const name = document.getElementById("nameInput").value;
    const username = document.getElementById("usernameInput").value;
    const email = document.getElementById("emailInput").value;
    const address = document.getElementById("addressInput").value;

    const data = {};
    if (name) data.name = name;
    if (username) data.username = username;
    if (email) data.email = email;
    if (address) data.address = { street: address }; 

    return { id, data };
}


async function getData() {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        displayData(data);
    } catch (err) {
        console.error(err);
    }
}


async function postData() {
    const { data } = getFormData();
    if (Object.keys(data).length === 0) return;     

    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        displayData(resData);
    } catch (err) {
        console.error(err);
    }
}

async function putData() {
    const { id, data } = getFormData();
    if (!id) return;  
    if (Object.keys(data).length === 0) return;  

    try {
        const response = await fetch(`${URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        displayData(resData);
    } catch (err) {
        console.error(err);
    }
}


async function patchData() {
    const { id, data } = getFormData();
    if (!id) return;  
    if (Object.keys(data).length === 0) return;  

    try {
        const response = await fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        displayData(resData);
    } catch (err) {
        console.error(err);
    }
}

// DELETE user
async function deleteData() {
    const id = document.getElementById("userIdInput").value;
    if (!id) return;  

    try {
        const response = await fetch(`${URL}/${id}`, { method: "DELETE" });
        displayData({ message: `Deleted user ${id}, status ${response.status}` });
    } catch (err) {
        console.error(err);
    }
}