import { createStore } from 'redux';

//通过reducer建立
//根据老的状态和action，生产新的state
function counter(state=0, action){
    switch (action.type){
        case '添加项目':
            return state + 1;
        case '删除项目':
            return state - 1;
        default:
            return 10;
    }
}

//新建store
const store = createStore(counter);

//获取状态
const init = store.getState();
console.log(init)

//订阅方法
function listener() {
    const current = store.getState();
    console.log(`现在有项目${current}个`)
}
//订阅
store.subscribe(listener);

//派发事件,传递action
store.dispatch({type:'添加项目'})
store.dispatch({type:'添加项目'})
store.dispatch({type:'删除项目'})