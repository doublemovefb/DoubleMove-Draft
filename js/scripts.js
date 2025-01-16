const players = [
    { id: 1, name: "John Doe", team: "Team A", stats: [10, 15, 8, 12, 9] },
    { id: 2, name: "Jane Smith", team: "Team B", stats: [12, 14, 10, 8, 11] },
];

const renderPlayers = () => {
    const container = document.querySelector('main > div');
    container.innerHTML = players.map(player => `
        <div class="bg-white rounded shadow p-4">
            <h2 class="text-lg font-bold">${player.name}</h2>
            <p class="text-sm text-gray-500">${player.team}</p>
            <canvas id="chart-${player.id}" class="w-full h-40"></canvas>
        </div>
    `).join('');

    players.forEach(player => {
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

document.addEventListener('DOMContentLoaded', renderPlayers);