import { viewExpressFactory } from "./view.express.factory";


import { text } from "./text/index";
import { image } from "./image";

viewExpressFactory.import(text);
viewExpressFactory.import(image);