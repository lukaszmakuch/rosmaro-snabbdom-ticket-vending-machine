import {h} from '~/src/utils/vdom';
import {makeHandler} from '~/src/utils/handlers';

export default ({dispatch}) => ({handler: makeHandler({
  FIRST: ({context}) => ({
    arrow: 'first',
    context: {...context, zones: 'first'},
  }),
  ALL: ({context}) => ({
    arrow: 'all',
    context: {...context, zones: 'all'}
  }),
  RENDER: () => h('div', [
    'Select zones: ',
    h('button', {
      on: {click: () => dispatch({type: 'FIRST'})}
    }, 'first'),
    h('button', {
      on: {click: () => dispatch({type: 'ALL'})}
    }, 'all'),
  ])
})});