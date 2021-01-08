var data = {
    state: {
        users: [],
        institutions: [],
        courses: [],
        roles: [],
        courseHints: [],
        institutionHints: []
    },
    mutations: {
        setUsers(state, users)
        {
            state.users = users;
        },
        setInstitution(state, inst)
        {
            state.institutions = inst;
        },
        setCourses(state, courses)
        {
            state.courses = courses;
        }, setRoles(state, roles)
        {
            state.roles = roles;
        },
        setCoursesHints(state, hints)
        {
            state.courseHints = hints;
        }, setInstitutionsHints(state, hints)
        {
            state.institutionHints = hints;
        }
    }
}

export default data;