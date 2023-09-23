import { html } from "../../node_modules/lit-html/lit-html.js";
import { createPost } from "./posts.js";
import { createSubmitHandler } from "../util.js";

//TODO Replace with actual view
const createTemplate = (oncreate) => html`
<section id="create-page" class="auth">
            <form id="create" @submit=${oncreate}>
                <h1 class="title">Create Post</h1>

                <article class="input-group">
                    <label for="title">Post Title</label>
                    <input type="title" name="title" id="title">
                </article>

                <article class="input-group">
                    <label for="description">Description of the needs </label>
                    <input type="text" name="description" id="description">
                </article>

                <article class="input-group">
                    <label for="imageUrl"> Needed materials image </label>
                    <input type="text" name="imageUrl" id="imageUrl">
                </article>

                <article class="input-group">
                    <label for="address">Address of the orphanage</label>
                    <input type="text" name="address" id="address">
                </article>

                <article class="input-group">
                    <label for="phone">Phone number of orphanage employee</label>
                    <input type="text" name="phone" id="phone">
                </article>

                <input type="submit" class="btn submit" value="Create Post">
            </form>
        </section>`;


export function createPage(ctx) {
    ctx.render(createTemplate(createSubmitHandler(oncreate)));

    //TODO change object based requirements
    async function oncreate({title,
        description,
        imageUrl,
        address,
        phone}) {

            if ([title,
                description,
                imageUrl,
                address,
                phone].some(f => f == '')) {
                return alert('All fields are required');
            }

        const data = await createPost({
            title,
            description,
            imageUrl,
            address,
            phone
        });



        /*if(email == '' || password == '') {
         return alert('All fields are requires');
        }*/


        //ToDO use redirect location from requirements
        ctx.page.redirect('/catalog');
    }
}