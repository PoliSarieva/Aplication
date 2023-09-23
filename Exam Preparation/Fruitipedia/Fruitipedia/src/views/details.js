import { html } from "../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../util.js";
import { deleteFruit, detailFruit } from "./fruits.js";

const detailsTemplate = (fruit, onDelete) => html `
<section id="details">
                <div id="details-wrapper">
                    <img id="details-img" src="${fruit.imageUrl}" alt="example1" />
                    <p id="details-title">${fruit.name}</p>
                    <div id="info-wrapper">
                        <div id="details-description">
                            <p>${fruit.description}</p>
                            <p id="nutrition">Nutrition</p>
                            <p id="details-nutrition">${fruit.nutrition}</p>
                        </div>
                        ${fruit.canEdit ? html`
                        <!--Edit and Delete are only for creator-->
                        <div id="action-buttons">
                            <a href="/catalog/${fruit._id}/edit" id="edit-btn">Edit</a>
                            <a href="javascript:void(0)" @click=${onDelete} id="delete-btn">Delete</a>
                        </div>`:null}
                        
                    </div>
                </div>
            </section>`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;

    const fruit = await detailFruit(id);
    const userData = getUserData();

    if (userData && userData._id == fruit._ownerId) {
        fruit.canEdit = true;
    }

    async function onDelete() {
        const choice = confirm('Are you sure?');

      if (choice) {
        await deleteFruit (id);
        ctx.page.redirect('/catalog');
      }
    }

    ctx.render(detailsTemplate(fruit, onDelete));
}