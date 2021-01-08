const user = {
    state: {
        info: {}
    },
    mutations: {
        setUser(state, user)
        {
            state.info = user;
        }
    }

}

export default user;