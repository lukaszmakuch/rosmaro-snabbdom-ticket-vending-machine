import {dispatchActionSaga, matchEffect} from 'rosmaro-redux';
import {all, takeEvery, put, delay} from 'redux-saga/effects';

function* placeOrder(action) {
  console.log({order: action.data});
  yield delay(1500);
  if (Math.random() > 0.5) {
    yield(put({type: 'ORDER_SUCCESS'}));
  } else {
    yield(put({type: 'ORDER_ERROR'}));
  }
}

export default function*() {
  yield all([
    dispatchActionSaga(),
    takeEvery(matchEffect('ORDER'), placeOrder),
  ]);
}
