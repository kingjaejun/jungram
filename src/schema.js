//모든 파일들을 이 파일에서 합친다
//api폴더안에 많은 graphql파일들이 추가되면 같은 위치에 resolvers파일들이 추가됨
// 위 파일들을 여기 넣을거임
import {makeExecutableSchema} from "graphql-tools";
import {fileLoader, mergeResolvers, mergeTypes} from "merge-graphql-schemas";
import path from "path";

//파일 받아오기
const allTypes = fileLoader(path.join(__dirname,"/api/**/*.graphql"))
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"))

const schema = makeExecutableSchema({
    typeDefs: mergeTypes(allTypes),
    resolvers:mergeResolvers(allResolvers)
});
export default schema;