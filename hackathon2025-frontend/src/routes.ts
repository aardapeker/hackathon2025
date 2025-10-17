import { type RouteConfig, layout, route } from "@react-router/dev/routes"

export default [
  layout("./layouts/root-layout.tsx", [
    route("/", "routes/home-page.tsx"),
  ] satisfies RouteConfig),
]
