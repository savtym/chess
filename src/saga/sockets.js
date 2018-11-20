//take - filter actions, (but action have been called with reducers)
//select - get data from store
//fork - run task in background, kill another sagas on exeption
//spawn - like fork, but don't kill another sagas on exeption

const handleNewMessage = function* handleNewMessage(params) {
  yield takeEvery(
    types.ADD_MESSAGE, 
    (action) => {
      action.author = params.username
      params.socket.emit('my other event', action, ({err, data}) => {
      })
  })
};


export const cancellableSynk = function * (){
  const task = yield fork(backgroundSynkSaga) // сага, которая вызывает другую сагу через делей
  yield delay(6000)
  yield cancel(task)// при отмене в backgroundSynkSaga нужно поставить try\finally что бы реагировать на отмену саги с помощью эффекта cancelled
  // if(yield cancelled()) - значит сага была отменена, а не просто вызвался эксепшн
}

export const saga = function * (){
  yield takeEvery("ADD_PERSON_REQUEST", addPersonSaga) // for takeEvery no need use while in generator
}
