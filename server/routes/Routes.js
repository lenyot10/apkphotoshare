'use strict'

const Joi = require('@hapi/joi')
const {handlers} = require('./HandlerRegister')
const routes =  [
    {
        method : 'GET',
        path : '/',
        handler : async (req,h)=>{
          return h.response({message: 'OK'}).code(200) 
        }
    },{
        method: 'POST',
        path: '/user/login',
        handler: handlers.userLogin,
    },{
        method : 'GET',
        path : '/getUserInfo',
        handler:handlers.getUserInfo,
    },
    {
        method: 'GET',
        path: '/user',
        handler: handlers.getAllUser,
        
    },{
        method: 'POST',
        path: '/register',
        handler: handlers.postregist,
    },{
        method : 'PUT',
        path:'/create/{email}',
        handler:handlers.putCreateProfile
    },{
        method: 'POST',
        path: '/Profile{id}',
        handler: handlers.postregist,
    }
]
module.exports={routes}