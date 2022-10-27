import { getTokenStorage, getIdStorage } from '../services/storage.js';
import { addBug } from "../services/donnees.js";

const token = getTokenStorage();
const id = getIdStorage();

let title = '';
let description = '';

const handlesubmit = (e) => {
    e.preventDefault();
    addBug(token, id,)
        .then(data => {
            
            document.location.href = '/views/liste.html';
        })
        .catch(error => console.error(error.message));
}