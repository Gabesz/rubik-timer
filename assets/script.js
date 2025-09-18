const { createApp } = Vue;

createApp({
        data() {
        return {
            startTime: null,
            elapsedTime: 0,
            isRunning: false,
            intervalId: null,
            bestTimes: [],
            isEditMode: false,
            speechRecognition: null,
            isListening: false
        }
    },
    computed: {
        formattedTime() {
            const minutes = Math.floor(this.elapsedTime / 60000);
            const seconds = Math.floor((this.elapsedTime % 60000) / 1000);
            const centiseconds = Math.floor((this.elapsedTime % 1000) / 10);
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
        }
    },
    mounted() {
        this.checkEditMode();
        this.loadBestTimes();
        this.setupKeyboardShortcuts();
        this.setupTimeUpdater();
        this.setupSpeechRecognition();
    },
    methods: {
        start() {
            if (!this.isRunning) {
                this.startTime = Date.now() - this.elapsedTime;
                this.isRunning = true;
                this.intervalId = setInterval(() => {
                    this.elapsedTime = Date.now() - this.startTime;
                }, 10);
            }
        },
        stop() {
            if (this.isRunning) {
                this.isRunning = false;
                clearInterval(this.intervalId);
            }
        },
        reset() {
            if (this.elapsedTime > 1000) { // Csak akkor mentse, ha legalább 1 másodperc
                this.saveTime();
            }
            this.isRunning = false;
            clearInterval(this.intervalId);
            this.elapsedTime = 0;
            this.startTime = null;
        },
        saveTime() {
            this.bestTimes.push({
                time: this.elapsedTime,
                timestamp: Date.now()
            });
            this.bestTimes.sort((a, b) => a.time - b.time);
            this.bestTimes = this.bestTimes.slice(0, 10);
            this.saveBestTimes();
        },
        formatTime(milliseconds) {
            const minutes = Math.floor(milliseconds / 60000);
            const seconds = Math.floor((milliseconds % 60000) / 1000);
            const centiseconds = Math.floor((milliseconds % 1000) / 10);
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
        },
        formatTimeAgo(timestamp) {
            const now = Date.now();
            const diff = now - timestamp;
            const minutes = Math.floor(diff / 60000);
            const hours = Math.floor(diff / 3600000);
            const days = Math.floor(diff / 86400000);
            
            if (days > 0) {
                return `${days} napja`;
            } else if (hours > 0) {
                return `${hours} órája`;
            } else if (minutes > 0) {
                return `${minutes} perce`;
            } else {
                return 'most';
            }
        },
        saveBestTimes() {
            localStorage.setItem('stopperBestTimes', JSON.stringify(this.bestTimes));
        },
        loadBestTimes() {
            const saved = localStorage.getItem('stopperBestTimes');
            if (saved) {
                const parsed = JSON.parse(saved);
                // Ha régi formátum (csak számok), konvertáljuk új formátumra
                if (parsed.length > 0 && typeof parsed[0] === 'number') {
                    this.bestTimes = parsed.map(time => ({
                        time: time,
                        timestamp: Date.now() // Jelenlegi időt használunk, mivel nincs régi timestamp
                    }));
                } else {
                    this.bestTimes = parsed;
                }
            }
        },
        removeTime(index) {
            if (confirm('Biztosan törölni szeretnéd ezt az időt?')) {
                this.bestTimes.splice(index, 1);
                this.saveBestTimes();
            }
        },
        removeTimeSimple(index) {
            this.bestTimes.splice(index, 1);
            this.saveBestTimes();
        },
        clearAllTimes(byVoice = false) {
            // Ha hangparancsról van szó, ne kérjen megerősítést
            if (byVoice || confirm('Are you sure you want to delete all saved times?')) {
                this.bestTimes = [];
                this.saveBestTimes();
            }
        },
        setupKeyboardShortcuts() {
            document.addEventListener('keydown', (event) => {
                if (event.altKey && event.key === 's') {
                    event.preventDefault();
                    console.log('🎯 Keyboard shortcut activated: Alt + S (Start/Stop)');
                    if (this.isRunning) {
                        console.log('⏹️ Stopping stopwatch');
                        this.stop();
                    } else {
                        console.log('▶️ Starting stopwatch');
                        this.start();
                    }
                }
                if (event.altKey && event.key === 'x') {
                    event.preventDefault();
                    console.log('🎯 Keyboard shortcut activated: Alt + X (Reset & Save)');
                    console.log('🔄 Resetting and saving time');
                    this.reset();
                }
            });
        },
        setupTimeUpdater() {
            // Frissítsük az időbélyegeket percenként
            setInterval(() => {
                // Vue reaktivitás miatt kényszerítjük a frissítést
                this.$forceUpdate();
            }, 60000); // 60 másodperc = 1 perc
        },
        checkEditMode() {
            const urlParams = new URLSearchParams(window.location.search);
            this.isEditMode = urlParams.get('edit') === '1';
            
            // Body osztály beállítása
            if (this.isEditMode) {
                document.body.classList.add('edit-mode');
            } else {
                document.body.classList.remove('edit-mode');
            }
        },
        switchToEditMode() {
            // URL frissítése edit módra
            const url = new URL(window.location);
            url.searchParams.set('edit', '1');
            window.location.href = url.toString();
        },
        switchToLiveMode() {
            // URL frissítése normál módra (edit paraméter eltávolítása)
            const url = new URL(window.location);
            url.searchParams.delete('edit');
            window.location.href = url.toString();
        },
        setupSpeechRecognition() {
            // Ellenőrizzük, hogy a böngésző támogatja-e a Speech Recognition API-t
            if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                console.log('❌ Speech Recognition API not supported in this browser');
                return;
            }

            // Speech Recognition inicializálása
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.speechRecognition = new SpeechRecognition();
            
            // Beállítások - optimalizálva a gyorsabb reagálásért
            this.speechRecognition.continuous = true;
            this.speechRecognition.interimResults = true; // Köztes eredményeket is figyeljük
            this.speechRecognition.lang = 'hu-HU'; // Magyar nyelv
            this.speechRecognition.maxAlternatives = 1; // Csak 1 alternatíva
            
            // Eseménykezelők
            this.speechRecognition.onstart = () => {
                console.log('🎤 Speech recognition started');
                this.isListening = true;
            };

            this.speechRecognition.onresult = (event) => {
                // Köztes és végső eredményeket is figyeljük a gyorsabb reagálásért
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const result = event.results[i];
                    const command = result[0].transcript.toLowerCase().trim();
                    
                    // Ha köztes eredmény, de már tartalmazza a parancsot, azonnal reagálunk
                    if (result.isFinal || command.includes('start') || command.includes('stop') || command.includes('reset') || 
                        command.includes('indít') || command.includes('kezd') || command.includes('megáll') || 
                        command.includes('állj') || command.includes('vissza') || command.includes('nulla') ||
                        command.includes('összes') || command.includes('clear') || command.includes('töröl')) {
                        console.log('🎤 Voice command detected:', command, result.isFinal ? '(final)' : '(interim)');
                        
                        // Parancs feldolgozása - magyar és angol parancsok
                        if (command.includes('start') || command.includes('indít') || command.includes('kezd')) {
                            console.log('🎯 Voice command: START/INDÍT/KEZD');
                            if (!this.isRunning) {
                                this.start();
                            }
                            break; // Megállítjuk a további feldolgozást
                        } else if (command.includes('stop') || command.includes('megáll') || command.includes('állj')) {
                            console.log('🎯 Voice command: STOP/MEGÁLL/ÁLLJ');
                            if (this.isRunning) {
                                this.stop();
                            }
                            break;
                        } else if (command.includes('reset') || command.includes('vissza') || command.includes('nulla')) {
                            console.log('🎯 Voice command: RESET/VISSZA/NULLA');
                            this.reset();
                            break;
                        } else if (command.includes('összes') && command.includes('töröl') || 
                                   command.includes('clear') || command.includes('töröl') && command.includes('minden')) {
                            console.log('🎯 Voice command: ÖSSZES TÖRÖL/CLEAR');
                            this.clearAllTimes(true); // true = hangparancs, ne kérjen megerősítést
                            break;
                        }
                    }
                }
            };

            this.speechRecognition.onerror = (event) => {
                console.log('❌ Speech recognition error:', event.error);
                this.isListening = false;
            };

            this.speechRecognition.onend = () => {
                console.log('🎤 Speech recognition ended');
                this.isListening = false;
                // Automatikusan újraindítjuk a felismerést - gyorsabb újraindítás
                if (this.isEditMode) {
                    setTimeout(() => {
                        this.startListening();
                    }, 50); // Csökkentett késleltetés 100ms-ről 50ms-re
                }
            };

            // Hangfelismerés indítása
            this.startListening();
        },
        startListening() {
            if (this.speechRecognition && !this.isListening) {
                try {
                    this.speechRecognition.start();
                } catch (error) {
                    console.log('❌ Failed to start speech recognition:', error);
                }
            }
        },
        stopListening() {
            if (this.speechRecognition && this.isListening) {
                this.speechRecognition.stop();
            }
        }
    }
}).mount('#app');
