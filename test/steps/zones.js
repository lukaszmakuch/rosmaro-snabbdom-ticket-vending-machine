import {assertVisible} from '~/test/steps/assert_visibility';
import click from '~/test/steps/click';

export const see = [
  assertVisible({text: /zones/i}),
  assertVisible({text: /first/i}),
  assertVisible({text: /all/i}),
];

export const all = click({text: /all/i});
export const first = click({text: /first/i});