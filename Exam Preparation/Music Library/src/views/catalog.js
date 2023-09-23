import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllAlbums } from "../data/albums.js";

export const catalogTemplate = (album) => html `
<section id="dashboard">
        <h2>Albums</h2>
        <ul class="card-wrapper">

          <!-- Display a li with information about every post (if any)-->
          ${album.length > 0 ? album.map(cardTemplate): html`

        <!-- Display an h2 if there are no posts -->
        <h2>There are no albums added yet.</h2>
      </section>`
      }`

const cardTemplate = (album) => html `<li class="card">
            <img src="${album.imageUrl}" alt="travis" />
            <p>
              <strong>Singer/Band: </strong><span class="singer">${album.singer}</span>
            </p>
            <p>
              <strong>Album name: </strong><span class="album">${album.album}</span>
            </p>
            <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
            <a class="details-btn" href="/catalog/${album._id}">Details</a>
          </li>
          
        </ul>`;

export async function catalogPage(ctx) {
    const album =await getAllAlbums();

    ctx.render(catalogTemplate(album));
    }