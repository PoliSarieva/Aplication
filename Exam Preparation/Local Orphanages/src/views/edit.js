import { html } from "../../node_modules/lit-html/lit-html.js";
import { detailPost, editPost } from "./posts.js";
import { createSubmitHandler } from "../util.js";

//TODO Replace with actual view
const editTemplate = (post, onEdit) => html`
<section id="edit-page" class="auth">
            <form id="edit" @submit=${onEdit}>
                <h1 class="title">Edit Post</h1>

                <article class="input-group">
                    <label for="title">Post Title</label>
                    <input type="title" .value="${post.title}" name="title" id="title" value="">
                </article>

                <article class="input-group">
                    <label for="description">Description of the needs </label>
                    <input type="text" .value="${post.description}" name="description" id="description" value="">
                </article>

                <article class="input-group">
                    <label for="imageUrl"> Needed materials image </label>
                    <input type="text" .value="${post.imageUrl}" name="imageUrl" id="imageUrl" value="">
                </article>

                <article class="input-group">
                    <label for="address">Address of the orphanage</label>
                    <input type="text" .value="${post.address}" name="address" id="address" value="">
                </article>

                <article class="input-group">
                    <label for="phone">Phone number of orphanage employee</label>
                    <input type="text" .value="${post.phone}" name="phone" id="phone" value="">
                </article>

                <input type="submit" class="btn submit" value="Edit Post">
            </form>
        </section>`;


export async function editPage(ctx) {
    const id = ctx.params.id;
    const post = await detailPost (id);

    ctx.render(editTemplate(post, createSubmitHandler(onEdit)));

    //TODO change object based requirements
    async function onEdit({ title,
        description,
        imageUrl,
        address,
        phone }) {

        if ([title,
            description,
            imageUrl,
            address,
            phone].some(f => f == '')) {
            return alert('All fields are required');
        }

        

        const data = await editPost(id, {title,
                                        description,
                                        imageUrl,
                                        address,
                                        phone})


        //ToDO use redirect location from requirements
        ctx.page.redirect('/catalog/'+id);
    }
}