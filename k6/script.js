import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}




// data_received..................: 17 kB 8.2 kB/s
// data_sent......................: 438 B 212 B/s
// http_req_blocked...............: avg=1.03s    min=1.03s    med=1.03s    max=1.03s    p(90)=1.03s    p(95)=1.03s   
// http_req_connecting............: avg=24.09ms  min=24.09ms  med=24.09ms  max=24.09ms  p(90)=24.09ms  p(95)=24.09ms 
// http_req_duration..............: avg=26.8ms   min=26.8ms   med=26.8ms   max=26.8ms   p(90)=26.8ms   p(95)=26.8ms  
//   { expected_response:true }...: avg=26.8ms   min=26.8ms   med=26.8ms   max=26.8ms   p(90)=26.8ms   p(95)=26.8ms  
// http_req_failed................: 0.00% ✓ 0        ✗ 1  
// http_req_receiving.............: avg=156µs    min=156µs    med=156µs    max=156µs    p(90)=156µs    p(95)=156µs   
// http_req_sending...............: avg=112µs    min=112µs    med=112µs    max=112µs    p(90)=112µs    p(95)=112µs   
// http_req_tls_handshaking.......: avg=708.24ms min=708.24ms med=708.24ms max=708.24ms p(90)=708.24ms p(95)=708.24ms
// http_req_waiting...............: avg=26.53ms  min=26.53ms  med=26.53ms  max=26.53ms  p(90)=26.53ms  p(95)=26.53ms 
// http_reqs......................: 1     0.483589/s
// iteration_duration.............: avg=2.06s    min=2.06s    med=2.06s    max=2.06s    p(90)=2.06s    p(95)=2.06s   
// iterations.....................: 1     0.483589/s
// vus............................: 1     min=1      max=1