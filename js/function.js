import { getTokenStorage } from '../services/storage.js';

const token = getTokenStorage();

if (!token) {
    document.location.href = '/index.html';
}