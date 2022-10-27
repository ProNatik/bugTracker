import { signup } from "../services/donnees.js";
import { setTokenStorage, setIdStorage } from '../services/storage.js';

let pseudo = '';
let password = '';
let repassword = '';

const handlesubmit = (e) => {
    e.preventDefault();
    if (password === repassword){
        signup(pseudo, password)
        .then(data => {
            setTokenStorage(data.result.token);
            setIdStorage(data.result.id);
            document.location.href = '/views/liste.html';
        })
        .catch(error => console.error(error.message));
    }
}

document.getElementById("pseudo").addEventListener("change", function(e) {
    pseudo = e.target.value;
    console.log(pseudo);
});
document.getElementById("password").addEventListener("change", function(e) {
    password = e.target.value;
});
document.getElementById("repassword").addEventListener("change", function(e) {
    repassword = e.target.value;
});

document.getElementById("formulaire").addEventListener("submit", handlesubmit );