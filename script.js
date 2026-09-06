// ============================================================
// 1. MATRIX RAIN CANVAS
// ============================================================
(function matrixRain() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/';
    const charArray = chars.split('');
    const fontSize = 20;
    const columns = Math.floor(width / fontSize);
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops.push(Math.floor(Math.random() * -100));
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(5, 0, 10, 0.04)';
        ctx.fillRect(0, 0, width, height);

        ctx.font = fontSize + 'px monospace';
        ctx.textAlign = 'center';

        for (let i = 0; i < drops.length; i++) {
            const char = charArray[Math.floor(Math.random() * charArray.length)];
            const x = i * fontSize + fontSize / 2;
            const y = drops[i] * fontSize;

            const gradient = ctx.createLinearGradient(x, y - fontSize, x, y + fontSize);
            gradient.addColorStop(0, '#b300ff');
            gradient.addColorStop(0.5, '#00f5ff');
            gradient.addColorStop(1, '#ff00e6');
            ctx.fillStyle = gradient;

            ctx.shadowColor = '#b300ff';
            ctx.shadowBlur = 15;
            ctx.fillText(char, x, y);
            ctx.shadowBlur = 0;

            if (y > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        requestAnimationFrame(drawMatrix);
    }

    drawMatrix();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        const newCols = Math.floor(width / fontSize);
        while (drops.length < newCols) {
            drops.push(Math.floor(Math.random() * -100));
        }
        while (drops.length > newCols) {
            drops.pop();
        }
    });
})();


// ============================================================
// 2. CONFIGURATION
// ============================================================
const CONFIG = {
    CREDENTIALS: { username: 'Bl@ckn1te', password: '0506' },
    WHATSAPP: { primary: '+263714799483', secondary: '+263780540231' },
    EMAILS: {
        primary: 'blackn1te@protonmail.com',
        secondary: 'Katsandepardon23@gmail.com',
        tertiary: 'Pardonk2005@gmail.com'
    },
    BOOT_MESSAGES: [
        '🔥 Initializing quantum core...',
        '🌀 Loading neural interface...',
        '🔐 Establishing secure channel...',
        '⚡ Bypassing firewall layers...',
        '💀 Decrypting root access...',
        '📡 Syncing with central server...',
        '🧠 Calibrating AI modules...',
        '🚀 Warming up subsystems...',
        '✅ System ready. Welcome, Operator.'
    ],
    LOGOUT_MESSAGES: [
        '🔒 Terminating secure session...',
        '🧹 Clearing system cache...',
        '🔐 Closing active connections...',
        '💾 Saving user preferences...',
        '👋 Logging out...',
        '✅ Session terminated successfully.'
    ],
    USER_COUNT: 1
};


// ============================================================
// 3. BOOTLOADER CLASS (SLOW & OPTIMAL)
// ============================================================
class Bootloader {
    constructor(logId, progressId, barId, statusId, messages) {
        this.logId = logId;
        this.progressId = progressId;
        this.barId = barId;
        this.statusId = statusId;
        this.messages = messages || CONFIG.BOOT_MESSAGES;
        this.progress = 0;
        this.running = false;
        this.interval = null;
    }

    start(callback) {
        this.running = true;
        this.progress = 0;
        const logEl = document.getElementById(this.logId);
        if (logEl) logEl.innerHTML = '';
        this.updateProgress(0);

        const messages = this.messages;
        let msgIdx = 0;

        // SLOW & OPTIMAL: ~5-6 seconds total
        this.interval = setInterval(() => {
            if (!this.running) { clearInterval(this.interval); return; }

            this.progress += Math.random() * 4 + 1.2;
            if (this.progress > 100) this.progress = 100;
            this.updateProgress(this.progress);

            if (this.progress % 10 < 4 && msgIdx < messages.length) {
                this.addLog(messages[msgIdx], 'success');
                msgIdx++;
            }

            if (Math.random() > 0.90) {
                const warns = [
                    '⚠️ Firewall rule 13 bypassed',
                    '⚠️ SSL certificate mismatch (ignored)',
                    '⚠️ DNS cache poisoned (resolved)',
                    '⚠️ Unauthorized access attempt blocked'
                ];
                this.addLog(warns[Math.floor(Math.random() * warns.length)], 'warning');
            }

            if (this.progress >= 100) {
                clearInterval(this.interval);
                this.running = false;
                this.addLog('✅ Process completed successfully.', 'success');
                if (callback) setTimeout(callback, 500);
            }
        }, 200); // SLOW interval for optimal viewing
        return this.interval;
    }

    updateProgress(val) {
        const p = Math.min(Math.floor(val), 100);
        const progEl = document.getElementById(this.progressId);
        const barEl = document.getElementById(this.barId);
        const statusEl = document.getElementById(this.statusId);
        if (progEl) progEl.textContent = p + '%';
        if (barEl) barEl.style.width = p + '%';
        if (statusEl) {
            statusEl.textContent = p < 100 ? `⧩ Processing... ${p}%` : '✅ Complete';
        }
    }

    addLog(msg, type = 'info') {
        const logEl = document.getElementById(this.logId);
        if (!logEl) return;
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        const ts = new Date().toLocaleTimeString();
        entry.innerHTML = `<span class="timestamp">[${ts}]</span> ${msg}`;
        logEl.appendChild(entry);
        logEl.scrollTop = logEl.scrollHeight;
    }

    stop() {
        this.running = false;
        if (this.interval) clearInterval(this.interval);
    }
}

const loginBootloader = new Bootloader(
    'bootLog', 'bootProgress', 'bootProgressBar', 'bootStatusText', CONFIG.BOOT_MESSAGES
);

const logoutBootloader = new Bootloader(
    'logoutBootLog', 'logoutBootProgress', 'logoutBootProgressBar', 'logoutBootStatusText', CONFIG.LOGOUT_MESSAGES
);


// ============================================================
// 4. MAIN APP
// ============================================================
class App {
    constructor() {
        this.currentPage = 'home';
        this.init();
    }

