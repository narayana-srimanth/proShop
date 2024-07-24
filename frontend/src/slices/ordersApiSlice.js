import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) =>({
        createOrder : builder.mutation({
            query : (order)=>({
                url : ORDERS_URL,
                method : 'POST',
                body : order

            })
        }),
        getOrderDetails : builder.query({
            query : (orderId)=>({
                url : `${ORDERS_URL}/${orderId}`
            }),
            keepUnusedDataFor : 5
        }),
        updateOrderToPaid : builder.mutation({
            query : (orderId)=>({
                url:`${ORDERS_URL}/${orderId}/pay`,
                method : 'PUT'
            })
        }),
        getMyOrders : builder.query({
            query : ()=>({
                url : `${ORDERS_URL}/mine`
    
            }),
            keepUnusedDataFor : 5
        }),
        getOrders : builder.query({
            query : ()=>({
                url : `${ORDERS_URL}`
            }),
            keepUnusedDataFor : 5,
        }),
        deliverOrder : builder.mutation({
            query : (orderId)=>({
                url : `${ORDERS_URL}/${orderId}/deliver`,
                method : 'PUT'
            }),

        })
    })
});

export const { useCreateOrderMutation,useGetOrderDetailsQuery,useUpdateOrderToPaidMutation ,useGetMyOrdersQuery
    ,useGetOrdersQuery,useDeliverOrderMutation
} = ordersApiSlice;


