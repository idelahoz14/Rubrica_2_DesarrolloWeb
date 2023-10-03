document.addEventListener("DOMContentLoaded", function () {
    // Obtén la referencia de los elementos del DOM
    const cardContainer = document.querySelector(".card-container");
    const filterSelect = document.querySelector("#filter-select");

    // Realiza una solicitud GET a la API
    axios.get('https://jsonplaceholder.typicode.com/photos')
        .then(response => {
            const data = response.data;
            // Llena el filtro select con opciones de títulos
            const titles = Array.from(new Set(data.map(item => item.title)));
            titles.forEach(title => {
                const option = document.createElement("option");
                option.value = title;
                option.textContent = title;
                filterSelect.appendChild(option);
            });

            // Función para mostrar las cards
            function showCards(filter) {
                cardContainer.innerHTML = "";
                const filteredData = data.filter(item => filter === "all" || item.title === filter);
                const slicedData = filteredData.slice(0, 12); // Limita a las primeras 12 cards
                slicedData.forEach(item => {
                    const card = document.createElement("div");
                    card.classList.add("card");
                    card.innerHTML = `
            <img src="${item.url}" alt="${item.title}">
            <h2>${item.title}</h2>
        `;
                    cardContainer.appendChild(card);
                });
            }


            // Inicializa la página mostrando todas las cards
            showCards("all");

            // Evento de cambio en el filtro select
            filterSelect.addEventListener("change", function () {
                const selectedOption = filterSelect.value;
                showCards(selectedOption);
            });
        })
        .catch(error => {
            console.error(error);
        });
});
