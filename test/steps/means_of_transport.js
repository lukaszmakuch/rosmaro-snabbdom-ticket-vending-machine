import {assertVisible} from '~/test/steps/assert_visibility';
import click from '~/test/steps/click';

export const see = [
  assertVisible({text: /means of transport/i}),
  assertVisible({text: /all/i}),
  assertVisible({text: /just buses/i}),
];

export const all = click({text: /all/i});
export const just_buses = click({text: /buses/i});