import {flow} from '~/test/utils/runner';
import * as zones from '~/test/steps/zones';
import * as tariffs from '~/test/steps/tariffs';
import * as thanks from '~/test/steps/thanks';
import * as means_of_transport from '~/test/steps/means_of_transport';
import * as order from '~/test/steps/order';
import * as error from '~/test/steps/error';

flow('zones -first-> tariffs -regular-> order -success-> thanks -close-> zones', [
  zones.see,
  zones.first,
  tariffs.see,
  tariffs.regular,
  order.assert_placed({
    zones: 'first',
    tariff: 'regular',
  }),
  order.waiting,
  order.success,
  thanks.see,
  thanks.close,
  zones.see,
]);

flow('try again', [
  zones.first,
  tariffs.regular,
  order.assert_placed({
    zones: 'first',
    tariff: 'regular',
  }),
  order.error,
  error.see,
  order.assert_not_placed,
  error.try_again,
  order.assert_placed({
    zones: 'first',
    tariff: 'regular',
  }),
  order.success,
  thanks.see,
  thanks.close,
  zones.see,
]);

flow('zones -first-> tariffs -regular-> order -error-> error -cancel-> zones', [
  zones.see,
  zones.first,
  tariffs.see,
  tariffs.regular,
  order.assert_placed({
    zones: 'first',
    tariff: 'regular',
  }),
  order.waiting,
  order.error,
  error.see,
  error.cancel,
  order.assert_not_placed,
  zones.see,
]);

flow('zones -all-> tariffs -regular-> order -success-> thanks -close-> zones', [
  zones.see,
  zones.all,
  tariffs.see,
  tariffs.regular,
  order.assert_placed({
    zones: 'all',
    tariff: 'regular',
  }),
  order.waiting,
  order.success,
  thanks.see,
  thanks.close,
  zones.see,
]);

flow('zones -first-> tariffs -student-> order -success-> thanks -close-> zones', [
  zones.see,
  zones.first,
  tariffs.see,
  tariffs.student,
  order.assert_placed({
    zones: 'first',
    tariff: 'student',
  }),
  order.waiting,
  order.success,
  thanks.see,
  thanks.close,
  zones.see,
]);

flow('zones -all-> tariffs -student-> means_of_transport -all-> order -success-> thanks -close-> zones', [
  zones.see,
  zones.all,
  tariffs.see,
  tariffs.student,
  means_of_transport.see,
  means_of_transport.all,
  order.assert_placed({
    zones: 'all',
    tariff: 'student',
    meansOfTransport: 'all',
  }),
  order.waiting,
  order.success,
  thanks.see,
  thanks.close,
  zones.see,
]);

flow('zones -all-> tariffs -student-> means_of_transport -just_buses-> order -success-> thanks -close-> zones', [
  zones.see,
  zones.all,
  tariffs.see,
  tariffs.student,
  means_of_transport.see,
  means_of_transport.just_buses,
  order.assert_placed({
    zones: 'all',
    tariff: 'student',
    meansOfTransport: 'just_buses',
  }),
  order.waiting,
  order.success,
  thanks.see,
  thanks.close,
  zones.see,
]);

flow('with means of transport -> without means of transport', [
  zones.all,
  tariffs.student,
  means_of_transport.all,
  order.assert_placed({
    zones: 'all',
    tariff: 'student',
    meansOfTransport: 'all',
  }),
  order.waiting,
  order.success,
  thanks.close,
  zones.first,
  tariffs.regular,
  order.assert_placed({
    zones: 'first',
    tariff: 'regular',
  }),
]);