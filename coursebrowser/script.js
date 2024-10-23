// הצפנת קוד הגישה באמצעות AES
const encryptedCode = CryptoJS.AES.encrypt("12345", "yourSecretKey").toString(); // קוד הגישה המוצפן

let attemptCount = 0; // מספר ניסיונות כושלים

function checkEnter(event) {
    if (event.key === 'Enter') {
        validateCode();
    }
}

function validateCode() {
    const userCode = document.getElementById('access-code').value;
    const errorMessage = document.getElementById('error-message');
    const accessButton = document.querySelector('.access-code-container button');

    attemptCount++;

    if (attemptCount > 3) {
        errorMessage.textContent = "יותר מדי ניסיונות נכשלו";
        errorMessage.style.display = "block";
        accessButton.disabled = true;
        accessButton.style.backgroundColor = '#ccc';
        accessButton.style.cursor = 'not-allowed';
        return;
    }

    // פענוח הקוד המוזן והשוואתו לקוד המקורי
    const decryptedCode = CryptoJS.AES.decrypt(encryptedCode, "yourSecretKey").toString(CryptoJS.enc.Utf8);

    if (userCode === decryptedCode) {
        window.location.href = "../management-interface.html"; // ניתוב לממשק הניהול
    } else {
        errorMessage.style.display = "block";
    }
}
