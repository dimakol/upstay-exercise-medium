import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from '@ups/components/root';
import { getRootElement } from '@ups/utils/dom';
import '@ups/index.scss';

ReactDOM.render(<Root />, getRootElement());

if (module.hot) {
	module.hot.accept();
}
