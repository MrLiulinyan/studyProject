// const Home = import("../views/home");
import Home from '../views/home'
import Article from '../views/article'

const routes = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/article",
    element: <Article />
  }
];

export default routes;
