import { getTokenStorage } from '../services/storage.js';
import { deleteBug, listBug, listUsers, updateBug} from "../services/donnees.js";


const token = getTokenStorage();

async function listBugRet() {
    const data = await listBug(token);
    return data;
}
async function listUsersRet(user_id) {
    const data = await listUsers(token);
    const nom = data.result.user[user_id];
    // console.log(nom);
    return nom
}

async function putData(){
    const res = await listBugRet();
    res.result.bug.map((bg)=>{
        const date = Intl.DateTimeFormat().format(bg.timestamp);
        let nom;
        listUsersRet(bg.user_id).then(data=>{
            nom = data;
            document.getElementById('tabValue').innerHTML +=
            `<tr id="${bg.id}">
                 <th scope="row">${bg.title}</td>
                 <td>${bg.description}</td>
                 <td>${date}</td>
                 <td>${nom}</td>
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








