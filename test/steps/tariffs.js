import {assertVisible} from '~/test/steps/assert_visibility';
import click from '~/test/steps/click';

export const see = [
  assertVisible({text: /tariff/i}),
  assertVisible({text: /regular/i}),
  assertVisible({text: /student/i}),
];

export const regular = click({text: /regular/i});
export const student = click({text: /student/i});