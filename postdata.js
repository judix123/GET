const URL = "https://jsonplaceholder.typicode.com/users";

function displayData(data) {
    const output = document.getElementById("output");
    output.textContent = JSON.stringify(data, null, 2);
}

function showIdField() {
    document.getElementById("idField").classList.remove("hidden");
}

function hideIdField() {
    document.getElementById("idField").classList.add("hidden");
    document.getElementById("userIdInput").value = "";
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
    hideIdField();

    try {
        const response = await fetch(URL);
        const data = await response.json();
        displayData(data);
    } catch (err) {
        console.error(err);
        displayData({ error: "Failed to fetch data." });
    }
}

async function postData() {
    hideIdField();

    const { data } = getFormData();

    if (Object.keys(data).length === 0) {
        displayData({ message: "Please fill in at least one field." });
        return;
    }

    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const resData = await response.json();
        displayData(resData);
    } catch (err) {
        console.error(err);
        displayData({ error: "Failed to post data." });
    }
}

async function putData() {
    showIdField();

    const { id, data } = getFormData();

    if (!id) {
        displayData({ message: "Please enter an ID first." });
        return;
    }

    if (Object.keys(data).length === 0) {
        displayData({ message: "Please fill in at least one field." });
        return;
    }

    try {
        const response = await fetch(`${URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const resData = await response.json();
        displayData(resData);
    } catch (err) {
        console.error(err);
        displayData({ error: "Failed to update data." });
    }
}

async function patchData() {
    showIdField();

    const { id, data } = getFormData();

    if (!id) {
        displayData({ message: "Please enter an ID first." });
        return;
    }

    if (Object.keys(data).length === 0) {
        displayData({ message: "Please fill in at least one field." });
        return;
    }

    try {
        const response = await fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const resData = await response.json();
        displayData(resData);
    } catch (err) {
        console.error(err);
        displayData({ error: "Failed to patch data." });
    }
}

async function deleteData() {
    showIdField();

    const id = document.getElementById("userIdInput").value;

    if (!id) {
        displayData({ message: "Please enter an ID first." });
        return;
    }

    try {
        const response = await fetch(`${URL}/${id}`, {
            method: "DELETE"
        });

        displayData({
            message: `Deleted user ${id}`,
            status: response.status
        });
    } catch (err) {
        console.error(err);
        displayData({ error: "Failed to delete data." });
    }
}
