import http from './index';

export const getHistoryQuote = params => http.get('https://globaldemo.beihaiwang123.com/api/v3/quote/history', {params});
