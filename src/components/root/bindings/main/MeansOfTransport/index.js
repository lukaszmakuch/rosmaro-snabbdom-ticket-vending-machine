import {h} from '~/src/utils/vdom';
import {makeHandler} from '~/src/utils/handlers';

export default ({dispatch}) => ({handler: makeHandler({
  SELECT: ({context, action: {meansOfTransport}}) => ({
    arrow: 'selected',
    context: {...context, meansOfTransport},
  }),
  RENDER: () => h('div', [
    'Select means of transport: ',
    h('button', {
      on: {click: () => dispatch({type: 'SELECT', meansOfTransport: 'all'})}
    }, 'all'),
    h('button', {
      on: {click: () => dispatch({type: 'SELECT', meansOfTransport: 'just_buses'})}
    }, 'just buses'),
  ])
})});