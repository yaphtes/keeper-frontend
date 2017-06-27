import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import router from 'router';
import store from 'store';

import 'normalize';
import 'micro-reset';

ReactDOM.render((
    <Provider store={store}>
        {router}
    </Provider>
), document.getElementById('root'));