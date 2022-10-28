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
    return nom
}

async function putData(){
    const res = await listBugRet();
    res.result.bug.map((bg)=>{
        const date = Intl.DateTimeFormat("fr-FR", {
            dateStyle: 'full',
            timeStyle: 'medium'
        }).format(bg.timestamp * 1000);
        let nom;
        listUsersRet(bg.user_id).then(data=>{
            nom = data;
            document.getElementById('tabValue').innerHTML +=
            `
            <tr id="${bg.id}">
            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">${bg.title}</td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${bg.description}</td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${date}</td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${nom}</td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <select name="select">
                    <option ${bg.state === "0" ? "selected" : null} value="0">Non traité</option>
                    <option ${bg.state === "1" ? "selected" : null} value="1">En cours</option>
                    <option ${bg.state === "2" ? "selected" : null} value="2">Traité</option>
                </select>
            </td>
            <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <button type="button" class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Supprimer</button>
            </td>
            </tr>
            `
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
                  const elementRemove = e.target.parentElement.parentElement;
                  elementRemove.remove();
                  Swal.fire('Bug supprimé', '', 'success');
                };
            })
        }
    })
})








