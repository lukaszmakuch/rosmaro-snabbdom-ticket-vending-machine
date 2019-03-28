import {h} from '~/src/utils/vdom';
import {makeHandler} from '~/src/utils/handlers';

export default ({dispatch}) => ({handler: makeHandler({
  CANCEL: () => ({arrow: 'cancel'}),
  TRY_AGAIN: () => ({arrow: 'try again'}),
  RENDER: () => h('div', [
    'An error occurred.',
    h('button', {
      on: {click: () => dispatch({type: 'CANCEL'})}
    }, 'cancel'),
    h('button', {
      on: {click: () => dispatch({type: 'TRY_AGAIN'})}
    }, 'try again'),
  ])
})});