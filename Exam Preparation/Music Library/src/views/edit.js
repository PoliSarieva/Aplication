import { html } from "../../node_modules/lit-html/lit-html.js";
import { editAlbum, getById } from "../data/albums.js";
import { createSubmitHandler } from "../util.js";

export const editTemplate = (currAlb, onEdit) => html`
<section id="edit">
    <div class="form" @submit=${onEdit}>
        <h2>Edit Album</h2>
        <form class="edit-form">
            <input type="text" name="singer" value=${currAlb.singer} id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" .value=${currAlb.album} id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" .value=${currAlb.imageUrl} id="album-img" placeholder="Image url" />
            <input type="text" name="release" .value=${currAlb.release} id="album-release" placeholder="Release date" />
            <input type="text" name="label" .value=${currAlb.label} id="album-label" placeholder="Label" />
            <input type="text" name="sales" .value=${currAlb.sales} id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
        </form>
    </div>
</section>`;

export async function editPage(ctx) {
    const id = ctx.params.id;

    const currAlb = await getById(id);
    ctx.render(editTemplate(currAlb, createSubmitHandler(onEdit)));

    async function onEdit({ singer,
                            album,
                            imageUrl,
                            release,
                            label,
                            sales }) {

        if ([singer,
            album,
            imageUrl,
            release,
            label,
            sales].some(f => f == '')) {
            return alert('All fields are required');
            }
            await editAlbum(id, {
                singer,
                album,
                imageUrl,
                release,
                label,
                sales
            });
        
    }
}