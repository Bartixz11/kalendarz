// Automatyczne pobranie wersji z pliku version.txt na serwerze
fetch('version.txt')
    .then(response => response.text())
    .then(version => {
        const cleanVersion = version.trim();
        document.getElementById('appVersionMainBadge').textContent = `v${cleanVersion}`;
        document.getElementById('appVersionDisplay').textContent = cleanVersion;
    })
    .catch(error => {
        // Wersja zapasowa, gdyby plik nie był dostępny lokalnie
        console.log("Nie udało się pobrać wersji, używam domyślnej.");
    });