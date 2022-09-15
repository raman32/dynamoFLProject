// Load the AWS SDK for Node.js
import  AWS from 'aws-sdk';

function sendTaskToSQS(task:string) {
return new Promise<string|undefined>((resolve,reject) => {

// Set the region 
AWS.config.update({region: 'us-east-1'});
// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var params = {
   // Remove DelaySeconds parameter and value for FIFO queues
  DelaySeconds: 10,
  MessageAttributes: {
  },
  MessageBody: task,
  // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
  // MessageGroupId: "Group1",  // Required for FIFO queues
  QueueUrl: "https://sqs.us-east-1.amazonaws.com/234418706789/aggregationQueue"
};

sqs.sendMessage(params, function(err, data) {
  if (err) {
   reject(err)
  } else {
    resolve(data.MessageId);
  }
});
})
}

export {
    sendTaskToSQS
}
