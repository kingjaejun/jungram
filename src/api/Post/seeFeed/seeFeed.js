import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeFeed: async(_,__,{request, isAuthenticated})=>{
            isAuthenticated(request);
            const {user} =  request;
            const followings = await prisma.user({id:user.id}).followings()
            return prisma.posts({
                where:{
                    user:{
                        id_in: [...followings.map(user =>user.id),user.id]
                    }
                },
                orderBy: "createdAt_DESC"
             });
        }
    }
}