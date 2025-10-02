import { type RouteConfig, layout, route } from "@react-router/dev/routes"

export default [
  layout("./routes/root-page.tsx", [
    route("/", "routes/home.tsx"),
  ] satisfies RouteConfig),
]
