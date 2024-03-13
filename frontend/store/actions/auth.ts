export const setCurrentUser = ({ commit }: any, payload: any)=> {
   commit('setCurrentUser', payload);
}

export const clearCurrentUser = (ctx: any) =>{
    ctx.commit('clearCurrentUser');
}