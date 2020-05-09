import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

const BASE_URL_WS = '/ws';

let stompClient;
let subscriptions = [];

export const subscribe = (queueName, callback) => {  
  if (subscriptions.find(qs => qs.queueName === queueName)) {
    return;
  }

  if (!stompClient || stompClient.connected) {
    stompClient = Stomp.over(new SockJS(BASE_URL_WS));
    stompClient.connect({}, () => {
      applySubscribe(queueName, callback);
    });
  } else {
    applySubscribe(queueName, callback);
  }

};

export const unsubscribe = queueName => {
  const queueSubscription = subscriptions.find(qs => qs.queueName === queueName);
  if (!queueSubscription) {
    return;
  }

  queueSubscription.subscription.unsubscribe();
  subscriptions = subscriptions.filter(qs => qs.queueName !== queueName);
};

const applySubscribe = (queueName, callback) => {
  const subscription = stompClient.subscribe(queueName, callback);
  subscriptions.push({queueName, subscription});
};