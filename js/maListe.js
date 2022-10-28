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
        const date = Intl.DateTimeFormat().format(bg.timestamp * 1000);
            document.getElementById('tabValue').innerHTML +=
            `
            <tr id="${bg.id}">
            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 break-all">${bg.title}</td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 break-all">${bg.description}</td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 break-all">${date}</td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 break-all">
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
                //   document.getElementById(elementRemove).remove();
                  Swal.fire('Bug supprimé', '', 'success');
                };
            })
        }
    })
})