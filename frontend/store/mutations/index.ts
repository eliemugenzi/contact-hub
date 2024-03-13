export default {
    setCurrentUser: (state: any, payload: any) => {
        state.currentUser = payload;
    },
    clearCurrentUser: (state: any)=>{
        state.currentUser = {};
    },
    setContactList: (state: any, payload: any) =>{
        state.contacts = payload;
    }
}