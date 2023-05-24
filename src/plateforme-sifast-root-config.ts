import { registerApplication, start, navigateToUrl } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";
import appLoader from "./app-loader.html";
import pageNotFound from "./pages/404.html";
import unhauthorized from "./pages/403.html";

const data = {
  loaders: {
    appLoader: appLoader,
  },
  props: {},
};

const loadPage = (tag: string, page: string) => {
  let myContainer = document.getElementById(tag) as HTMLInputElement;
  if (myContainer) {
    myContainer.innerHTML = page;
  }
};

const routes = constructRoutes(microfrontendLayout, data);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});

const redirect = (from, to) => {
  window.location.pathname === from && navigateToUrl(to);
};

const layoutEngine = constructLayoutEngine({ routes, applications });

redirect("/", "/main");
applications.forEach(registerApplication);
layoutEngine.activate();
loadPage("404_", pageNotFound);
loadPage("403_", unhauthorized);
start();
