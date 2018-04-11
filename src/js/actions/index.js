import {ADD_CAT,ADD_LINK,RESET,CAT_FILTER} from "../constants/action-types";
export const addCat = catname=>({type:ADD_CAT,payload:catname});
export const addLink = linkinfo=>({type:ADD_LINK,payload:linkinfo});
export const reset = linkinfo=>({type:RESET,payload:" "});
export const catFilter = catname=>({type:CAT_FILTER,payload:catname})
