import { getTokenStorage, getIdStorage } from '../services/storage.js';
import { addBug } from "../services/donnees.js";

const token = getTokenStorage();
const id = getIdStorage();

let title = '';
let description = '';

const handlesubmit = (e) => {
    e.preventDefault();
    addBug(token, id, title, description);
    alert('Bug ajouté');
}

document.getElementById('titre').addEventListener('change', function(e){
    title = e.target.value;
});
document.getElementById('description').addEventListener('change', function(e){
    description = e.target.value;
});

document.getElementById('formulaire').addEventListener('submit', handlesubmit);