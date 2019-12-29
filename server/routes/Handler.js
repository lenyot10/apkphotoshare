const {user}= require('../Model/Schema')


const handlers = {
    getAllUser: async (request,h)=>{
    return user.find()
    },
    postregist : async (request, h) =>{
        console.log(request.payload)
        let maxId = await user.aggregate([
            {
            $group: { _id: "id",
                max: { $max: "$id" 
                }
            } 
            }])
        
        nextId = maxId[0].max + 1
        Object.assign(request.payload, { id: nextId})
        await user.insertMany([request.payload])
        return h.response(request.payload).code(201)
    },

     putCreateProfile : async (request, h) => {
         let email = request.params.email
    await user.findOneAndUpdate({"email": email},request.payload,{new : true})
    let result = await user.findOne({ email : email}).lean 
    return h.response(result).code(202)   

    },
    UpdProfile :async ( request , h) =>{
        return user.findOneAndUpdate(
            {_id : req.params.id},
            (err, result)=>{
                if(err){
                    return err, 'Internal error'
                }
                if(result.n === 0){
                    return 'Not found'
                }
                return 204
            }
        )
    

    },
    UpdProfile :async ( request , h) =>{
        return user.deleteOne(
            {_id : req.params.id},
            (err, result)=>{
                if(err){
                    return err, 'Internal error'
                }
                if(result.n === 0){
                    return 'Not found'
                }
                return 204
            }
        )
    

    },

    getUserInfo : async(request,h)=>{
        db.collection('user').findOne({email:user},function(err,result){
            if(result = null){
                callback(false)
            }
            else{
                callback(result)
            }
        })
    },
    userLogin: async (req, h) => {
        const user = await Users.findOne({"emailID": req.payload.emailID}).lean()

        if(user !== null) {
            if(req.payload.password === user.password) {
                let key = btoa(user.emailID, user.password)
                return h.response({auth:true, type: "Basic", key: key}).code(201)
            } else {
                return h.response({auth: false})
            }
        } else {
            return h.response({auth: false})
        }


    }


    
    
}
module.exports={handlers}