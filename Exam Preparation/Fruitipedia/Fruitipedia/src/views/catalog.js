import { html } from "../../node_modules/lit-html/lit-html.js";
import { getFruits } from "./fruits.js";


const catalogTemplate = (fruits) => html `
<h2>Fruits</h2>
            <section id="dashboard">
            ${fruits.length > 0 ? fruits.map(catalogCard):html`<h2>No fruit info yet.</h2>`}
            </section>
            <!-- Display an h2 if there are no posts -->
            `;

            const catalogCard = (fruit) => html`<div class="fruit">
            <img src="${fruit.imageUrl}" alt="example1" />
            <h3 class="title">${fruit.name}</h3>
            <p>${fruit.description}</p>
            <a class="details-btn" href="/catalog/${fruit._id}">More Info</a>
        </div>`;

export async function catalogPage(ctx) {

    const fruits = await getFruits();
    ctx.render(catalogTemplate(fruits));
}