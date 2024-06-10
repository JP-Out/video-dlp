// // Função para atualizar a porcentagem de progresso
// function updateProgress() {
//     // Faça uma requisição AJAX para obter a porcentagem do servidor Flask
//     fetch('http://localhost:5000/progress')
//         .then(response => response.json())
//         .then(data => {
//             // Atualize o conteúdo do elemento HTML com a porcentagem obtida
//             document.getElementById('progress').textContent = `Downloading... ${data.percent}%`;
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }

// // Atualize a porcentagem a cada segundo
// setInterval(updateProgress, 1000);
