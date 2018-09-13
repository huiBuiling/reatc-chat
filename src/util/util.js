//设置跳转路径
export function getRedirectPath({type, avatar}){
    //根据用户信息 返回跳转地址
    // user.type /boss /genius
    // user.avatar /bossinfo /geniusinfo
    let url = (type === 'boss') ? '/boss':'/genius';
    if(!avatar){
        url += 'info'
    }
    return url
}

/**
 * 聊天消息过滤
 * 根据数据模型 里面的 from and to 过滤出 chatid
 */
export function getChatId(userId, targetId){
    return [userId, targetId].sort().join('_');
}

