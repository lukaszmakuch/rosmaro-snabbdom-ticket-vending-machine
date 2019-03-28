import {consumeEffects} from 'rosmaro-testing-library';
import {assertVisible} from '~/test/steps/assert_visibility';

export const assert_placed = data => consumeEffects(effects => expect(effects).toEqual([
  {type: 'ORDER', data},
]));

export const assert_not_placed = consumeEffects(effects => expect(effects).toEqual([]));

export const waiting = assertVisible({text: /please wait/i});

export const success = {feed: {type: 'ORDER_SUCCESS'}};

export const error = {feed: {type: 'ORDER_ERROR'}};