import '../styles/reset.css';
import '../styles/common.css';
import '../styles/index.css';
import '../styles/components/header.css';
import '../styles/components/clock.css';
import '../styles/components/information.css';
import '../styles/components/products.css';

import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';
import countDown from "./timer";
import setDate from "./clock";
import App from "./app";

setDate();

countDown();

const app = new App();
app.init();


