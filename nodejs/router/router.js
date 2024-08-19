function route(pathname,handle,request,response){
  const handleFn = handle[pathname];
  if(typeof handleFn === 'function'){
   return handleFn(request,response)
  }else{
    response.writeHead(404,{'Content-Type':'text/plain'})
    response.write('404 Not found');
    response.end()
  }
  
}

module.exports = route