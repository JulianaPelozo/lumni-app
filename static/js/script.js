const tokenKey = 'lumni_token';
const userKey = 'lumni_user';

function setAuthToken(token) {
    if (token) localStorage.setItem(tokenKey, token);
    else localStorage.removeItem(tokenKey);
}

function getAuthToken() {
    return localStorage.getItem(tokenKey);
}

function setUser(user) {
    localStorage.setItem(userKey, JSON.stringify(user));
}

function getUser() {
    const u = localStorage.getItem(userKey);
    return u ? JSON.parse(u) : null;
}

function logout() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);
    window.location.href = '/';
}

function updateNavLinks() {
    const nav = document.getElementById('nav-links');
    const user = getUser();
    if (user && getAuthToken()) {
        nav.innerHTML = `
            <span class="navbar-text me-3">🌙 Olá, ${user.username}</span>
            <button class="btn btn-sm btn-outline-light" id="logoutBtn">Sair</button>
        `;
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) logoutBtn.addEventListener('click', logout);
    } else {
        nav.innerHTML = `
            <a href="/login" class="nav-link">Entrar</a>
            <a href="/register" class="nav-link">Registrar</a>
        `;
    }
}

async function apiFetch(url, options = {}) {
    const token = getAuthToken();
    if (!token && !url.includes('/login') && !url.includes('/register')) {
        window.location.href = '/login';
        throw new Error('Não autenticado');
    }
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const response = await fetch(url, { ...options, headers });
    if (response.status === 401) {
        logout();
        throw new Error('Sessão expirada');
    }
    return response;
}

if (window.location.pathname === '/register') {
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });
            const data = await res.json();
            if (res.ok) {
                setAuthToken(data.access_token);
                setUser(data.user);
                window.location.href = '/dashboard';
            } else {
                alert(data.msg || 'Erro no registro');
            }
        } catch (err) {
            alert('Erro de conexão');
        }
    });
}

if (window.location.pathname === '/login') {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                setAuthToken(data.access_token);
                setUser(data.user);
                window.location.href = '/dashboard';
            } else {
                alert(data.msg || 'Login inválido');
            }
        } catch (err) {
            alert('Erro de conexão');
        }
    });
}

if (window.location.pathname === '/dashboard') {
    let moodChart, sleepEnergyChart;
    
    async function loadHistory() {
        const res = await apiFetch('/api/history');
        const data = await res.json();
        const logs = data.logs;
        const alerts = data.alerts;
        
        const alertsDiv = document.getElementById('alertsList');
        alertsDiv.innerHTML = alerts.map(a => `<div class="alert alert-info alert-sm my-1">${a}</div>`).join('');
        
        const dates = logs.map(l => l.date.slice(5)); // MM-DD
        const moods = logs.map(l => l.mood);
        const sleeps = logs.map(l => l.sleep_hours);
        const energies = logs.map(l => l.energy);
        
        const ctxMood = document.getElementById('moodChart').getContext('2d');
        if (moodChart) moodChart.destroy();
        moodChart = new Chart(ctxMood, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Humor (1-5)',
                    data: moods,
                    borderColor: '#b7a9ff',
                    backgroundColor: 'rgba(183, 169, 255, 0.1)',
                    tension: 0.2,
                    fill: true
                }]
            },
            options: { responsive: true, plugins: { legend: { labels: { color: '#e0e4f0' } } } }
        });
        
        const ctxSE = document.getElementById('sleepEnergyChart').getContext('2d');
        if (sleepEnergyChart) sleepEnergyChart.destroy();
        sleepEnergyChart = new Chart(ctxSE, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    { label: 'Horas de sono', data: sleeps, borderColor: '#80cbc4', yAxisID: 'y' },
                    { label: 'Energia (1-5)', data: energies, borderColor: '#ffb74d', yAxisID: 'y1' }
                ]
            },
            options: {
                responsive: true,
                plugins: { legend: { labels: { color: '#e0e4f0' } } },
                scales: { y: { title: { display: true, text: 'Horas', color: '#e0e4f0' } }, y1: { position: 'right', title: { text: 'Energia', color: '#e0e4f0' }, min: 1, max: 5 } }
            }
        });
    }
    
    async function saveDailyLog(e) {
        e.preventDefault();
        const mood = document.getElementById('mood').value;
        const energy = document.getElementById('energy').value;
        const sleep = document.getElementById('sleep').value;
        const tasks = document.getElementById('tasks').value;
        try {
            const res = await apiFetch('/api/daily-log', {
                method: 'POST',
                body: JSON.stringify({ mood, energy, sleep_hours: parseFloat(sleep), tasks_done: parseInt(tasks) })
            });
            if (res.ok) {
                alert('Log salvo! Gráficos atualizados.');
                loadHistory();
            } else {
                alert('Erro ao salvar');
            }
        } catch (err) {
            alert('Erro de conexão');
        }
    }
    
    document.getElementById('dailyForm').addEventListener('submit', saveDailyLog);
    loadHistory();
}

// Inicializar navegação ao carregar qualquer página
document.addEventListener('DOMContentLoaded', updateNavLinks);