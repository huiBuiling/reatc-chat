const ADD_PRO = '添加项目';
const DEL_PRO = '删除项目';

//reducer
export const counter = (state={ num: 10}, action)=>{
    switch (action.type){
        case ADD_PRO:
            return {num:state.num++};
        case DEL_PRO:
            return {num:state.num--};
        default:
            return state
    }
}

//action creater
//添加
export const addPro = ()=>{
    return {type:ADD_PRO}
}
//删除
export const delPro = ()=>{
    return {type:DEL_PRO}
}
//异步添加
export const addProAsync =()=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(addPro())
        },2000)
    }
}
