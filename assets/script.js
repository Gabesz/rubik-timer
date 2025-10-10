const { createApp } = Vue;

createApp({
        data() {
        return {
            startTime: null,
            elapsedTime: 0,
            isRunning: false,
            intervalId: null,
            bestTimes: [],
            dailyBestTimes: [] // Top 3 legjobb napi időt tárolja
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
        this.loadDailyBestTimes();
        this.initializeTodayBestTime();
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
                
                // Ha 1 perc alatti az idő, lejátszik egy tapsológ hangot
                if (this.elapsedTime < 60000 && this.elapsedTime > 1000) {
                    this.playApplause();
                }
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
            
            // Napi legjobb idő mentése
            this.saveDailyBestTime();
        },
        playApplause() {
            const applauseSounds = [
                'assets/sounds/applause-75314.mp3',
                'assets/sounds/applause-alks-ses-efekti-125030.mp3',
                'assets/sounds/applause-cheer-236786.mp3'
            ];
            const randomSound = applauseSounds[Math.floor(Math.random() * applauseSounds.length)];
            const audio = new Audio(randomSound);
            audio.volume = 0.5; // 50% hangerő
            audio.play().catch(error => {
                console.log('Nem sikerült lejátszani a hangot:', error);
            });
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
            if (confirm('Biztosan törölni szeretnéd ezt az időt?')) {
                this.bestTimes.splice(index, 1);
                this.saveBestTimes();
            }
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
        },
        getTodayDateString() {
            const today = new Date();
            return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        },
        formatDateString(dateString) {
            const [year, month, day] = dateString.split('-');
            return `${year}.${month}.${day}.`;
        },
        saveDailyBestTime() {
            const today = this.getTodayDateString();
            const currentTime = this.elapsedTime;
            
            // Keressük meg, hogy van-e már mai bejegyzés
            const todayIndex = this.dailyBestTimes.findIndex(item => item.date === today);
            
            if (todayIndex !== -1) {
                // Ha van mai bejegyzés, csak akkor frissítjük, ha jobb az új idő
                if (currentTime < this.dailyBestTimes[todayIndex].time) {
                    this.dailyBestTimes[todayIndex].time = currentTime;
                    this.dailyBestTimes[todayIndex].timestamp = Date.now();
                }
            } else {
                // Ha nincs mai bejegyzés, hozzáadjuk
                this.dailyBestTimes.push({
                    date: today,
                    time: currentTime,
                    timestamp: Date.now()
                });
            }
            
            // Rendezzük idő szerint és csak a top 3-at tartjuk meg
            this.dailyBestTimes.sort((a, b) => a.time - b.time);
            this.dailyBestTimes = this.dailyBestTimes.slice(0, 3);
            
            this.saveDailyBestTimesToStorage();
        },
        loadDailyBestTimes() {
            const saved = localStorage.getItem('stopperDailyBestTimes');
            if (saved) {
                this.dailyBestTimes = JSON.parse(saved);
            }
        },
        saveDailyBestTimesToStorage() {
            localStorage.setItem('stopperDailyBestTimes', JSON.stringify(this.dailyBestTimes));
        },
        removeDailyBestTime(index) {
            const recordToDelete = this.dailyBestTimes[index];
            const today = this.getTodayDateString();
            
            // Csak az aktuális napi dátumot lehet törölni
            if (recordToDelete.date !== today) {
                alert('Csak az aktuális napi rekordot lehet törölni!');
                return;
            }
            
            if (confirm('Biztosan törölni szeretnéd ezt a napi rekordot?')) {
                // Töröljük a rekordot
                this.dailyBestTimes.splice(index, 1);
                
                // Ha van idő a fenti listában (bestTimes), onnan bemásoljuk a legjobbat
                if (this.bestTimes.length > 0) {
                    const bestTimeFromList = this.bestTimes[0].time; // A legjobb idő (legkisebb)
                    
                    // Hozzáadjuk az új legjobb időt a dailyBestTimes-hoz
                    this.dailyBestTimes.push({
                        date: today,
                        time: bestTimeFromList,
                        timestamp: Date.now()
                    });
                    
                    // Rendezzük és csak a top 3-at tartjuk meg
                    this.dailyBestTimes.sort((a, b) => a.time - b.time);
                    this.dailyBestTimes = this.dailyBestTimes.slice(0, 3);
                }
                
                this.saveDailyBestTimesToStorage();
            }
        },
        initializeTodayBestTime() {
            const today = this.getTodayDateString();
            
            // Ellenőrizzük, hogy van-e már mai napi bejegyzés
            const hasTodayRecord = this.dailyBestTimes.some(item => item.date === today);
            
            // Ha nincs mai napi bejegyzés, de van idő a bestTimes listában
            if (!hasTodayRecord && this.bestTimes.length > 0) {
                const bestTimeFromList = this.bestTimes[0].time; // A legjobb idő (legkisebb)
                
                // Hozzáadjuk az új legjobb időt a dailyBestTimes-hoz
                this.dailyBestTimes.push({
                    date: today,
                    time: bestTimeFromList,
                    timestamp: Date.now()
                });
                
                // Rendezzük és csak a top 3-at tartjuk meg
                this.dailyBestTimes.sort((a, b) => a.time - b.time);
                this.dailyBestTimes = this.dailyBestTimes.slice(0, 3);
                
                this.saveDailyBestTimesToStorage();
            }
        }
    }
}).mount('#app');
