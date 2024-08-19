const serve = require('./server/serve');
const route = require('./router/router');
const requestHandlers = require('./handlers/requestHandlers');

const handleObj = {}
handleObj['/'] = requestHandlers.start;
handleObj['/start'] = requestHandlers.start;
handleObj['/upload'] = requestHandlers.upload;
handleObj['/show'] = requestHandlers.show;

serve.start(route,handleObj);