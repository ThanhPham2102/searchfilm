let inputSearch = document.getElementById("search_input");
let searchBoxLast = document.getElementById("search_box-last11");

function getData(url, fn) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        fn(undefined, JSON.parse(xhr.responseText));
      } else {
        fn(new Error(xhr.statusText), undefined);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}
// https://image.tmdb.org/t/p/w188_and_h282_bestv2/ + duoi anh
inputSearch.addEventListener("keyup", function () {
  searchBoxLast.innerHTML = "";
  getData(
    `https://api.themoviedb.org/3/search/movie?api_key=97f1bd616b51e07825e04a855aaeed30&query=${inputSearch.value}`,
    function (err, res) {
      if (err) {
        console.log(err);
      } else {
        // console.log(res);

        let result = res.results;
        console.log(res.results);
        for (let i = 1; i <= result.length - 1; i = i + 1) {
          // console.log(result[i].title);
          // console.log(result[i]["original_title"]); //lap 4 lan
          let title = result[i]["original_title"];
          // console.log(title);
          let backdropPath =
            `https://image.tmdb.org/t/p/w188_and_h282_bestv2/` +
            result[i]["poster_path"];
          console.log(backdropPath);
          searchBoxLast.innerHTML += `
                                <div class="search_last">
                                <div align="center" class="search_last--img">
                                  <img
                                    class="search_last--img1"
                                    src="${backdropPath}"
                                    alt="photo"
                                    srcset=""
                                  />
                                </div>

                                <div align="left" class="search_last--text">
                                  <div class="title">${title}</div>
                                  <div></div>
                                </div>
                              </div>
                            </div>
                          </div>`;
        }
      }
    }
  );
});
//   getData(
//     `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=10&format=json&search=${inputSearch.value}`,
//     function (err, res) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(res);
//         // getData();
//         let userSearch = res[1].filter((name) => {
//           // console.log(name, inputSearch.value);
//           return name.toLowerCase().startsWith(inputSearch.value);
//         });
//         console.log("userSearch", userSearch); //loc ten ra

//         userSearch.forEach((suggested) => {
//           getData(
//             `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=pageprops|pageimages&format=json&titles=${suggested}`,
//             function (err, res) {
//               if (err) {
//                 console.log(err);
//               } else {
//                 let x = Object.keys(res.query.pages);
//                 // console.log(x[0]);

//                 let linkImg = res.query.pages[x].thumbnail.source;
//                 let linkdes =
//                   res.query.pages[x].pageprops["wikibase-shortdesc"];
//                 searchBoxLast.innerHTML += `
//                       <div class="search_last">
//                       <div align="center" class="search_last--img">
//                         <img
//                           class="search_last--img1"
//                           src="${linkImg}"
//                           alt="photo"
//                           srcset=""
//                         />
//                       </div>

//                       <div align="left" class="search_last--text">
//                         <div class="title">${suggested}</div>
//                         <div>${linkdes}</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>`;
//               }
//             }
//           );
//         });
//       }
//     }
//   );
// });
