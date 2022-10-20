"use strict";(self["webpackChunkswapi"]=self["webpackChunkswapi"]||[]).push([[218],{4218:function(e,t,s){s.r(t),s.d(t,{default:function(){return P}});var i=s(3396),a=s(7139),r=s(3862);const o={key:0},u={class:"items__wrapper"},h={class:"items__info"},l={class:"item"},n={class:"page__wrapper"},c=["onClick"],m={key:0};function d(e,t,s,d,_,p){const E=(0,i.up)("search-bar"),S=(0,i.up)("k-dialog"),g=(0,i.up)("k-button"),T=(0,i.up)("router-link");return e.isLoading?((0,i.wg)(),(0,i.iD)("p",o,"Loading Data for "+(0,a.zw)(e.routeName)+"...",1)):((0,i.wg)(),(0,i.iD)(i.HY,{key:1},[(0,i.Wm)(S,{show:e.dialogSearchVisible,"onUpdate:show":t[1]||(t[1]=t=>e.dialogSearchVisible=!1)},{default:(0,i.w5)((()=>[(0,i.Wm)(E,{ref:"search__input","onUpdate:show":t[0]||(t[0]=t=>e.dialogSearchVisible=t),onSubmit:e.search},null,8,["onSubmit"])])),_:1},8,["show"]),(0,i._)("section",u,[(0,i._)("div",h,[(0,i._)("h3",null,[(0,i.Uk)(" Here are "+(0,a.zw)(e.routeName)+" of the saga ",1),(0,i._)("div",null,[(0,i.Wm)(g,{class:"search__button",onClick:e.showSearch},{default:(0,i.w5)((()=>[(0,i.Uk)("Search ")])),_:1},8,["onClick"]),(0,i.Wm)(g,{class:"search__button",onClick:e.resetSearch},{default:(0,i.w5)((()=>[(0,i.Uk)("Reset ")])),_:1},8,["onClick"])])])]),0===e.$store.state.items.totalItems?((0,i.wg)(),(0,i.iD)(i.HY,{key:0},[(0,i.Uk)("No such Data")],64)):(0,i.kq)("",!0),(0,i._)("ul",null,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.items,(t=>((0,i.wg)(),(0,i.j4)(T,{key:t,to:{path:`${e.routeName}/${t.url.match(/\d/g).join("")}`}},{default:(0,i.w5)((()=>[(0,i._)("li",l,[(0,i._)("h2",null,(0,a.zw)(t.name??t.title),1),(0,i._)("p",null,(0,a.zw)(t.birth_year||t.classification||t.terrain||t.model||`by ${t.director}`),1)])])),_:2},1032,["to"])))),128))]),(0,i._)("ul",n,[(0,i.Wm)(g,{disabled:!e.prev,onClick:t[2]||(t[2]=(0,r.iM)((t=>e.updatePage(e.currentPage-1)),["prevent"]))},{default:(0,i.w5)((()=>[(0,i.Uk)("Back")])),_:1},8,["disabled"]),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.totalPages,(t=>((0,i.wg)(),(0,i.iD)("li",{key:t,class:(0,a.C_)(["page",{currentPage:e.currentPage===t}]),onClick:s=>e.updatePage(t)},[(0,i.Wm)(g,null,{default:(0,i.w5)((()=>[(0,i.Uk)((0,a.zw)(t),1)])),_:2},1024)],10,c)))),128)),(0,i.Wm)(g,{disabled:!e.next,onClick:t[3]||(t[3]=(0,r.iM)((t=>e.updatePage(e.currentPage+1)),["prevent"]))},{default:(0,i.w5)((()=>[(0,i.Uk)("Forward")])),_:1},8,["disabled"])])]),(0,i._)("template",null,[e.isLoading||e.items.length?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("div",m,"No such data"))])],64))}s(7658);const _={for:"search__input"};function p(e,t,s,a,o,u){const h=(0,i.up)("k-input"),l=(0,i.up)("k-button");return(0,i.wg)(),(0,i.iD)("form",{onSubmit:t[1]||(t[1]=(0,r.iM)(((...e)=>u.updateSearchQuery&&u.updateSearchQuery(...e)),["prevent"])),class:"search__bar"},[(0,i._)("label",_,[(0,i.Uk)("Look for "),(0,i.Wm)(h,{type:"text",modelValue:o.searchInput,"onUpdate:modelValue":t[0]||(t[0]=e=>o.searchInput=e),modelModifiers:{lazy:!0},id:"search__input",placeholder:"Type in.."},null,8,["modelValue"]),(0,i.Wm)(l,null,{default:(0,i.w5)((()=>[(0,i.Uk)("Search")])),_:1})])],32)}var E={data(){return{searchInput:""}},methods:{updateSearchQuery(){this.$store.commit("items/SET_SEARCH_QUERY",this.searchInput),this.searchInput&&this.$emit("update:show",!1),this.searchInput=""}}},S=s(89);const g=(0,S.Z)(E,[["render",p]]);var T=g,w=s(65),k=(0,i.aZ)({name:"ItemsView",data(){return{isLoading:!0,items:null,dialogSearchVisible:!1,query:{}}},components:{SearchBar:T},methods:{...(0,w.nv)(["items/GET_ITEMS_ACTION"]),handleSuccess(){this.isLoading=!1,this.items=this.$store.state.items[this.routeName]},handleFail(){this.isLoading=!1},search(){this.isLoading=!0,this.$store.commit("items/SET_CURRENT_PAGE",1),this.routeHandler(),this["items/GET_ITEMS_ACTION"]({resolve:this.handleSuccess,reject:this.handleFail,itemClass:this.routeName})},resetSearch(){this.$store.commit("items/SET_CURRENT_PAGE",1),this.$store.commit("items/SET_SEARCH_QUERY",""),this.routeHandler(),this["items/GET_ITEMS_ACTION"]({resolve:this.handleSuccess,reject:this.handleFail,itemClass:this.routeName})},updatePage(e){e<1||e>this.totalPages||e===this.currentPage||(this.$store.commit("items/SET_CURRENT_PAGE",e),this.routeHandler(),this.load())},showSearch(){return this.dialogSearchVisible=!0},routeHandler(){this.$router.push({path:this.routeName,query:{search:this.searchQuery,page:this.currentPage}})},update(){this.$store.commit("items/SET_SEARCH_QUERY",""),this.$store.commit("items/SET_CURRENT_PAGE",1),this.load()},load(){this.isLoading=!0,this["items/GET_ITEMS_ACTION"]({resolve:this.handleSuccess,reject:this.handleFail,itemClass:this.routeName})}},created(){this.$router.push({path:this.routeName,query:this.$route.query}),this.$store.commit("items/SET_CURRENT_PAGE",Number(this?.routeQuery?.page)||1),this.$store.commit("items/SET_SEARCH_QUERY",this.$route.query.search),this.load()},computed:{...(0,w.rn)({state:e=>e.items.state}),...(0,w.Se)({people:"items/GET_PEOPLE",starships:"items/GET_STARSHIPS",species:"items/GET_SPECIES",vehicles:"items/GET_VEHICLES",films:"items/GET_FILMS",searchQuery:"items/GET_SEARCH_QUERY",totalPages:"items/GET_TOTAL_PAGES",next:"items/GET_NEXT_PAGE",prev:"items/GET_PREV_PAGE",currentPage:"items/GET_CURRENT_PAGE"}),routeName(){return this.$route.name},routeQuery(){return this.$route.query}},watch:{$route(e){this.$store.commit("items/SET_SEARCH_QUERY",e.query.search),this.$store.commit("items/SET_CURRENT_PAGE",Number(e.query.page)),this.load()},routeName(){Array.isArray(this.items)&&(this.items.length=0),this.update()}}});const C=(0,S.Z)(k,[["render",d],["__scopeId","data-v-6d598fca"]]);var P=C}}]);
//# sourceMappingURL=218.f0e3c4f5.js.map