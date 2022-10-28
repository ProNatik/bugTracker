import { getTokenStorage, clearStorage } from '../services/storage.js';
import { logout } from '../services/donnees.js';

const token = getTokenStorage();

if (!token) {
    document.location.href = '/index.html';
}
else {
    document.getElementById("deconnexion").addEventListener('click', function() {
        logout(token);
        clearStorage('token');
        clearStorage('id');
        document.location.href = '/index.html';
    });
}

document.getElementById('bt_mobile_menu').addEventListener('click', function() {
    //affiche le menu
    document.getElementById('mobile-menu').classList.toggle('hidden');
    document.getElementById('mobile-menu').classList.toggle('block');
    //affiche l'img du menu
    document.getElementById('img_menu_mobile').classList.toggle('hidden');
    document.getElementById('img_menu_mobile').classList.toggle('block');
    //affiche l'img croix
    document.getElementById('img_croix_mobile').classList.toggle('hidden');
    document.getElementById('img_croix_mobile').classList.toggle('block');
})