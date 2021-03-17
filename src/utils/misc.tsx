import { server } from '../config'

export const redirectToLogin = (context) => {
    const { res } =  context;
    res.writeHead(301, { location: `${server}/app/login` } );
    res.end();
}