import {h} from '~/src/utils/vdom';
import {makeHandler} from '~/src/utils/handlers';

export default ({dispatch}) => ({handler: makeHandler({
  REGULAR: ({context}) => ({
    arrow: 'regular',
    context: {...context, tariff: 'regular'}
  }),
  STUDENT: ({context}) => ({
    arrow: 'student',
    context: {...context, tariff: 'student'}
  }),
  RENDER: () => h('div', [
    'Select your tariff: ',
    h('button', {
      on: {click: () => dispatch({type: 'REGULAR'})}
    }, 'regular'),
    h('button', {
      on: {click: () => dispatch({type: 'STUDENT'})}
    }, 'student'),
  ])
})});