export default store => next => action => {
  console.log('BEFORE: ', store.getState());
  next(action);
  console.log('AFTER: ', store.getState());
  console.log('=======================================');
};

