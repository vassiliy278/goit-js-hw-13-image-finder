import './style.css'
import debounce from 'lodash.debounce'
import Masonry from 'masonry-layout'

const input = document.querySelector('input');
const gallery = document.querySelector('.gallery')
const body = document.querySelector('body')
const button = document.querySelector('button')
const galleryElement = document.querySelector('.photo-card')



let baseURL;
let query = '';
let pageNumber = 1;

input.addEventListener('input', debounce((e) => {
  query = e.target.value;
  let newURL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${pageNumber = 1}&per_page=12&key=16604431-86fbec6f82ccbe895fd4f060b`;
  baseURL = newURL;
  gallery.innerHTML = '';
  fetching(baseURL);
  smoothScrolling();
  
}, 600));

button.addEventListener('click', () => {
  pageNumber += 1;
  let newURL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${pageNumber}&per_page=12&key=16604431-86fbec6f82ccbe895fd4f060b`;
  baseURL = newURL;
  fetching(baseURL);
  smoothScrolling();
  
})

//autoscrolling page down
function smoothScrolling () {
  setTimeout (() => {
    window.scrollBy({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth'
    });
  }, 1050)
}


function fetching(url) {
  fetch(url)
    .then(res => res.json())
    .then(res => {
      const result = res.hits;
      //markup painting here
      result.map(a => {
        // <img id="img_enlarge" src="${a.webformatURL}" src-lg="${a.largeImageURL}" alt=""/>
        gallery.insertAdjacentHTML('beforeend',
        `<div id="img_enlarge" class="photo-card" style="background-image: url(${a.webformatURL});" src-lg="${a.largeImageURL}">

        
        <div class="stats">
          <p class="stats-item">
            <i class="material-icons">thumb_up</i>
            ${a.likes}&nbsp;&nbsp;
          </p>
          <p class="stats-item">
            <i class="material-icons">visibility</i>
            ${a.views}&nbsp;&nbsp;
          </p>
          <p class="stats-item">
            <i class="material-icons">comment</i>
            ${a.comments}&nbsp;&nbsp;
          </p>
          <p class="stats-item">
            <i class="material-icons">cloud_download</i>
            ${a.downloads}&nbsp;&nbsp;
          </p>
        </div>
      </div>
      `
        )
      });
      // showing of LOAD MORE button
      button.style = 'display: block';
      //enlarging of image to fullscreen
      const currentImg = document.querySelectorAll('#img_enlarge');
      currentImg.forEach(element => {
          element.addEventListener('click', (e) => {
              console.log(e)
              const largeImgURL = e.target.getAttribute('src-lg');
              body.insertAdjacentHTML('beforeend', '<div class="large_image_bgc"></div>')
              gallery.insertAdjacentHTML('beforeend',
              `<img class="large_image_fixed" src="${largeImgURL}" title="X">`)
             
                  // gallery.insertAdjacentHTML('beforeend', `<div class="close_sign">Close</div>`)
                  const closeSign = document.querySelector('.large_image_fixed');
                  function deleteLargeImg () {
                    setTimeout(() => {
                      document.querySelector('.large_image_fixed').remove();
                      // document.querySelector('.close_sign').remove()
                      document.querySelector('.large_image_bgc').remove()
                    }, 150)
                  }
                  closeSign.addEventListener('click', deleteLargeImg);
                  body.addEventListener('keyup', (e) => {
                      if ((e.key === 'Escape') && (gallery.contains(closeSign))) {
                          deleteLargeImg()
                      }
                  })

          })
      })
      if (query === '') {
        gallery.innerHTML = '';
        button.style = 'display: none'
      }
    })
}