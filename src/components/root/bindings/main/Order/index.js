import {makeHandler} from '~/src/utils/handlers';
import {h} from '~/src/utils/vdom';

export default () => ({handler: makeHandler({
  ON_ENTRY: ({context}) => ({
    effect: {type: 'ORDER', data: context},
  }),
  ORDER_SUCCESS: () => ({arrow: 'placed'}),
  ORDER_ERROR: () => ({arrow: 'error'}),
  RENDER: () => h('span', 'Please wait...')
})})