import { MainLayout } from "./components/layout/MainLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import WorkspaceHub from "./pages/WorkspaceHub";
import Studio from "./pages/Studio";
import Agents from "./pages/Agents";
import NotFound from "./pages/NotFound";

export const routers = [
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/app",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "dashboard",
          name: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: "workspace",
          name: 'workspace',
          element: <WorkspaceHub />,
        },
        {
          path: "workspace/:workspaceId",
          name: 'workspace-studio',
          element: <Studio />,
        },
        {
          path: "agents",
          name: 'agents',
          element: <Agents />,
        },
      ],
    },
    /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
    {
      path: "*",
      name: '404',
      element: <NotFound />,
    },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;