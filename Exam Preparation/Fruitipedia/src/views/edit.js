import { html } from "../../node_modules/lit-html/lit-html.js";
import { createSubmitHandler } from "../util.js";
import { addFruit, editFruit } from "./fruits.js";

export const editTemplate = (currentFruit, onEdit) => html`
<section id="edit">
                <div class="form">
                    <h2>Edit Fruit</h2>
                    <form class="edit-form" @submit=${onEdit}>
                        <input type="text" name="name" .value=${currentFruit.name} id="name" placeholder="Fruit Name" />
                        <input type="text" name="imageUrl" .value=${currentFruit.imageUrl} id="Fruit-image" placeholder="Fruit Image URL" />
                        <textarea id="fruit-description" .value=${currentFruit.description} name="description" placeholder="Description" rows="10"
                            cols="50"></textarea>
                        <textarea id="fruit-nutrition" .value=${currentFruit.nutrition} name="nutrition" placeholder="Nutrition" rows="10"
                            cols="50"></textarea>
                        <button type="submit">post</button>
                    </form>
                </div>
            </section>`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    console.log(id);

    const currentFruit = await addFruit(id);
    ctx.render(editTemplate(currentFruit, createSubmitHandler(onEdit)));

    async function onEdit({name,
                            imageUrl, 
                            description, 
                            nutrition}) {

        if ([{name,
            imageUrl, 
            description, 
            nutrition}].some(f => f == '')) {
            return alert('All fields are required');
            }
            await editFruit(id,{name,
                                imageUrl, 
                                description, 
                                nutrition});

        ctx.page.redirect('/catalog/' + id);
        
    }
}