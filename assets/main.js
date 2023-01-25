//Lógica para mostrar info en la landing page usando RapidAPI, fetch...
API =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UCBVjMGOIkavEAhyqpxJ73Dw&part=snippet%2Cid&order=date&maxResults=50";

const content = null || document.getElementById('content');

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "721a5924bfmshcd6a0b0e14925adp16cf38jsna28c9e52f4d8", //Cuidado con este tipo de info
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

async function fetchData(url) {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

//sentencia para cuando carga el archivo ejecutar la función automaticamnte
(async () => {
  try {
    const videos = await fetchData(API);
    //Vamos a generar un template, para poder mostrar los videos.
    let view = `
    ${videos.items.map((video) => `
    <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </div>
    `).slice(0,7).join('')}
    `;
    content.innerHTML = view;
  } catch (error) {
    console.log(error);
    alert("Hay un error inesperado:(");
  }
})();
