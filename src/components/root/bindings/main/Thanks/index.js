import {h} from '~/src/utils/vdom';
import {makeHandler} from '~/src/utils/handlers';

export default ({dispatch}) => ({handler: makeHandler({
  CLOSE: () => ({arrow: 'close'}),
  RENDER: () => h('div', [
    'Thank you! ',
    h('button', {
      on: {click: () => dispatch({type: 'CLOSE'})}
    }, 'close'),
  ])
})});