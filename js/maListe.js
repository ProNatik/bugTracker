import { getTokenStorage, getIdStorage } from '../services/storage.js';
import { listBugUser, updateBug} from "../services/donnees.js";

const token = getTokenStorage();
const id = getIdStorage();

async function listBugUserRet(){
    const data = await listBugUser(token, id);
    return data;
}

async function putData(){
    const res = await listBugUserRet();
    res.result.bug.map((bg)=>{
        const date = Intl.DateTimeFormat().format(bg.timestamp);
            document.getElementById('tabValue').innerHTML +=
            `<tr id="${bg.id}">
                 <th scope="row">${bg.title}</td>
                 <td>${bg.description}</td>
                 <td>${date}</td>
                 <td>
                    <select name="select">
                        <option ${bg.state === "0" ? "selected" : null} value="0">Non traité</option>
                        <option ${bg.state === "1" ? "selected" : null} value="1">En cours</option>
                        <option ${bg.state === "2" ? "selected" : null} value="2">Traité</option>
                    </select>
                </td>
                <td><button>Supprimer</button></td>
             </tr>`     
    })
}

window.addEventListener("load", () => {
    putData();
    document.addEventListener('change' , function(e){
        if (e.target && e.target.tagName === 'SELECT') {
            updateBug(token, e.target.parentElement.parentElement.id, e.target.value);
        } 
    });
    document.addEventListener('click', function(e){
        if (e.target.innerHTML === 'Supprimer' && e.target.tagName ==='BUTTON') {
            Swal.fire({
                title: 'Veux-tu supprimer ce bug ?',
                showCancelButton: true,
                cancelButtonText: 'Non',
                confirmButtonText: 'Oui',
                }).then((result) => {
                if (result.isConfirmed) {
                  deleteBug(token, e.target.parentElement.parentElement.id);
                  Swal.fire('Bug supprimé', '', 'success');
                };
            })
        }
    })
})