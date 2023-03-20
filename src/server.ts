import { Application, Router, send } from "https://deno.land/x/oak/mod.ts"
const list = [
	["kit", "build"],
]
const app = new Application()
const router = new Router()
const path = new URL("../apps/", import.meta.url);
console.log(Deno.cwd())
list.forEach(([name, dist]) => {
	const root = new URL(`../apps/${name}/${dist}/`, import.meta.url).pathname
	console.log(root)
	router.get(`/${name}/:rest(.*)?`, async ctx => {
		const p = ctx.request.url.pathname.slice(2 + name.length)
		await send(ctx, p, {
			root,
			index: "index.html",
		})
	})
})

router.get("/", c => c.response.redirect("https://github.com/falentio/berlin-uhr"))

app.use(router.routes())
app.listen({ port: 8080 })