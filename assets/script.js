const { createApp } = Vue;

createApp({
        data() {
        return {
            startTime: null,
            elapsedTime: 0,
            isRunning: false,
            intervalId: null,
            bestTimes: []
        }
    },
    computed: {
        formattedTime() {
            const minutes = Math.floor(this.elapsedTime / 60000);
            const seconds = Math.floor((this.elapsedTime % 60000) / 1000);
            const centiseconds = Math.floor((this.elapsedTime % 1000) / 10);
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
        },
        averageTimeMs() {
            if (!this.bestTimes || this.bestTimes.length === 0) {
                return 0;
            }
            const sumMs = this.bestTimes.reduce((acc, item) => acc + (item.time || 0), 0);
            return Math.floor(sumMs / this.bestTimes.length);
        }
    },
    mounted() {
        this.loadBestTimes();
        this.setupKeyboardShortcuts();
		this.setupTimeUpdater();
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
        removeTimeSimple(index) {
            this.bestTimes.splice(index, 1);
            this.saveBestTimes();
        },
        clearAllTimes() {
            if (confirm('Are you sure you want to delete all saved times?')) {
                this.bestTimes = [];
                this.saveBestTimes();
            }
        },
        setupKeyboardShortcuts() {
            document.addEventListener('keydown', (event) => {
                // Spacebar for start/stop
                if (event.code === 'Space') {
                    event.preventDefault();
                    console.log('🎯 Keyboard shortcut activated: Spacebar (Start/Stop)');
                    if (this.isRunning) {
                        console.log('⏹️ Stopping stopwatch');
                        this.stop();
                    } else {
                        console.log('▶️ Starting stopwatch');
                        this.start();
                    }
                }
                // Alt + S for start/stop (existing functionality)
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
                // Alt + X for reset (existing functionality)
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
        }
    }
}).mount('#app');
