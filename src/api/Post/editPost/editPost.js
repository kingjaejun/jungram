import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
    Mutation:{
        editPost: async(_, args, {request, isAuthenticated})=>{
            isAuthenticated(request);
            const {id, caption, location, action}= args;
            const {user} = request;
            const post = await prisma.$exists.post(
                {
                    id,
                    user:{
                        id:user.id
                    }
                }
            );
            /*post가 존재하면 id와post는 args에서 
            온것이고 유저는 request에서 
            즉 token에서 온것이여야한다*/
               
            if (post) {
                if(action === EDIT){
                    return prisma.updatePost({
                        data:
                        {
                            caption, location
                        },
                        where:
                        {
                            id
                        } 
                    });
            }else if(action === DELETE){
                return prisma.deletePost({id});
            }
            }else{
                throw Error("you can't do that");
            }
        }
    }
}