const films = [
    {
        name: "Человек-паук",
        time: "10:00",
        genres: ["фантастика", "боевик", "приключения"],
    },
    {
        name: "Собачья жизнь 2",
        time: "12:00",
        genres: ["фэнтэзи", "драма", "комедия"],
    },
    {
        name: "История игрушек 4",
        time: "14:00",
        genres: ["мультфильм", "фэнтэзи", "комедия"],
    },
    {
        name: "Люди в чёрном: Интэрнэшнл",
        time: "16:00",
        genres: ["фантастика", "боевик", "комедия"],
    }
];
let timelist = document.getElementById("timelistBody");
for (const film of films ) {
    timelist.innerHTML+= `
            <tr>
              <td>
                <svg
                  width="11"
                  height="9"
                  viewBox="0 0 11 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.60581 6.79378L1.46056 3.93033L0.787354 4.66979L4.70255 8.23421L10.8223 0.94099L10.0562 0.298203L4.60581 6.79378Z"
                    fill="white"
                  />
                </svg>
              </td>
              <td>${film.time}</td>
              <td>${film.name}</td>
              <td>${film.genres.join(', ')}</td>
            </tr>
            `;
};