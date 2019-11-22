const redux = require('redux');
const thunk = require('redux-thunk').default;
// JSX syntax transforms to React.createElement
const React = require('react'); // eslint-disable-line
const ReactDOM = require('react-dom');
const StoreProvider = require('react-redux').Provider;

const IntlProvider = require('./intl.jsx').IntlProvider;
const permissionsActions = require('../redux/permissions.js');
const sessionActions = require('../redux/session.js');
const reducer = require('../redux/reducer.js');

require('../main.scss');

/**
 * 将视图呈现为完整页面 (Function to render views into a full page)
 * @param  {object} jsx       视图的jsx组件 (jsx component of the view)
 * @param  {object} element   在 HTML 模板上呈现的目标元素 (html element to render to on the template)
 * @param  {array}  reducers  视图需要的 Reducer 列表 (list of view-specific reducers)
 * @param  {object} initialState   [可选项]存储初始状态 (optional initialState for store)
 * @param  {bool}   enhancer  是否应用 redux-throttle 中间件 (whether or not to apply redux-throttle middleware)
 */
const render = (jsx, element, reducers, initialState, enhancer) => {
    // 从全局命名空间获取区域设置和消息 (Get locale and messages from global namespace,see "init.js")
    let locale = window._locale || 'en';
    let messages = {};
    // 获取本地化消息
    if (typeof window._messages !== 'undefined') {
        if (typeof window._messages[locale] === 'undefined') {
            // Fall back on the split ('zh-cn' => 'zh')
            locale = locale.split('-')[0];
        }
        if (typeof window._messages[locale] === 'undefined') {
            // 默认使用英文 (Language appears to not be supported – fall back to 'en')
            locale = 'en';
        }
        messages = window._messages[locale];
    }

    // 获取所有 reducer
    const allReducers = reducer(reducers);

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
    const enhancers = enhancer ?
        composeEnhancers(
            redux.applyMiddleware(thunk),
            enhancer
        ) :
        composeEnhancers(
            redux.applyMiddleware(thunk)
        );
    
    // 创建 redux 的 store
    const store = redux.createStore(
        allReducers,
        initialState || {},
        enhancers
    );

    // Render view component
    ReactDOM.render(
        <StoreProvider store={store}>
            <IntlProvider
                locale={locale}
                messages={messages}
            >
                {jsx}
            </IntlProvider>
        </StoreProvider>,
        element
    );

    // 获取初始会话和权限 (Get initial session & permissions)
    store.dispatch(permissionsActions.getPermissions());
    store.dispatch(sessionActions.refreshSession());
};

module.exports = render;
