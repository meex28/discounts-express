import { ParseRoute } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";

export type ValidRoutes = ParseRoute<typeof routeTree>['fullPath'];

