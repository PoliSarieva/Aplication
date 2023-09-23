import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteAlbum, getById} from "../data/albums.js";
import { getUserData } from "../util.js";

export const detailsTemplate = (currentAlbum, onDelete) => html`<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src="${currentAlbum.imageUrl}" alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${currentAlbum.singer}</span></p>
            <p>
                <strong>Album name:</strong><span id="details-album">${currentAlbum.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${currentAlbum.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${currentAlbum.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${currentAlbum.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">0</span></div>
        <div id="action-buttons">
            
        <!--Edit and Delete are only for creator-->
        ${currentAlbum.canEdit ? html`
            <a href="/catalog/${currentAlbum._id}/edit" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>`: html `
            <a href="" id="like-btn">Like</a>`}
        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const currentAlbum = await getById(id);
    const userData = getUserData();

    if (userData && currentAlbum._ownerId == userData._id) {
        currentAlbum.canEdit = true;
    }

    async function onDelete() {
        const choice = confirm('Are you sure?');

      if (choice) {
        await deleteAlbum (id);
        ctx.page.redirect('/catalog');
      }
    }

    ctx.render(detailsTemplate(currentAlbum, onDelete));
}