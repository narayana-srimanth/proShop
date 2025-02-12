import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        login : builder.mutation({
            query : (data)=>({
                url : `${USERS_URL}/auth`,
                method : 'POST',
                body : data
            })
        }),
        register : builder.mutation({
            query : (data)=>({
                url : `${USERS_URL}`,
                method : 'POST',
                body : data
            })

        }),
        logout : builder.mutation({
            query : ()=>({
                url : `${USERS_URL}/logout`,
                method : 'POST'
            })        
        }),
        profile : builder.mutation({
            query : (data)=>({
                url : `${USERS_URL}/profile`,
                method : 'PUT',
                body : data
            })
        }),
        getUsers : builder.query({
            query : ()=>({
                url : `${USERS_URL}`,
                method : 'GET'
            }),
            providesTags : ['Users'],
            keepUnusedDataFor : 5
        }),
        deleteUser : builder.mutation({
            query : (userId)=>({
                url : `${USERS_URL}/${userId}`,
                method : 'DELETE'
            })
        }),
        getUserbyId : builder.query({
            query : (userId)=>({
                url : `${USERS_URL}/${userId}`,
            }),
            keepUnusedDataFor : 5,
        }),
        updateUser : builder.mutation({
            query : (data)=>({
                url : `${USERS_URL}/${data._userId}`,
                method : 'PUT',
                body : data,
            }),
            invalidatesTags : ['Users']
        })
    })
});


export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useProfileMutation
    ,useGetUsersQuery,useDeleteUserMutation,useGetUserbyIdQuery,useUpdateUserMutation
} = usersApiSlice