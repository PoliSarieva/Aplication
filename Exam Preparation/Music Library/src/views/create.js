import { html } from "../../node_modules/lit-html/lit-html.js";
import { addAlbum } from "../data/albums.js";
import { createSubmitHandler } from "../util.js";

export const createTemplate = (create) => html`
<section id="create">
    <div class="form">
        <h2>Add Album</h2>
        <form class="create-form" @submit=${create}>
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" name="release" id="album-release" placeholder="Release date" />
            <input type="text" name="label" id="album-label" placeholder="Label" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
        </form>
    </div>
</section>
`;

export function createPage(ctx) {

    ctx.render(createTemplate(createSubmitHandler(create)));
    async function create({ singer,
                            album,
                            imageUrl,
                            release,
                            label,
                            sales }) {

        await addAlbum({singer,
                        album,
                        imageUrl,
                        release,
                        label,
                        sales});

        ctx.page.redirect('/catalog');
    }



}