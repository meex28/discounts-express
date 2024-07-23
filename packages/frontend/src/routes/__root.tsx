import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../components/core/header/Header";

const Root = () => (
    <>
        <Header />
        <Outlet />
    </>
)

export const Route = createRootRoute({
    component: Root
})