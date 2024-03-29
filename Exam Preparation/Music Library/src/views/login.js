import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";

//TODO Replace with actual view
const loginTemplate = (onLogin, createLogin) => html `
<section id="login">
        <div class="form">
          <h2>Login</h2>
          <form class="login-form" @submit=${onLogin}>
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
              Not registered? <a href="/register" >Create an account</a>
            </p>
          </form>
        </div>
      </section>
`;


export function loginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)));

    //TODO change object based requirements
    async function onLogin({email, password}, form) {
        await login(email, password);
        form.reset();
        //ToDO use redirect location from requirements
        ctx.page.redirect('/');
    }

}