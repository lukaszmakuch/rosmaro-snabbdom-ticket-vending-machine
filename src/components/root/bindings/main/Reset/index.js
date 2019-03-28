import {makeHandler} from '~/src/utils/handlers';

export default () => ({handler: makeHandler({
  ON_ENTRY: () => ({
    arrow: 'clear',
    context: {},
  })
})})