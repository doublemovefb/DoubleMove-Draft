const players = [
    { id: 1, name: "John Doe", team: "Team A", stats: [10, 15, 8, 12, 9] },
    { id: 2, name: "Jane Smith", team: "Team B", stats: [12, 14, 10, 8, 11] },
    { id: 3, name: "James Brown", team: "Team A", stats: [14, 10, 12, 9, 13] },
    { id: 4, name: "Emily Davis", team: "Team C", stats: [11, 13, 12, 14, 10] },
];

const renderPlayers = (filteredPlayers) => {
    const container = document.querySelector('main > div');
    container.innerHTML = filteredPlayers.map(player => `
        <div class="bg-white rounded shadow p-4">
            <h2 class="text-lg font-bold">${player.name}</h2>
            <p class="text-sm text-gray-500">${player.team}</p>
            <canvas id="chart-${player.id}" class="w-full h-40"></canvas>
        </div>
    `).join('');

    filteredPlayers.forEach(player => {
        const ctx = document.getElementById(`chart-${player.id}`);
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Speed', 'Agility', 'Strength', 'Endurance', 'IQ'],
                datasets: [{
                    label: player.name,
                    data: player.stats,
                    backgroundColor: 'rgba(34, 202, 236, 0.2)',
                    borderColor: 'rgba(34, 202, 236, 1)',
                }],
            },
        });
    });
};

const handleSearch = () => {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredPlayers = players.filter(player =>
        player.name.toLowerCase().includes(query) ||
        player.team.toLowerCase().includes(query)
    );
    renderPlayers(filteredPlayers);
};

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', handleSearch);
    renderPlayers(players);
});
let players = [];

const fetchPlayers = async () => {
    const response = await fetch('./assets/data/players.json');
    players = await response.json();
    renderPlayers(players);
};

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', handleSearch);
    fetchPlayers();
});

