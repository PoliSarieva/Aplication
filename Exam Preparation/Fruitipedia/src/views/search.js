import { html } from "../../node_modules/lit-html/lit-html.js";
import { createSubmitHandler } from "../util.js";
import { searchDetail } from "./fruits.js";

//TODO Replace with actual view
const searchTemplate = (searchElem, OnSearch) => html`
<section id="search">

<div class="form">
    <h2>Search</h2>
    <form class="search-form" @submit=${OnSearch}>
        <input type="text" name="search" id="search-input" />
        <button class="button-list">Search</button>
    </form>
</div>
<h4>Results:</h4>
<div class="search-result">
    ${searchCard(searchElem)}
    </div>
</div>
</section>`;

/*
    ${searchElem.length>0 ? searchElem.map(searchCard):html`<p class="no-result">No result.</p>`}
*/
const searchCard = (card) => html`
<div class="fruit">
        <img src="${card.imageUrl}" alt="example1" />
        <h3 class="title">${card.name}</h3>
        <p class="description">${card.description}</p>
        <a class="details-btn" href="">More Info</a>`;

export function searchPage(ctx) {
    
    ctx.render(searchTemplate(createSubmitHandler(OnSearch)));
    async function OnSearch(search, form) {
        const searchElem = search.search;
        console.log(search.search);
        await searchDetail (searchElem);
        //ctx.render(searchElem, searchTemplate(createSubmitHandler(OnSearch)));
    }

    
}