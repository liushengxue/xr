"use strict";(self.webpackChunkxr_static=self.webpackChunkxr_static||[]).push([[338],{4437:function(e,n,t){t.d(n,{Z:function(){return i}});var r=t(9439),a=t(2791);function i(e){var n=(0,a.useState)(!1),t=(0,r.Z)(n,2),i=t[0],l=t[1],s=(0,a.useCallback)((function(){return l(!0),e.apply(void 0,arguments).then((function(e){return l(!1),Promise.resolve(e)})).catch((function(e){return l(!1),Promise.reject(e)}))}),[e]);return[i,s]}},6156:function(e,n,t){t.r(n),t.d(n,{default:function(){return b}});var r=t(9439),a=t(2791),i=t(2283),l=t(2211),s=t(2426),o=t.n(s),d=t(501),u=t(4165),c=t(5861),x=t(9228),m=t(1095),f=t(4219),Z=t(3734),h=t(7309),p=t(3695),v=t(8452),j=t(4437),g=t(1229),y=t(184);var I=function(e){var n=e.current,t=e.onclose,i=(0,a.useState)([]),s=(0,r.Z)(i,2),o=s[0],I=s[1],b=(0,a.useState)(!1),C=(0,r.Z)(b,2),_=C[0],k=C[1],w=(0,j.Z)(g.Zx),S=(0,r.Z)(w,2),O=S[0],P=S[1],R=(0,j.Z)(g.Cs),Y=(0,r.Z)(R,2),F=Y[0],z=Y[1],A=[{title:"\u7c7b\u522b",dataIndex:"type_name"},{title:"\u578b\u53f7",dataIndex:"model_name"},{title:"\u54c1\u724c",dataIndex:"brand_name"},{title:"\u5907\u6ce8",dataIndex:"note"},{title:"\u9700\u6c42\u91cf",dataIndex:"count"},{title:"\u5b9e\u5230\u91cf",dataIndex:"real_count"},{title:"\u5b8c\u6210\u72b6\u6001",dataIndex:"status"},{title:"\u5907\u6ce8",dataIndex:"note"},{title:"\u5e93\u5b58\u5730\u5740",dataIndex:"storage_address"},{title:"\u64cd\u4f5c",key:"id",render:function(e){return(0,y.jsx)(a.Fragment,{children:(0,y.jsx)(x.Z,{open:_===e.id,onOpenChange:function(n){return D(n,e)},content:H(e),trigger:"click",placement:"topRight",children:(0,y.jsxs)("a",{children:[(0,y.jsx)(d.Z,{style:{marginRight:4}}),"\u7f16\u8f91\u8d27\u7269"]})})})}}];(0,a.useEffect)((function(){n.num&&E()}),[]);var D=function(e,n){var t=!!e&&n.id;k(t)},E=function(){P({num:n.num}).then((function(e){200===(null===e||void 0===e?void 0:e.code)&&I(null===e||void 0===e?void 0:e.result)}))},H=function(e){return(0,y.jsxs)(m.Z,{labelCol:{span:8},wrapperCol:{span:16},initialValues:{id:e.id,realCount:e.real_count,status:e.status,storageAddress:e.storage_address},onFinish:K,style:{margin:"15px 20px 0 0 "},children:[(0,y.jsx)(m.Z.Item,{label:"\u5b9e\u5230\u91cf",name:"id",style:{display:"none"},children:(0,y.jsx)(f.Z,{})}),(0,y.jsx)(m.Z.Item,{label:"\u5b9e\u5230\u91cf",name:"realCount",children:(0,y.jsx)(f.Z,{placeholder:"\u8bf7\u586b\u5199\u5b9e\u5230\u91cf"})}),(0,y.jsx)(m.Z.Item,{label:"\u5b8c\u6210\u72b6\u6001",name:"status",children:(0,y.jsxs)(Z.Z,{children:[(0,y.jsx)(Z.Z.Option,{value:"\u672a\u5165\u5e93",children:"\u672a\u5165\u5e93"}),(0,y.jsx)(Z.Z.Option,{value:"\u5165\u5e93\u672a\u4e1d\u5370",children:"\u5165\u5e93\u672a\u4e1d\u5370"}),(0,y.jsx)(Z.Z.Option,{value:"\u5165\u5e93\u5b8c\u6210",children:"\u5165\u5e93\u5b8c\u6210"})]})}),(0,y.jsx)(m.Z.Item,{label:"\u5e93\u5b58\u5730\u5740",name:"storageAddress",children:(0,y.jsx)(f.Z,{placeholder:"\u8bf7\u586b\u5199\u5e93\u5b58\u5730\u5740"})}),(0,y.jsx)(m.Z.Item,{wrapperCol:{offset:18},children:(0,y.jsx)(h.Z,{type:"primary",htmlType:"submit",loading:F,children:"\u63d0\u4ea4"})})]})};function K(e){return M.apply(this,arguments)}function M(){return(M=(0,c.Z)((0,u.Z)().mark((function e(n){var t;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(n),e.next=3,z(n);case 3:200===(null===(t=e.sent)||void 0===t?void 0:t.code)?(p.ZP.success("\u4fee\u6539\u6210\u529f"),E(),k(!1)):p.ZP.error("\u4fee\u6539\u5931\u8d25");case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,y.jsx)(v.Z,{title:"\u7f16\u8f91\u8d27\u7269\u5355",open:!0,footer:null,width:"1400px",onCancel:function(){return t()},children:(0,y.jsx)(l.Z,{rowKey:"id",dataSource:o,loading:O,columns:A,pagination:{},bordered:!0,size:"small"})})};var b=function(){var e=(0,a.useState)({}),n=(0,r.Z)(e,2),t=n[0],s=n[1],u=(0,a.useState)([]),c=(0,r.Z)(u,2),x=c[0],m=c[1],f=(0,j.Z)(g.lR),Z=(0,r.Z)(f,2),h=Z[0],p=Z[1];(0,a.useEffect)((function(){b()}),[]);var v=[{title:"\u8ba2\u5355\u7f16\u53f7",dataIndex:"num"},{title:"\u65e5\u671f",key:"create_time",render:function(e){return o()(e.create_time).format("YYYY-MM-DD HH:mm:ss")}},{title:"\u5ba2\u6237",dataIndex:"custom_name"},{title:"\u4e1a\u52a1\u5458",dataIndex:"name"},{title:"\u64cd\u4f5c",key:"id",render:function(e){return(0,y.jsxs)("a",{onClick:function(){return C(e)},children:[(0,y.jsx)(d.Z,{style:{marginRight:4}}),"\u7f16\u8f91\u8d27\u7269\u5355"]})}}],b=function(e){p({name:e}).then((function(e){200===(null===e||void 0===e?void 0:e.code)&&m(null===e||void 0===e?void 0:e.result)}))},C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};s(e)};return(0,y.jsxs)(a.Fragment,{children:[(0,y.jsxs)(i.Z,{bordered:!1,children:[(0,y.jsx)("div",{style:{marginBottom:10}}),(0,y.jsx)(l.Z,{dataSource:x,loading:h,rowKey:"id",columns:v,pagination:{},bordered:!0,size:"small"})]}),t.id&&(0,y.jsx)(I,{current:t,onclose:C})]})}}}]);
//# sourceMappingURL=EntryProduct.77ba75af.chunk.js.map