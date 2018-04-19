const ADD_PRO = '添加项目';
const DEL_PRO = '删除项目';

//reducer
export function counter(state=0, action){
    switch (action.type){
        case ADD_PRO:
            return state + 1;
        case DEL_PRO:
            return state - 1;
        default:
            return 10;
    }
}

//action creater
//添加
export function addPro() {
    return {type:ADD_PRO}
}
//删除
export function delPro() {
    return {type:DEL_PRO}
}
//异步添加
export function addProAsync() {
    return dispatch=>{
        setTimeout(()=>{
            dispatch(addPro())
        },2000)
    }
}
