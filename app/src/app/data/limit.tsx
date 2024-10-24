const env = process.env.NODE_ENV;

import prod_limit from "@/app/data/limit.json";
import dev_limit from "@/app/data/dev_limit.json";

console.log("env", env);
let limitTmp;
if (env === "production") {
    limitTmp = prod_limit;
}else{
    limitTmp = dev_limit;
}

export const limit = limitTmp;