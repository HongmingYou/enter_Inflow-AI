import { MainLayout } from "./components/layout/MainLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Workbench from "./pages/Workbench";
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
          path: "workbench",
          name: 'workbench',
          element: <Workbench />,
        },
        {
          path: "workbench/:workspaceId",
          name: 'workbench-detail',
          element: <Workbench />,
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