let temposList = document.getElementById("tempos");

console.log("tempos.js carregado");

function sortTempos(tempos) {
    console.log("sortTempos chamada");
    return tempos.sort((a, b) => {
        let aTotalSeconds = a.hours * 3600 + a.minutes * 60 + a.seconds;
        let bTotalSeconds = b.hours * 3600 + b.minutes * 60 + b.seconds;
        return bTotalSeconds - aTotalSeconds;
    });
}

function formatTime(value) {
    console.log("formatTime chamada");
    return value.toString().padStart(2, "0");
}

function saveTempo(tempo) {
    console.log("saveTempo chamada");
    let tempos = JSON.parse(localStorage.getItem("tempos") || "[]");
    tempos.push(tempo);
    localStorage.setItem("tempos", JSON.stringify(tempos));
}

function loadTempos() {
    console.log("loadTempos chamada");
    let tempos = JSON.parse(localStorage.getItem("tempos") || "[]");
    let sortedTempos = sortTempos(tempos);
    displayTempos(sortedTempos);
    initDataTable();
}

let table;

function initDataTable() {
    console.log("initDataTable chamada");
    table = $("#tempos").DataTable({
        language: {
            info: "Mostrando _START_ a _END_ de _TOTAL_ resultados",
            infoEmpty: "Mostrando 0 a 0 de 0 resultados",
            infoFiltered: "(filtrado de _MAX_ resultados totais)",
            lengthMenu: "Mostrar _MENU_ resultados por página",
            search: "Pesquisar:",
            paginate: {
                first: "Primeiro",
                last: "Último",
                next: "Próximo",
                previous: "Anterior"
            },
            zeroRecords: "Nenhum resultado encontrado",
        }
    });
}

async function displayTempos(tempos) {
    let tbody = document.querySelector("#tempos tbody");
    tbody.innerHTML = "";
    for (const [index, tempo] of tempos.entries()) {
        let tr = document.createElement("tr");

        let dataTd = document.createElement("td");
        dataTd.textContent = tempo.date;
        tr.appendChild(dataTd);

        let temposTd = document.createElement("td");
        temposTd.textContent = `Tempo ${index + 1}`;
        tr.appendChild(temposTd);

        let valoresTd = document.createElement("td");
        valoresTd.textContent = `${formatTime(tempo.hours)}:${formatTime(tempo.minutes)}:${formatTime(tempo.seconds)}`;
        tr.appendChild(valoresTd);

        tbody.appendChild(tr);
    }
}

document.addEventListener("DOMContentLoaded", loadTempos);