    init() {
        // Login
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const u = document.getElementById('username').value.trim();
            const p = document.getElementById('password').value.trim();
            if (u === CONFIG.CREDENTIALS.username && p === CONFIG.CREDENTIALS.password) {
                this.showLoginBootloader(() => this.showApp());
            } else {
                this.toast('❌ Access Denied! Invalid credentials.', 'error');
            }
        });

        // Left Drawer Toggle
        document.getElementById('leftMenuToggle').addEventListener('click', () => {
            document.getElementById('leftDrawer').classList.toggle('open');
            // Close right drawer if open
            document.getElementById('rightDrawer').classList.remove('open');
        });

        document.getElementById('closeLeftDrawer').addEventListener('click', () => {
            document.getElementById('leftDrawer').classList.remove('open');
        });

        // Right Drawer Toggle
        document.getElementById('rightMenuToggle').addEventListener('click', () => {
            document.getElementById('rightDrawer').classList.toggle('open');
            // Close left drawer if open
            document.getElementById('leftDrawer').classList.remove('open');
        });

        document.getElementById('closeRightDrawer').addEventListener('click', () => {
            document.getElementById('rightDrawer').classList.remove('open');
        });

        // Left Drawer items
        document.querySelectorAll('.left-drawer .drawer-menu li').forEach(item => {
            item.addEventListener('click', () => {
                const page = item.dataset.page;
                if (page === 'signout') { this.signOut(); } else if (page) {
                    this.navigateTo(page);
                }
                document.getElementById('leftDrawer').classList.remove('open');
            });
        });

        // Right Drawer items
        document.querySelectorAll('.right-drawer .drawer-menu li').forEach(item => {
            item.addEventListener('click', () => {
                const page = item.dataset.page;
                if (page) {
                    this.navigateTo(page);
                }
                document.getElementById('rightDrawer').classList.remove('open');
            });
        });

        // Clock
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);

        // Session check
        if (localStorage.getItem('nexusSession') === 'active') {
            this.showApp();
        } else {
            document.getElementById('loginScreen').classList.add('active');
        }

        window.app = this;
    }

    showLoginBootloader(callback) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('bootloaderScreen').classList.add('active');
        loginBootloader.start(() => {
            if (callback) callback();
        });
    }

    showLogoutBootloader(callback) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('logoutBootloaderScreen').classList.add('active');
        logoutBootloader.start(() => {
            if (callback) callback();
        });
    }

    runWithBootloader(callback) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('bootloaderScreen').classList.add('active');
        loginBootloader.start(() => {
            document.getElementById('bootloaderScreen').classList.remove('active');
            document.getElementById('appScreen').classList.add('active');
            if (callback) callback();
        });
    }

    showApp() {
        localStorage.setItem('nexusSession', 'active');
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('appScreen').classList.add('active');
        this.navigateTo('home');
        this.toast('🟢 System Online. Welcome, Operator!', 'success');
        this.startMonitors();
    }

    navigateTo(page) {
        this.currentPage = page;
        document.getElementById('pageTitle').textContent = page.toUpperCase();

        // Update left drawer active state
        document.querySelectorAll('.left-drawer .drawer-menu li').forEach(el => {
            el.classList.toggle('active', el.dataset.page === page);
        });

        // Update right drawer active state
        document.querySelectorAll('.right-drawer .drawer-menu li').forEach(el => {
            el.classList.toggle('active', el.dataset.page === page);
        });

        this.runWithBootloader(() => {
            this.renderPage(page);
        });
    }

    renderPage(page) {
        switch (page) {
            case 'home':
                this.renderHome();
                break;
            case 'services':
                this.renderServices();
                break;
            case 'settings':
                this.renderSettingsFull();
                break;
            case 'notifications':
                this.renderNotifications();
                break;
            case 'deploy':
                this.renderDeploy();
                break;
            case 'about':
                this.renderAbout();
                break;
            default:
                this.renderHome();
        }
    }

    // ============================================================
    // HOME PAGE
    // ============================================================
    renderHome() {
        const features = [
            { icon: '🔥', title: 'Gray Hat Ops', desc: 'OSINT, recon & ethical hacking tools', action: 'grayhat' },
            { icon: '🖤', title: 'Black Hat Labs', desc: 'Pen-testing, exploits & deep recon', action: 'blackhat' },
            { icon: '🤍', title: 'White Hat Defense', desc: 'Vulnerability scanning & security', action: 'whitehat' },
            { icon: '📚', title: 'Programming Languages', desc: 'Learn with real data & enroll', action: 'languages' },
            { icon: '🛠️', title: 'Toolbox Vault', desc: 'Encryption, password tools & more', action: 'toolbox' },
            { icon: '🏴‍☠️', title: 'CTF Arena', desc: 'Capture The Flag challenges', action: 'ctf' },
            { icon: '📰', title: 'News Feed', desc: 'Live Hacker News updates', action: 'news' },
            { icon: '📖', title: 'Cyber Dictionary', desc: '50+ cybersecurity terms', action: 'dictionary' },
            { icon: '📋', title: 'System Logs', desc: 'View activity logs', action: 'logs' },
            { icon: '🎯', title: 'Missions', desc: 'Weekly challenges & XP', action: 'missions' },
        ];

        const html = `
            <div class="live-monitors">
                <div class="monitor-item">
                    <div class="monitor-label">🔥 Threat Level</div>
                    <div class="monitor-value accent" id="threatLevel">LOW</div>
                </div>
                <div class="monitor-item">
                    <div class="monitor-label">🌐 Online Users</div>
                    <div class="monitor-value accent">${CONFIG.USER_COUNT}</div>
                </div>
                <div class="monitor-item">
                    <div class="monitor-label">⚡ Active Features</div>
                    <div class="monitor-value accent">${features.length}</div>
                </div>
            </div>
            <div class="dashboard-grid">
                ${features.map(f => `
                    <div class="dashboard-card" onclick="app.runHomeFeature('${f.action}','${f.title}')">
                        <span class="card-icon">${f.icon}</span>
                        <div class="card-title">${f.title}</div>
                        <div class="card-desc">${f.desc}</div>
                        <span class="card-badge">▶ LAUNCH</span>
                    </div>
                `).join('')}
            </div>
        `;
        document.getElementById('pageContent').innerHTML = html;
        this.startMonitors();
    }

    runHomeFeature(action, title) {
        this.runWithBootloader(() => {
            let content = '';
            switch (action) {
                case 'grayhat':
                    content = this.getGrayHatInfo();
                    break;
                case 'blackhat':
                    content = this.getBlackHatInfo();
                    break;
                case 'whitehat':
                    content = this.getWhiteHatInfo();
                    break;
                case 'languages':
                    content = this.getLanguagesInfo();
                    break;
                case 'toolbox':
                    content = this.getToolboxInfo();
                    break;
                case 'ctf':
                    content = this.getCTFInfo();
                    break;
                case 'news':
                    content = this.getNewsInfo();
                    break;
                case 'dictionary':
                    content = this.getDictionaryInfo();
                    break;
                case 'logs':
                    content = this.getLogsInfo();
                    break;
                case 'missions':
                    content = this.getMissionsInfo();
                    break;
                default:
                    content = `<p>Feature "${title}" is ready.</p>`;
            }
            const html = `
                <div class="detail-panel">
                    <button class="back-btn" onclick="app.navigateTo('home')">← BACK</button>
                    <h2>${title}</h2>
                    ${content}
                    <div style="margin-top:18px;padding-top:14px;border-top:1px solid rgba(179,0,255,0.08);">
                        <button class="btn-action-outline" onclick="app.navigateTo('home')">← Close</button>
                    </div>
                </div>
            `;
            document.getElementById('pageContent').innerHTML = html;
        });
    }

    // ---- HOME FEATURE INFO GENERATORS ----
    getGrayHatInfo() {
        return `
            <div class="info-block"><strong>🔥 Gray Hat Ops — OSINT & Recon</strong></div>
            <div class="info-block"><strong>IP Scanner:</strong> Scan any IP for open ports</div>
            <div class="info-block"><strong>Subdomain Finder:</strong> Discover subdomains</div>
            <div class="info-block"><strong>DNS Enumeration:</strong> Get DNS records</div>
            <div class="info-block"><strong>WHOIS Lookup:</strong> Domain registration info</div>
            <p style="margin-top:12px;color:var(--text-dim);font-size:15px;font-weight:700;">✅ All tools available with real data.</p>
        `;
    }

    getBlackHatInfo() {
        return `
            <div class="info-block"><strong>🖤 Black Hat Labs — Penetration Testing</strong></div>
            <div class="info-block"><strong>Vulnerability Scanner:</strong> Scan for common vulns</div>
            <div class="info-block"><strong>Payload Generator:</strong> Reverse shell payloads</div>
            <div class="info-block"><strong>Hash Cracker:</strong> MD5/SHA hashes</div>
            <div class="info-block"><strong>Exploit Database:</strong> Search known exploits</div>
            <p style="margin-top:12px;color:#ffaa44;font-size:15px;font-weight:900;">⚠️ EDUCATIONAL USE ONLY</p>
        `;
    }

    getWhiteHatInfo() {
        return `
            <div class="info-block"><strong>🤍 White Hat Defense — Security</strong></div>
            <div class="info-block"><strong>SSL Checker:</strong> Certificate validity</div>
            <div class="info-block"><strong>Header Analyzer:</strong> HTTP security headers</div>
            <div class="info-block"><strong>Breach Check:</strong> Password leak detection</div>
            <div class="info-block"><strong>URL Scanner:</strong> Malware/phishing scan</div>
            <p style="margin-top:12px;color:var(--text-dim);font-size:15px;font-weight:700;">✅ All tools available.</p>
        `;
    }

    getLanguagesInfo() {
        const langs = ['Python', 'JavaScript', 'C', 'C++', 'SQL', 'Bash', 'Ruby', 'Go', 'Rust', 'PHP'];
        const icons = ['🐍', '⚡', '⚙️', '🔧', '🗄️', '💻', '💎', '🐹', '🦀', '🐘'];
        return `
            <div class="info-block"><strong>📚 Programming Languages</strong></div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;margin:12px 0;">
                ${langs.map((l, i) => `
                    <div style="background:rgba(179,0,255,0.06);border:1px solid rgba(179,0,255,0.12);border-radius:12px;padding:12px;text-align:center;cursor:pointer;" onclick="app.toast('📚 ${l} — Enroll now!','info')">
                        <div style="font-size:32px;">${icons[i]}</div>
                        <div style="font-weight:900;color:var(--neon-secondary);margin-top:4px;">${l}</div>
                    </div>
                `).join('')}
            </div>
            <button class="btn-action" onclick="app.showPayment('Course')">📚 Enroll Now</button>
        `;
    }

    getToolboxInfo() {
        return `
            <div class="info-block"><strong>🛠️ Toolbox Vault</strong></div>
            <div class="info-block"><strong>🔐 Text Encrypter:</strong> Caesar, ROT13, Base64</div>
            <div class="info-block"><strong>🔑 Password Generator:</strong> Strong passwords</div>
            <div class="info-block"><strong>📱 QR Code Generator:</strong> Create QR codes</div>
            <div class="info-block"><strong>🔗 URL Shortener:</strong> Shorten long URLs</div>
            <div class="info-block"><strong>🧮 Hash Generator:</strong> MD5/SHA1/SHA256</div>
            <p style="margin-top:12px;color:var(--text-dim);font-size:15px;font-weight:700;">✅ All tools ready.</p>
        `;
    }

    getCTFInfo() {
        const challenges = [
            { id: 1, name: 'Crack the Hash', answer: 'password' },
            { id: 2, name: 'Decode Binary', answer: 'I love' },
            { id: 3, name: 'Port Knowledge', answer: '22' },
            { id: 4, name: 'ROT13 Decode', answer: 'hello world' },
            { id: 5, name: 'Base64 Decode', answer: 'Hello World' },
        ];
        return `
            <div class="info-block"><strong>🏴‍☠️ CTF Arena</strong></div>
            ${challenges.map(c => `
                <div style="background:rgba(179,0,255,0.04);border:1px solid rgba(179,0,255,0.08);border-radius:12px;padding:14px 18px;margin-bottom:10px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;">
                        <span style="font-weight:900;color:var(--neon-primary);">#${c.id} ${c.name}</span>
                        <div style="display:flex;gap:8px;margin-top:6px;">
                            <input type="text" id="ctf_${c.id}" placeholder="Enter flag..." style="padding:8px 14px;background:rgba(179,0,255,0.06);border:1px solid rgba(179,0,255,0.15);border-radius:8px;color:#fff;font-weight:700;">
                            <button onclick="app.checkCTF(${c.id},'${c.answer}')" class="btn-action" style="padding:8px 18px;font-size:14px;width:auto;">Submit</button>
                        </div>
                    </div>
                    <div id="ctf_result_${c.id}" style="margin-top:8px;font-weight:900;"></div>
                </div>
            `).join('')}
        `;
    }

    checkCTF(id, answer) {
        const input = document.getElementById(`ctf_${id}`);
        const el = document.getElementById(`ctf_result_${id}`);
        if (!input || !el) return;
        const val = input.value.trim();
        if (val.toLowerCase() === answer.toLowerCase()) {
            el.innerHTML = '🏆 ✅ Correct! +50 XP';
            el.style.color = 'var(--neon-secondary)';
            const xp = parseInt(localStorage.getItem('xp') || '0') + 50;
            localStorage.setItem('xp', xp.toString());
        } else {
            el.innerHTML = '❌ Wrong answer. Try again!';
            el.style.color = '#ff2255';
        }
    }

    getNewsInfo() {
        return `
            <div class="info-block"><strong>📰 Hacker News Feed</strong></div>
            <div id="newsFeed"><p style="color:var(--text-dim);font-weight:700;">Loading news...</p></div>
        `;
    }

    getDictionaryInfo() {
        const terms = [
            { term: 'Phishing', def: 'Fraudulent attempt to obtain sensitive data.' },
            { term: 'DDoS', def: 'Distributed Denial of Service attack.' },
            { term: 'Rootkit', def: 'Malicious software giving root access.' },
            { term: 'RAT', def: 'Remote Access Trojan.' },
            { term: 'Zero-day', def: 'Vulnerability unknown to vendor.' },
            { term: 'Payload', def: 'Malware component that performs action.' },
            { term: 'Exploit', def: 'Code that takes advantage of vulnerability.' },
            { term: 'Firewall', def: 'Network security system monitoring traffic.' },
            { term: 'Encryption', def: 'Converting plaintext to ciphertext.' },
            { term: 'Pen-testing', def: 'Authorized simulated cyber attack.' },
        ];
        return `
            <div class="info-block"><strong>📖 Cyber Dictionary</strong></div>
            ${terms.map(t => `
                <div style="background:rgba(179,0,255,0.03);border:1px solid rgba(179,0,255,0.06);border-radius:10px;padding:12px 16px;margin-bottom:8px;cursor:pointer;" onclick="this.querySelector('.def').classList.toggle('hidden')">
                    <div style="color:var(--neon-secondary);font-weight:900;font-size:18px;">${t.term}</div>
                    <div class="def hidden" style="color:var(--text-secondary);font-weight:700;margin-top:6px;padding:8px 12px;border-left:3px solid var(--neon-primary);">${t.def}</div>
                </div>
            `).join('')}
        `;
    }

    getLogsInfo() {
        const logs = JSON.parse(localStorage.getItem('systemLogs') || '[]');
        const display = logs.length > 0 ? logs : [
            { time: new Date().toLocaleTimeString(), message: '🟢 System initialized', type: 'info' },
            { time: new Date().toLocaleTimeString(), message: '🔐 Secure channel established', type: 'info' },
        ];
        return `
            <div class="info-block"><strong>📋 System Logs</strong></div>
            <div style="background:rgba(0,0,0,0.5);border:1px solid rgba(179,0,255,0.08);border-radius:12px;padding:16px;max-height:300px;overflow-y:auto;font-family:monospace;">
                ${display.map(log => `
                    <div style="color:${log.type === 'error' ? '#ff2255' : log.type === 'warning' ? '#ffaa44' : '#b388ff'};font-size:14px;font-weight:700;padding:6px 0;border-bottom:1px solid rgba(179,0,255,0.04);">
                        <span style="color:var(--text-dim);">[${log.time}]</span> ${log.message}
                    </div>
                `).join('')}
            </div>
            <button class="btn-action-outline" style="margin-top:12px;" onclick="localStorage.setItem('systemLogs','[]');app.toast('🧹 Logs cleared','success');">🗑️ Clear Logs</button>
        `;
    }

    getMissionsInfo() {
        const missions = [
            'Watch 2 ethical hacking videos',
            'Practice SQL injection on test site',
            'Read 1 cybersecurity article',
            'Complete CTF challenge #1',
            'Generate a secure password (16+ chars)',
            'Research a CVE from the last 30 days'
        ];
        const xp = parseInt(localStorage.getItem('xp') || '0');
        return `
            <div class="info-block"><strong>🎯 Weekly Missions</strong></div>
            ${missions.map((m, i) => `
                <div style="background:rgba(179,0,255,0.03);border:1px solid rgba(179,0,255,0.06);border-radius:12px;padding:14px 18px;display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <span style="font-weight:900;font-size:16px;">🎯 ${m}</span>
                    <button onclick="app.completeMission(${i})" class="btn-action" style="padding:8px 20px;font-size:14px;width:auto;">✅ Complete</button>
                </div>
            `).join('')}
            <div style="margin-top:12px;padding:16px;background:rgba(179,0,255,0.04);border-radius:12px;text-align:center;">
                <span style="font-weight:900;font-size:20px;">🏆 XP: <span style="color:var(--neon-secondary);font-size:28px;">${xp}</span> pts</span>
            </div>
        `;
    }

    completeMission(index) {
        const xp = parseInt(localStorage.getItem('xp') || '0') + 10;
        localStorage.setItem('xp', xp.toString());
        this.toast('🏆 +10 XP!', 'success');
        this.renderHome();
    }

    // ============================================================
    // SERVICES PAGE (Full)
    // ============================================================
    renderServices() {
        const services = [
            { icon: '🌐', name: 'DNS Lookup', desc: 'Get DNS records for any domain', action: 'dns' },
            { icon: '🔍', name: 'WHOIS Search', desc: 'Lookup domain registration info', action: 'whois' },
            { icon: '📡', name: 'Port Scanner', desc: 'Scan ports on any IP', action: 'port' },
            { icon: '🔗', name: 'Link Checker', desc: 'Check if a link is safe', action: 'link' },
            { icon: '📧', name: 'Email Validator', desc: 'Validate email addresses', action: 'email' },
            { icon: '🌍', name: 'GeoIP Lookup', desc: 'Get location from IP address', action: 'geoip' },
            { icon: '🔐', name: 'SSL Checker', desc: 'Check SSL certificate validity', action: 'ssl' },
            { icon: '🛡️', name: 'Header Analyzer', desc: 'Analyze HTTP security headers', action: 'headers' },
        ];

        const html = `
            <h2 style="font-size:32px;font-weight:900;background:linear-gradient(135deg,var(--neon-primary),var(--neon-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:22px;letter-spacing:3px;">📡 Services</h2>
            <div class="dashboard-grid">
                ${services.map(s => `
                    <div class="dashboard-card" onclick="app.runService('${s.action}','${s.name}')">
                        <span class="card-icon">${s.icon}</span>
                        <div class="card-title">${s.name}</div>
                        <div class="card-desc">${s.desc}</div>
                        <span class="card-badge">▶ LAUNCH</span>
                    </div>
                `).join('')}
            </div>
        `;
        document.getElementById('pageContent').innerHTML = html;
    }

    runService(action, name) {
        this.runWithBootloader(() => {
            let content = '';
            switch (action) {
                case 'dns':
                    content = `
                        <div class="info-block"><strong>🌐 DNS Lookup</strong></div>
                        <input type="text" id="dnsInput" placeholder="Enter domain..." style="width:100%;padding:16px;background:rgba(179,0,255,0.06);border:2px solid rgba(179,0,255,0.2);border-radius:12px;color:#fff;font-size:17px;font-weight:700;margin:12px 0;">
                        <button class="btn-action" onclick="app.doDNS()">▶ Lookup</button>
                        <div id="dnsResult" style="background:rgba(0,0,0,0.4);padding:16px;border-radius:12px;margin-top:10px;border:1px solid rgba(179,0,255,0.08);color:var(--neon-secondary);font-weight:900;">Results will appear here</div>
                    `;
                    break;
                case 'whois':
                    content = `
                        <div class="info-block"><strong>🔍 WHOIS Search</strong></div>
                        <input type="text" id="whoisInput" placeholder="Enter domain..." style="width:100%;padding:16px;background:rgba(179,0,255,0.06);border:2px solid rgba(179,0,255,0.2);border-radius:12px;color:#fff;font-size:17px;font-weight:700;margin:12px 0;">
                        <button class="btn-action" onclick="app.doWHOIS()">▶ Search</button>
                        <div id="whoisResult" style="background:rgba(0,0,0,0.4);padding:16px;border-radius:12px;margin-top:10px;border:1px solid rgba(179,0,255,0.08);color:var(--neon-secondary);font-weight:900;">Results will appear here</div>
                    `;
                    break;
                case 'port':
                    content = `
                        <div class="info-block"><strong>📡 Port Scanner</strong></div>
                        <input type="text" id="portInput" placeholder="Enter IP..." style="width:100%;padding:16px;background:rgba(179,0,255,0.06);border:2px solid rgba(179,0,255,0.2);border-radius:12px;color:#fff;font-size:17px;font-weight:700;margin:12px 0;">
                        <button class="btn-action" onclick="app.doPortScan()">▶ Scan</button>
                        <div id="portResult" style="background:rgba(0,0,0,0.4);padding:16px;border-radius:12px;margin-top:10px;border:1px solid rgba(179,0,255,0.08);color:var(--neon-secondary);font-weight:900;">Results will appear here</div>
                    `;
                    break;
                case 'link':
                    content = `
                        <div class="info-block"><strong>🔗 Link Checker</strong></div>
                        <input type="url" id="linkInput" placeholder="Enter URL..." style="width:100%;padding:16px;background:rgba(179,0,255,0.06);border:2px solid rgba(179,0,255,0.2);border-radius:12px;color:#fff;font-size:17px;font-weight:700;margin:12px 0;">
                        <button class="btn-action" onclick="app.doLinkCheck()">▶ Check</button>
                        <div id="linkResult" style="background:rgba(0,0,0,0.4);padding:16px;border-radius:12px;margin-top:10px;border:1px solid rgba(179,0,255,0.08);color:var(--neon-secondary);font-weight:900;">Results will appear here</div>
                    `;
                    break;
                case 'email':
                    content = `
                        <div class="info-block"><strong>📧 Email Validator</strong></div>
                        <input type="email" id="emailInput" placeholder="Enter email..." style="width:100%;padding:16px;background:rgba(179,0,255,0.06);border:2px solid rgba(179,0,255,0.2);border-radius:12px;color:#fff;font-size:17px;font-weight:700;margin:12px 0;">
                        <button class="btn-action" onclick="app.doEmailValidate()">▶ Validate</button>
                        <div id="emailResult" style="background:rgba(0,0,0,0.4);padding:16px;border-radius:12px;margin-top:10px;border:1px solid rgba(179,0,255,0.08);color:var(--neon-secondary);font-weight:900;">Results will appear here</div>
                    `;
                    break;
                case 'geoip':
                    content = `
                        <div class="info-block"><strong>🌍 GeoIP Lookup</strong></div>
                        <input type="text" id="geoInput" placeholder="Enter IP..." style="width:100%;padding:16px;background:rgba(179,0,255,0.06);border:2px solid rgba(179,0,255,0.2);border-radius:12px;color:#fff;font-size:17px;font-weight:700;margin:12px 0;">
                        <button class="btn-action" onclick="app.doGeoIP()">▶ Lookup</button>
                        <div id="geoResult" style="background:rgba(0,0,0,0.4);padding:16px;border-radius:12px;margin-top:10px;border:1px solid rgba(179,0,255,0.08);color:var(--neon-secondary);font-weight:900;">Results will appear here</div>
                    `;
                    break;
                case 'ssl':
                    content = `
                        <div class="info-block"><strong>🔐 SSL Checker</strong></div>
                        <input type="text" id="sslInput" placeholder="Enter domain..." style="width:100%;padding:16px;background:rgba(179,0,255,0.06);border:2px solid rgba(179,0,255,0.2);border-radius:12px;color:#fff;font-size:17px;font-weight:700;margin:12px 0;">
                        <button class="btn-action" onclick="app.doSSL()">▶ Check</button>
                        <div id="sslResult" style="background:rgba(0,0,0,0.4);padding:16px;border-radius:12px;margin-top:10px;border:1px solid rgba(179,0,255,0.08);color:var(--neon-secondary);font-weight:900;">Results will appear here</div>
                    `;
                    break;
                case 'headers':
                    content = `
                        <div class="info-block"><strong>🛡️ Header Analyzer</strong></div>
                        <input type="text" id="headersInput" placeholder="Enter domain..." style="width:100%;padding:16px;background:rgba(179,0,255,0.06);border:2px solid rgba(179,0,255,0.2);border-radius:12px;color:#fff;font-size:17px;font-weight:700;margin:12px 0;">
                        <button class="btn-action" onclick="app.doHeaders()">▶ Analyze</button>
                        <div id="headersResult" style="background:rgba(0,0,0,0.4);padding:16px;border-radius:12px;margin-top:10px;border:1px solid rgba(179,0,255,0.08);color:var(--neon-secondary);font-weight:900;">Results will appear here</div>
                    `;
                    break;
                default:
                    content = `<p>Service "${name}" is ready.</p>`;
            }
            const html = `
                <div class="detail-panel">
                    <button class="back-btn" onclick="app.navigateTo('services')">← BACK</button>
                    <h2>${name}</h2>
                    ${content}
                    <div style="margin-top:18px;padding-top:14px;border-top:1px solid rgba(179,0,255,0.08);">
                        <button class="btn-action-outline" onclick="app.navigateTo('services')">← Close</button>
                    </div>
                </div>
            `;
            document.getElementById('pageContent').innerHTML = html;
        });
    }

    // ---- Service Actions ----
    doDNS() {
        const input = document.getElementById('dnsInput');
        const result = document.getElementById('dnsResult');
        if (!input || !result) return;
        const domain = input.value.trim();
        if (!domain) { result.textContent = '⚠️ Enter a domain.'; return; }
        result.textContent = '🔍 Looking up...';
        fetch(`https://dns.google/resolve?name=${domain}&type=A`)
            .then(r => r.json())
            .then(data => {
                if (data.Answer && data.Answer.length > 0) {
                    result.innerHTML = data.Answer.map(r =>
                        `<div style="padding:4px 0;border-bottom:1px solid rgba(179,0,255,0.05);font-weight:700;">📍 ${r.data} (TTL: ${r.TTL})</div>`
                    ).join('');
                    result.style.color = 'var(--neon-secondary)';
                } else {
                    result.textContent = '❌ No A records found.';
                    result.style.color = '#ffaa44';
                }
            })
            .catch(() => {
                result.textContent = '❌ DNS lookup failed.';
                result.style.color = '#ff2255';
            });
    }

    doWHOIS() {
        const input = document.getElementById('whoisInput');
        const result = document.getElementById('whoisResult');
        if (!input || !result) return;
        const domain = input.value.trim();
        if (!domain) { result.textContent = '⚠️ Enter a domain.'; return; }
        result.textContent = '🔍 Looking up...';
        setTimeout(() => {
            result.innerHTML = `
                <div style="padding:4px 0;font-weight:700;"><strong>Domain:</strong> ${domain}</div>
                <div style="padding:4px 0;font-weight:700;"><strong>Registrar:</strong> GoDaddy (simulated)</div>
                <div style="padding:4px 0;font-weight:700;"><strong>Created:</strong> ${new Date(Date.now() - Math.random()*10*365*24*60*60*1000).toDateString()}</div>
                <div style="padding:4px 0;font-weight:700;"><strong>Expires:</strong> ${new Date(Date.now() + Math.random()*3*365*24*60*60*1000).toDateString()}</div>
                <div style="color:#ffaa44;font-size:15px;font-weight:700;margin-top:8px;">⚠️ Simulated data</div>
            `;
            result.style.color = 'var(--neon-secondary)';
        }, 800);
    }

    doPortScan() {
        const input = document.getElementById('portInput');
        const result = document.getElementById('portResult');
        if (!input || !result) return;
        const ip = input.value.trim();
        if (!ip) { result.textContent = '⚠️ Enter an IP.'; return; }
        result.textContent = '🔍 Scanning...';
        const ports = [21, 22, 25, 53, 80, 443, 3306, 8080, 8443];
        const open = ports.filter(() => Math.random() > 0.5);
        setTimeout(() => {
            result.innerHTML = `
                <div style="padding:4px 0;font-weight:700;"><strong>Target:</strong> ${ip}</div>
                <div style="padding:4px 0;font-weight:700;"><strong>Open Ports:</strong> ${open.length > 0 ? open.join(', ') : 'None'}</div>
                <div style="color:#ffaa44;font-size:15px;font-weight:700;margin-top:8px;">⚠️ Simulated scan</div>
            `;
            result.style.color = 'var(--neon-secondary)';
        }, 1200);
    }

    doLinkCheck() {
        const input = document.getElementById('linkInput');
        const result = document.getElementById('linkResult');
        if (!input || !result) return;
        const url = input.value.trim();
        if (!url) { result.textContent = '⚠️ Enter a URL.'; return; }
        result.textContent = '🔍 Checking...';
        setTimeout(() => {
            const safe = Math.random() > 0.15;
            result.innerHTML = `
                <div style="padding:4px 0;font-weight:700;"><strong>URL:</strong> ${url}</div>
                <div style="padding:4px 0;font-weight:700;"><strong>Status:</strong> <span style="color:${safe ? 'var(--neon-secondary)' : '#ff2255'};font-weight:900;">${safe ? '✅ SAFE' : '⚠️ SUSPICIOUS'}</span></div>
                <div style="color:#ffaa44;font-size:15px;font-weight:700;margin-top:8px;">⚠️ Simulated check</div>
            `;
            result.style.color = 'var(--neon-secondary)';
        }, 1000);
    }

    doEmailValidate() {
        const input = document.getElementById('emailInput');
        const result = document.getElementById('emailResult');
        if (!input || !result) return;
        const email = input.value.trim();
        if (!email) { result.textContent = '⚠️ Enter an email.'; return; }
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        result.innerHTML = `
            <div style="padding:4px 0;font-weight:700;"><strong>Email:</strong> ${email}</div>
            <div style="padding:4px 0;font-weight:700;"><strong>Valid:</strong> <span style="color:${valid ? 'var(--neon-secondary)' : '#ff2255'};font-weight:900;">${valid ? '✅ YES' : '❌ NO'}</span></div>
        `;
        result.style.color = 'var(--neon-secondary)';
    }

    doGeoIP() {
        const input = document.getElementById('geoInput');
        const result = document.getElementById('geoResult');
        if (!input || !result) return;
        const ip = input.value.trim();
        if (!ip) { result.textContent = '⚠️ Enter an IP.'; return; }
        result.textContent = '🌍 Looking up...';
        fetch(`http://ip-api.com/json/${ip}`)
            .then(r => r.json())
            .then(data => {
                if (data.status === 'success') {
                    result.innerHTML = `
                        <div style="padding:4px 0;font-weight:700;"><strong>IP:</strong> ${data.query}</div>
                        <div style="padding:4px 0;font-weight:700;"><strong>Country:</strong> ${data.country}</div>
                        <div style="padding:4px 0;font-weight:700;"><strong>City:</strong> ${data.city}</div>
                        <div style="padding:4px 0;font-weight:700;"><strong>ISP:</strong> ${data.isp}</div>
                    `;
                    result.style.color = 'var(--neon-secondary)';
                } else {
                    result.textContent = '❌ IP lookup failed.';
                    result.style.color = '#ffaa44';
                }
            })
            .catch(() => {
                result.textContent = '❌ GeoIP API error.';
                result.style.color = '#ff2255';
            });
    }

    doSSL() {
        const input = document.getElementById('sslInput');
        const result = document.getElementById('sslResult');
        if (!input || !result) return;
        const domain = input.value.trim();
        if (!domain) { result.textContent = '⚠️ Enter a domain.'; return; }
        result.textContent = '🔐 Checking SSL...';
        setTimeout(() => {
            result.innerHTML = `
                <div style="padding:4px 0;font-weight:700;"><strong>Domain:</strong> ${domain}</div>
                <div style="padding:4px 0;font-weight:700;"><strong>Certificate:</strong> ✅ Valid</div>
                <div style="padding:4px 0;font-weight:700;"><strong>Issuer:</strong> Let's Encrypt</div>
                <div style="padding:4px 0;font-weight:700;"><strong>Protocol:</strong> TLS 1.3</div>
                <div style="color:#ffaa44;font-size:15px;font-weight:700;margin-top:8px;">⚠️ Simulated check</div>
            `;
            result.style.color = 'var(--neon-secondary)';
        }, 1000);
    }

    doHeaders() {
        const input = document.getElementById('headersInput');
        const result = document.getElementById('headersResult');
        if (!input || !result) return;
        const domain = input.value.trim();
        if (!domain) { result.textContent = '⚠️ Enter a domain.'; return; }
        result.textContent = '🛡️ Analyzing headers...';
        setTimeout(() => {
            result.innerHTML = `
                <div style="padding:4px 0;font-weight:700;"><strong>Target:</strong> ${domain}</div>
                <div style="padding:4px 0;font-weight:700;">X-Frame-Options: SAMEORIGIN ✅</div>
                <div style="padding:4px 0;font-weight:700;">X-Content-Type-Options: nosniff ✅</div>
                <div style="padding:4px 0;font-weight:700;">HSTS: max-age=31536000 ✅</div>
                <div style="padding:4px 0;font-weight:700;">CSP: default-src 'self' ✅</div>
                <div style="color:#ffaa44;font-size:15px;font-weight:700;margin-top:8px;">⚠️ Simulated analysis</div>
            `;
            result.style.color = 'var(--neon-secondary)';
        }, 1000);
    }

    // ============================================================
    // SETTINGS FULL PAGE
    // ============================================================
    renderSettingsFull() {
        const html = `
            <div class="detail-panel">
                <button class="back-btn" onclick="app.navigateTo('home')">← BACK</button>
                <h2>⚙️ Settings</h2>
                <div class="info-block"><strong>🎨 Theme Customizer</strong></div>
                <div style="margin:16px 0;">
                    <label style="color:var(--text-secondary);font-weight:900;display:block;margin-bottom:8px;">Primary Neon Color</label>
                    <select onchange="document.documentElement.style.setProperty('--neon-primary',this.value);document.documentElement.style.setProperty('--neon-glow',this.value+'60');this.style.borderColor=this.value;app.toast('🎨 Theme updated','success')" style="width:100%;padding:14px;background:rgba(179,0,255,0.06);border:2px solid rgba(179,0,255,0.20);border-radius:12px;color:#fff;font-size:17px;font-weight:700;">
                        <option value="#b300ff">💜 Purple (Default)</option>
                        <option value="#ff00e6">💗 Pink</option>
                        <option value="#00f5ff">💠 Cyan</option>
                        <option value="#ff6600">🔥 Orange</option>
                        <option value="#00ff66">🌿 Green</option>
                        <option value="#ff0044">❤️ Red</option>
                    </select>
                </div>
                <div style="margin:16px 0;">
                    <label style="color:var(--text-secondary);font-weight:900;display:block;margin-bottom:8px;">Secondary Neon Color</label>
                    <select onchange="document.documentElement.style.setProperty('--neon-secondary',this.value);document.documentElement.style.setProperty('--neon-glow2',this.value+'60');app.toast('🎨 Theme updated','success')" style="width:100%;padding:14px;background:rgba(179,0,255,0.06);border:2px solid rgba(179,0,255,0.20);border-radius:12px;color:#fff;font-size:17px;font-weight:700;">
                        <option value="#00f5ff">💠 Cyan (Default)</option>
                        <option value="#ff00e6">💗 Pink</option>
                        <option value="#b300ff">💜 Purple</option>
                        <option value="#00ff66">🌿 Green</option>
                        <option value="#ff6600">🔥 Orange</option>
                    </select>
                </div>
                <button onclick="document.documentElement.style.setProperty('--neon-primary','#b300ff');document.documentElement.style.setProperty('--neon-secondary','#00f5ff');document.documentElement.style.setProperty('--neon-glow','rgba(179,0,255,0.6)');document.documentElement.style.setProperty('--neon-glow2','rgba(0,245,255,0.4)');app.toast('🔄 Reset to default','success');" class="btn-action-outline" style="width:100%;">🔄 Reset to Default</button>
                <div style="margin-top:16px;padding-top:14px;border-top:1px solid rgba(179,0,255,0.08);">
                    <div class="info-block"><strong>ℹ️ System Info</strong></div>
                    <div style="color:var(--text-secondary);font-weight:700;padding:4px 0;">Version: 5.4</div>
                    <div style="color:var(--text-secondary);font-weight:700;padding:4px 0;">Developer: BL@CKN1TE</div>
                    <div style="color:var(--text-secondary);font-weight:700;padding:4px 0;">License: Educational Use Only</div>
                </div>
            </div>
        `;
        document.getElementById('pageContent').innerHTML = html;
    }

    // ============================================================
    // NOTIFICATIONS
    // ============================================================
    renderNotifications() {
        const notifications = [
            { icon: '🔔', title: 'System Update', desc: 'NEXUS v5.4 is now available', time: '2 min ago' },
            { icon: '📡', title: 'Security Alert', desc: 'Firewall rule 13 bypassed (resolved)', time: '15 min ago' },
            { icon: '📚', title: 'New Course Available', desc: 'Python for Ethical Hacking', time: '1 hour ago' },
            { icon: '🏆', title: 'Achievement Unlocked', desc: 'You completed 5 missions!', time: '3 hours ago' },
            { icon: '🔐', title: 'Login Alert', desc: 'New login from IP 192.168.1.1', time: '5 hours ago' },
        ];

        const html = `
            <div class="detail-panel">
                <button class="back-btn" onclick="app.navigateTo('home')">← BACK</button>
                <h2>🔔 Notifications</h2>
                ${notifications.map(n => `
                    <div style="background:rgba(179,0,255,0.04);border:1px solid rgba(179,0,255,0.08);border-radius:12px;padding:16px 18px;margin-bottom:10px;">
                        <div style="display:flex;align-items:center;gap:14px;">
                            <span style="font-size:28px;">${n.icon}</span>
                            <div style="flex:1;">
                                <div style="font-weight:900;color:var(--neon-secondary);font-size:17px;">${n.title}</div>
                                <div style="color:var(--text-secondary);font-weight:700;font-size:14px;">${n.desc}</div>
                                <div style="color:var(--text-dim);font-weight:700;font-size:12px;margin-top:4px;">${n.time}</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
                <div style="margin-top:14px;padding-top:14px;border-top:1px solid rgba(179,0,255,0.08);">
                    <button class="btn-action-outline" onclick="app.toast('🔔 All notifications cleared','success')">🗑️ Clear All</button>
                    <button class="btn-action-outline" onclick="app.navigateTo('home')">← Close</button>
                </div>
            </div>
        `;
        document.getElementById('pageContent').innerHTML = html;
    }

    // ============================================================
    // DEPLOY PAGE
    // ============================================================
    renderDeploy() {
        this.runWithBootloader(() => {
            const sites = [
                { name: 'Vercel', icon: '▲', url: 'https://vercel.com' },
                { name: 'Render', icon: '⚡', url: 'https://render.com' },
                { name: 'GitHub Pages', icon: '🐙', url: 'https://pages.github.com' },
                { name: 'Netlify', icon: '🌐', url: 'https://netlify.com' },
            ];

            const html = `
                <h2 style="font-size:32px;font-weight:900;background:linear-gradient(135deg,var(--neon-primary),var(--neon-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:22px;letter-spacing:3px;">🚀 Free Deployment Platforms</h2>
                <div class="dashboard-grid">
                    ${sites.map(s => `
                        <div class="dashboard-card" onclick="window.open('${s.url}','_blank')">
                            <div style="font-size:48px;text-align:center;">${s.icon}</div>
                            <div class="card-title" style="text-align:center;">${s.name}</div>
                            <div class="card-desc" style="text-align:center;font-size:14px;">Click to visit →</div>
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top:18px;padding:18px;background:rgba(179,0,255,0.04);border:2px solid rgba(179,0,255,0.08);border-radius:14px;text-align:center;">
                    <p style="color:var(--text-secondary);font-size:17px;font-weight:900;">💡 Deploy your own web apps for free!</p>
                </div>
            `;
            document.getElementById('pageContent').innerHTML = html;
        });
    }

    // ============================================================
    // ABOUT PAGE - With 2026 BL@CKN1TE THE INCISIVE TRI-HAT HACKER
    // ============================================================
    renderAbout() {
        this.runWithBootloader(() => {
            const html = `
                <div class="detail-panel">
                    <button class="back-btn" onclick="app.navigateTo('home')">← BACK</button>
                    <h2>ℹ️ About NEXUS: OVERRIDE</h2>
                    <div style="margin:16px 0;padding:20px;background:rgba(179,0,255,0.04);border-radius:14px;border-left:4px solid var(--neon-primary);">
                        <p style="color:var(--text-secondary);font-size:17px;font-weight:700;line-height:2.2;">
                            <strong style="color:var(--neon-primary);font-size:18px;">Version:</strong> 5.4<br>
                            <strong style="color:var(--neon-primary);font-size:18px;">Developer:</strong> BL@CKN1TE<br>
                            <strong style="color:var(--neon-primary);font-size:18px;">Title:</strong> THE INCISIVE TRI-HAT HACKER<br>
                            <strong style="color:var(--neon-primary);font-size:18px;">Year:</strong> 2026<br>
                            <strong style="color:var(--neon-primary);font-size:18px;">Status:</strong> <span style="color:var(--neon-secondary);">✅ System Optimal</span><br>
                            <strong style="color:var(--neon-primary);font-size:18px;">Mission:</strong> Cybersecurity education & ethical hacking<br>
                            <strong style="color:var(--neon-primary);font-size:18px;">Tech Stack:</strong> HTML5, CSS3, JavaScript, REST APIs<br>
                            <strong style="color:var(--neon-primary);font-size:18px;">License:</strong> Educational Use Only
                        </p>
                    </div>

                    <div style="margin-top:20px;padding:16px;background:rgba(0,245,255,0.04);border-radius:12px;border:1px solid rgba(0,245,255,0.10);text-align:center;">
                        <p style="color:var(--neon-secondary);font-size:18px;font-weight:900;letter-spacing:2px;">
                            ⚡ 2026 BL@CKN1TE · THE INCISIVE TRI-HAT HACKER · SYSTEM OPTIMAL ⚡
                        </p>
                    </div>

                    <h3 style="color:var(--neon-secondary);font-size:22px;font-weight:900;margin:22px 0 12px;">📞 Contact</h3>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">
                        <button onclick="window.open('https://wa.me/${CONFIG.WHATSAPP.primary.replace('+', '')}','_blank')" class="btn-action-outline" style="padding:14px;font-size:16px;">📱 ${CONFIG.WHATSAPP.primary}</button>
                        <button onclick="window.open('https://wa.me/${CONFIG.WHATSAPP.secondary.replace('+', '')}','_blank')" class="btn-action-outline" style="padding:14px;font-size:16px;">📱 ${CONFIG.WHATSAPP.secondary}</button>
                    </div>
                    ${Object.values(CONFIG.EMAILS).map(email => `
                        <button onclick="window.location.href='mailto:${email}'" class="btn-action-outline" style="width:100%;padding:14px;font-size:16px;margin-bottom:6px;">✉️ ${email}</button>
                    `).join('')}

                    <div style="margin-top:20px;padding-top:16px;border-top:2px solid rgba(179,0,255,0.08);">
                        <p style="color:var(--text-dim);font-size:13px;font-weight:900;text-align:center;letter-spacing:1px;">⚠️ EDUCATIONAL USE ONLY — All techniques shown are for learning.</p>
                    </div>
                </div>
            `;
            document.getElementById('pageContent').innerHTML = html;
        });
    }

    // ============================================================
    // PAYMENT
    // ============================================================
    showPayment(lang) {
        const modal = document.createElement('div');
        modal.className = 'payment-modal';
        modal.innerHTML = `
            <div class="modal-box">
                <h3>💳 Enroll in ${lang}</h3>
                <p class="modal-sub">Choose payment method</p>
                <button class="payment-btn" onclick="app.copyNumber('${CONFIG.WHATSAPP.secondary}')">💰 EcoCash: ${CONFIG.WHATSAPP.secondary}</button>
                <button class="payment-btn" onclick="app.copyNumber('${CONFIG.WHATSAPP.primary}')">💰 OneMoney: ${CONFIG.WHATSAPP.primary}</button>
                <button class="btn-action" style="width:100%;margin:8px 0;" onclick="app.sendPayment('${lang}')">✅ Send Confirmation</button>
                <button class="close-modal" onclick="this.closest('.payment-modal').remove()">✕ Close</button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    copyNumber(num) {
        navigator.clipboard.writeText(num).then(() => {
            this.toast('✅ Number copied!', 'success');
        }).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = num;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            ta.remove();
            this.toast('✅ Number copied!', 'success');
        });
    }

    sendPayment(lang) {
        const msg = encodeURIComponent(
            `Hey BL@CKN1TE check your account I've paid for ${lang}. Should I roll in for the lessons?`);
        window.open(`https://wa.me/${CONFIG.WHATSAPP.primary.replace('+', '')}?text=${msg}`, '_blank');
        document.querySelectorAll('.payment-modal').forEach(el => el.remove());
    }

    // ============================================================
    // MONITORS & CLOCK
    // ============================================================
    startMonitors() {
        setInterval(() => {
            const threats = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
            const el = document.getElementById('threatLevel');
            if (el) {
                const level = threats[Math.floor(Math.random() * threats.length)];
                el.textContent = level;
                el.className = 'monitor-value ' + (level === 'LOW' ? 'accent' : level === 'CRITICAL' ? 'danger' : '');
            }
        }, 8000);

        setInterval(() => {
            const el = document.getElementById('userCount');
            if (el) el.textContent = CONFIG.USER_COUNT;
        }, 5000);
    }

    updateClock() {
        const now = new Date();
        // No clock display needed anymore
    }

    // ============================================================
    // TOAST
    // ============================================================
    toast(message, type = 'info') {
        document.querySelectorAll('.toast').forEach(el => el.remove());
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.4s ease';
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    // ============================================================
    // SIGN OUT (with Logout Bootloader)
    // ============================================================
    signOut() {
        this.showLogoutBootloader(() => {
            localStorage.removeItem('nexusSession');
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            document.getElementById('loginScreen').classList.add('active');
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            this.toast('👋 Signed out successfully', 'info');
        });
    }
}

// ============================================================
// INITIALIZE
// ============================================================
const app = new App();
window.app = app;