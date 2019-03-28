import {assertVisible} from '~/test/steps/assert_visibility';
import click from '~/test/steps/click';

export const see = [
  assertVisible({text: /thank you/i}),
  assertVisible({text: /close/i}),
];

export const close = click({text: /close/i});
