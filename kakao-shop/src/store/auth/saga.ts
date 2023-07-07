import axios from 'axios';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import { SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from './reducers';

function signUpAPI(data: any) {
  return axios.post('http://kakao-app-env.eba-kfsgeb74.ap-northeast-2.elasticbeanstalk.com/join', data);
}

function* signUp(action: any): any {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err: any) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([watchSignUp()]);
}
