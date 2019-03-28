import {assertVisible} from '~/test/steps/assert_visibility';
import click from '~/test/steps/click';

export const see = [
  assertVisible({text: /error occurred/i}),
  assertVisible({text: /cancel/i}),
  assertVisible({text: /try again/i}),
];

export const cancel = click({text: /cancel/i});
export const try_again = click({text: /try again/i});