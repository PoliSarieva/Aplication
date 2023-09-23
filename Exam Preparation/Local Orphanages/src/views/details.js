import { html } from "../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../util.js";
import { deletePost, detailPost, getPosts } from "./posts.js";

//TODO Replace with actual view
const detailsTemplate = (post, onDelete) => html`
<section id="details-page">
            <h1 class="title">Post Details</h1>

            <div id="container">
                <div id="details">
                    <div class="image-wrapper">
                        <img src="${post.imageUrl}" alt="Material Image" class="post-image">
                    </div>
                    <div class="info">
                        <h2 class="title post-title">${post.title}</h2>
                        <p class="post-description">${post.description}</p>
                        <p class="post-address">${post.address}</p>
                        <p class="post-number">${post.phone}</p>
                       <p class="donate-Item">Donate Materials: 0</p>

                       
                       <!--Edit and Delete are only for creator-->
                       <div class="btns">
                            <a href="/catalog/${post._id}/edit" class="edit-btn btn">Edit</a>
                            <a href="javascript:void(0)" @click=${onDelete} class="delete-btn btn">Delete</a>
                      
                            <!--Bonus - Only for logged-in users ( not authors )-->
                           <!-- <a href="#" class="donate-btn btn">Donate</a>--->
                        </div>

                    </div>
                </div>
            </div>
        </section>`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const post = await detailPost(id);
    const currentPost = await detailPost(id);
    const userData = getUserData();

    if (userData && currentPost._ownerId == userData._id) {
        currentPost.canEdit = true;
    }

    async function onDelete() {
        const choice = confirm('Are you sure?');

      if (choice) {
        await deletePost (id);
        ctx.page.redirect('/catalog');
      }
    }
    ctx.render(detailsTemplate(post, onDelete));
}