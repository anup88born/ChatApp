
import React, { useEffect } from 'react';
import { SignalingClient } from 'amazon-kinesis-video-streams-webrtc';
import {Config, CognitoIdentityCredentials,KinesisVideo,KinesisVideoSignalingChannels} from "aws-sdk";
// DescribeSignalingChannel API can also be used to get the ARN from a channel name.
// const channelARN = 'arn:aws:kinesisvideo:us-east-1:058994109245:channel/VideoChat/1590405736578';

// AWS Credentials
const accessKeyId = 'AKIAQ3PCSVM6ZXDNFNG3';
const secretAccessKey = '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';

// <video> HTML elements to use to display the local webcam stream and remote stream from the master
// const localView = document.getElementsByTagName('video')[0];
// const remoteView = document.getElementsByTagName('video')[1];

const region = 'us-east-1';
const master = {
    signalingClient: null,
    peerConnectionByClientId: {},
    dataChannelByClientId: {},
    localStream: null,
    remoteStreams: [],
    peerConnectionStatsInterval: null,
};

const viewer ={
    signalingClient: null,
    peerConnectionByClientId: {},
    dataChannelByClientId: {},
    localStream: null,
    remoteStreams: [],
    peerConnectionStatsInterval: null,
};
// const clientId = 'RANDOM_VALUE';

// const kinesisVideoClient = new KinesisVideo({
//     region,
//     accessKeyId,
//     secretAccessKey,
//     correctClockSkew: true,
// });
// const master = {
//     signalingClient: null,
//     peerConnectionByClientId: {},
//     dataChannelByClientId: {},
//     localStream: null,
//     remoteStreams: [],
//     peerConnectionStatsInterval: null,
// };



export default function VideoChat() {


    useEffect(()=>
    {
  
   
    },[])
   

    async function startAgent(onStatsReport) {

        const remoteMessage = document.getElementsByClassName('remote-message')[0] 

        const onRemoteDataMessage = event => {
            remoteMessage.append(`${event.data}\n`);
        }

       let localView = document.getElementsByClassName('local-view')[0]
       let remoteView = document.getElementsByClassName('remote-view')[0]
       master.localView = localView;
       master.remoteView = remoteView;
   

        const kinesisVideoClient = new KinesisVideo({
            region,
            accessKeyId,
            secretAccessKey,
            correctClockSkew: true,
        });
    // Get signaling channel ARN
    const describeSignalingChannelResponse = await kinesisVideoClient
        .describeSignalingChannel({
            ChannelName: "VideoChat",
        })
        .promise();
    const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
    console.log('[MASTER] Channel ARN: ', channelARN);

    const getSignalingChannelEndpointResponse = await kinesisVideoClient
    .getSignalingChannelEndpoint({
        ChannelARN: channelARN,
        SingleMasterChannelEndpointConfiguration: {
            Protocols: ['WSS', 'HTTPS'],
            Role: 'MASTER',
        },
    })
    .promise();
const endpointsByProtocol = getSignalingChannelEndpointResponse.ResourceEndpointList.reduce((endpoints, endpoint) => {
    endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
    return endpoints;
}, {});
console.log('[MASTER] Endpoints: ', endpointsByProtocol);

   // Create Signaling Client
   master.signalingClient = new SignalingClient({
    channelARN,
    channelEndpoint: endpointsByProtocol.WSS,
    role: "MASTER",
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        // sessionToken: formValues.sessionToken,
    },
    systemClockOffset: kinesisVideoClient.config.systemClockOffset,
});


 // Get ICE server configuration
 const kinesisVideoSignalingChannelsClient = new KinesisVideoSignalingChannels({
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    // sessionToken: formValues.sessionToken,
    endpoint: endpointsByProtocol.HTTPS,
    correctClockSkew: true,
});
const getIceServerConfigResponse = await kinesisVideoSignalingChannelsClient
    .getIceServerConfig({
        ChannelARN: channelARN,
    })
    .promise();
const iceServers = [];
// if (!formValues.natTraversalDisabled && !formValues.forceTURN) {
    iceServers.push({ urls: `stun:stun.kinesisvideo.${region}.amazonaws.com:443` });
// }
// if (!formValues.natTraversalDisabled) {
    getIceServerConfigResponse.IceServerList.forEach(iceServer =>
        iceServers.push({
            urls: iceServer.Uris,
            username: iceServer.Username,
            credential: iceServer.Password,
        }),
    );
// }
console.log('[MASTER] ICE servers: ', iceServers);

const configuration = {
    iceServers,
    iceTransportPolicy:'all',
};

const resolution =  { width: { ideal: 640 }, height: { ideal: 480 } };
const constraints = {
    video:  resolution,
    audio: true,
};


  // Get a stream from the webcam and display it in the local view
  try {
    master.localStream = await navigator.mediaDevices.getUserMedia(constraints);
    localView.srcObject = master.localStream;
} catch (e) {
    console.error('[MASTER] Could not find webcam');
}

master.signalingClient.on('open', async () => {
    console.log('[MASTER] Connected to signaling service');
});

master.signalingClient.on('sdpOffer', async (offer, remoteClientId) => {
    console.log('[MASTER] Received SDP offer from client: ' + remoteClientId);

    // Create a new peer connection using the offer from the given client
    const peerConnection = new RTCPeerConnection(configuration);
    master.peerConnectionByClientId[remoteClientId] = peerConnection;

    // if (formValues.openDataChannel) {
        master.dataChannelByClientId[remoteClientId] = peerConnection.createDataChannel('kvsDataChannel');
        peerConnection.ondatachannel = event => {
            event.channel.onmessage = onRemoteDataMessage;
        };
    // }

    // Poll for connection stats
    if (!master.peerConnectionStatsInterval) {
        master.peerConnectionStatsInterval = setInterval(() => peerConnection.getStats().then(onStatsReport), 1000);
    }

    // Send any ICE candidates to the other peer
    peerConnection.addEventListener('icecandidate', ({ candidate }) => {
        if (candidate) {
            console.log('[MASTER] Generated ICE candidate for client: ' + remoteClientId);


                console.log('[MASTER] Sending ICE candidate to client: ' + remoteClientId);
                master.signalingClient.sendIceCandidate(candidate, remoteClientId);
            // }
        }
       
    });

    // As remote tracks are received, add them to the remote view
    peerConnection.addEventListener('track', event => {
        console.log('[MASTER] Received remote track from client: ' + remoteClientId);
        if (remoteView.srcObject) {
            return;
        }
        remoteView.srcObject = event.streams[0];
    });

    master.localStream.getTracks().forEach(track => peerConnection.addTrack(track, master.localStream));
    await peerConnection.setRemoteDescription(offer);

    // Create an SDP answer to send back to the client
    console.log('[MASTER] Creating SDP answer for client: ' + remoteClientId);
    await peerConnection.setLocalDescription(
        await peerConnection.createAnswer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
        }),
    );

    // When trickle ICE is enabled, send the answer now and then send ICE candidates as they are generated. Otherwise wait on the ICE candidates.
    // if (formValues.useTrickleICE) {
        console.log('[MASTER] Sending SDP answer to client: ' + remoteClientId);
        master.signalingClient.sendSdpAnswer(peerConnection.localDescription, remoteClientId);
    // }
    console.log('[MASTER] Generating ICE candidates for client: ' + remoteClientId);
});

master.signalingClient.on('iceCandidate', async (candidate, remoteClientId) => {
    console.log('[MASTER] Received ICE candidate from client: ' + remoteClientId);

    // Add the ICE candidate received from the client to the peer connection
    const peerConnection = master.peerConnectionByClientId[remoteClientId];
    peerConnection.addIceCandidate(candidate);
});

master.signalingClient.on('close', () => {
    console.log('[MASTER] Disconnected from signaling channel');
});

master.signalingClient.on('error', () => {
    console.error('[MASTER] Signaling client error');
});

console.log('[MASTER] Starting master connection');
master.signalingClient.open();


    }   
     

    async function startCustomer(onStatsReport, ) {

        const remoteMessage = document.getElementsByClassName('remote-message')[1] 

        const onRemoteDataMessage = event => {
            remoteMessage.append(`${event.data}\n`);
        }
        let localView = document.getElementsByClassName('local-view')[1]
        let remoteView = document.getElementsByClassName('remote-view')[1]
 
        viewer.localView = localView;
        viewer.remoteView = remoteView;
    
    

             const kinesisVideoClient = new KinesisVideo({
                 region,
                 accessKeyId,
                 secretAccessKey,
                 correctClockSkew: true,
             });
         // Get signaling channel ARN
         const describeSignalingChannelResponse = await kinesisVideoClient
             .describeSignalingChannel({
                 ChannelName: "VideoChat",
             })
             .promise();
         const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
         console.log('[viewer] Channel ARN: ', channelARN);
     
         const getSignalingChannelEndpointResponse = await kinesisVideoClient
         .getSignalingChannelEndpoint({
             ChannelARN: channelARN,
             SingleMasterChannelEndpointConfiguration: {
                 Protocols: ['WSS', 'HTTPS'],
                 Role: 'VIEWER',
             },
         })
         .promise();
     const endpointsByProtocol = getSignalingChannelEndpointResponse.ResourceEndpointList.reduce((endpoints, endpoint) => {
         endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
         return endpoints;
     }, {});
     console.log('[viewer] Endpoints: ', endpointsByProtocol);
     
        // Create Signaling Client
        viewer.signalingClient = new SignalingClient({
         channelARN,
         channelEndpoint: endpointsByProtocol.WSS,
         clientId: "TestUser",
         role: "VIEWER",
         region: region,
         credentials: {
             accessKeyId: accessKeyId,
             secretAccessKey: secretAccessKey,
             // sessionToken: formValues.sessionToken,
         },
         systemClockOffset: kinesisVideoClient.config.systemClockOffset,
     });
     
     
      // Get ICE server configuration
      const kinesisVideoSignalingChannelsClient = new KinesisVideoSignalingChannels({
         region: region,
         accessKeyId: accessKeyId,
         secretAccessKey: secretAccessKey,
         // sessionToken: formValues.sessionToken,
         endpoint: endpointsByProtocol.HTTPS,
         correctClockSkew: true,
     });
     const getIceServerConfigResponse = await kinesisVideoSignalingChannelsClient
         .getIceServerConfig({
             ChannelARN: channelARN,
         })
         .promise();
     const iceServers = [];
     // if (!formValues.natTraversalDisabled && !formValues.forceTURN) {
         iceServers.push({ urls: `stun:stun.kinesisvideo.${region}.amazonaws.com:443` });
     // }
     // if (!formValues.natTraversalDisabled) {
         getIceServerConfigResponse.IceServerList.forEach(iceServer =>
             iceServers.push({
                 urls: iceServer.Uris,
                 username: iceServer.Username,
                 credential: iceServer.Password,
             }),
         );
     // }
     console.log('[viewer] ICE servers: ', iceServers);
     
     const configuration = {
         iceServers,
         iceTransportPolicy:'all',
     };
     
     const resolution =  { width: { ideal: 640 }, height: { ideal: 480 } };
     const constraints = {
         video:  resolution,
         audio: true,
     };
 
    viewer.peerConnection = new RTCPeerConnection(configuration);
    // if (formValues.openDataChannel) {
        viewer.dataChannel = viewer.peerConnection.createDataChannel('kvsDataChannel');
        viewer.peerConnection.ondatachannel = event => {
            event.channel.onmessage = onRemoteDataMessage;
        };
    // }

    // Poll for connection stats
    viewer.peerConnectionStatsInterval = setInterval(() => viewer.peerConnection.getStats().then(onStatsReport), 1000);

    viewer.signalingClient.on('open', async () => {
        console.log('[VIEWER] Connected to signaling service');

        // Get a stream from the webcam, add it to the peer connection, and display it in the local view
        try {
            viewer.localStream = await navigator.mediaDevices.getUserMedia(constraints);
            viewer.localStream.getTracks().forEach(track => viewer.peerConnection.addTrack(track, viewer.localStream));
            localView.srcObject = viewer.localStream;
        } catch (e) {
            console.error('[VIEWER] Could not find webcam');
            return;
        }

        // Create an SDP offer to send to the master
        console.log('[VIEWER] Creating SDP offer');
        await viewer.peerConnection.setLocalDescription(
            await viewer.peerConnection.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            }),
        );

        // When trickle ICE is enabled, send the offer now and then send ICE candidates as they are generated. Otherwise wait on the ICE candidates.
        // if (formValues.useTrickleICE) {
            console.log('[VIEWER] Sending SDP offer');
            viewer.signalingClient.sendSdpOffer(viewer.peerConnection.localDescription);
        // }
        console.log('[VIEWER] Generating ICE candidates');
    });

    viewer.signalingClient.on('sdpAnswer', async answer => {
        // Add the SDP answer to the peer connection
        console.log('[VIEWER] Received SDP answer');
        await viewer.peerConnection.setRemoteDescription(answer);
    });

    viewer.signalingClient.on('iceCandidate', candidate => {
        // Add the ICE candidate received from the MASTER to the peer connection
        console.log('[VIEWER] Received ICE candidate');
        viewer.peerConnection.addIceCandidate(candidate);
    });

    viewer.signalingClient.on('close', () => {
        console.log('[VIEWER] Disconnected from signaling channel');
    });

    viewer.signalingClient.on('error', error => {
        console.error('[VIEWER] Signaling client error: ', error);
    });

    // Send any ICE candidates to the other peer
    viewer.peerConnection.addEventListener('icecandidate', ({ candidate }) => {
        if (candidate) {
            console.log('[VIEWER] Generated ICE candidate');

            // When trickle ICE is enabled, send the ICE candidates as they are generated.
            // if (formValues.useTrickleICE) {
                console.log('[VIEWER] Sending ICE candidate');
                viewer.signalingClient.sendIceCandidate(candidate);
            // }
        } 
        // else {
        //     console.log('[VIEWER] All ICE candidates have been generated');

        //     // When trickle ICE is disabled, send the offer now that all the ICE candidates have ben generated.
        //     if (!formValues.useTrickleICE) {
        //         console.log('[VIEWER] Sending SDP offer');
        //         viewer.signalingClient.sendSdpOffer(viewer.peerConnection.localDescription);
        //     }
        // }
    });

    // As remote tracks are received, add them to the remote view
    viewer.peerConnection.addEventListener('track', event => {
        console.log('[VIEWER] Received remote track');
        if (remoteView.srcObject) {
            return;
        }
        viewer.remoteStream = event.streams[0];
        remoteView.srcObject = viewer.remoteStream;
    });

    console.log('[VIEWER] Starting viewer connection');
    viewer.signalingClient.open();
     
            
    }

    function sendMasterMessage() {
        let message = document.getElementsByClassName('local-message')[0].value
        Object.keys(master.dataChannelByClientId).forEach(clientId => {
            try {
                master.dataChannelByClientId[clientId].send(message);
            } catch (e) {
                console.error('[MASTER] Send DataChannel: ', e.toString());
            }
        });
    }


function sendViewerMessage() {
    let message = document.getElementsByClassName('local-message')[1].value
    if (viewer.dataChannel) {
        try {
            viewer.dataChannel.send(message);
        } catch (e) {
            console.error('[VIEWER] Send DataChannel: ', e.toString());
        }
    }
}

  return (
      <>
<p>Video Chat</p>

<h2>Master</h2>

<h5>Master Section</h5>
<video className="local-view" autoplay playsinline controls muted />

<h5>Viewer Return Channel</h5>
<video className="remote-view" autoplay playsinline controls muted />
<div class="row datachannel">
                <div class="col">
                    <div class="form-group">
                      <textarea type="text" class="form-control local-message" placeholder="DataChannel Message"> </textarea>
                    </div>
                </div>
                <div class="col">
                    <div class="card bg-light mb-3">
                        <pre class="remote-message card-body text-monospace preserve-whitespace"></pre>
                    </div>
                </div>
            </div>
            <div>
                <span class="send-message datachannel">
                  <button type="button" class="btn btn-primary" onClick={sendMasterMessage}>Send DataChannel Message</button>
                </span>
                <button id="stop-master-button" type="button" class="btn btn-primary">Stop Master</button>
            </div>


<h2>Viewer</h2>
<h5>Return Channel</h5>
<video className="local-view" autoplay playsinline controls muted />
<h5>From Master</h5>
<video className="remote-view" autoplay playsinline controls muted />

       <div class="row datachannel">
                <div class="col">
                    <div class="form-group">
                      <textarea type="text" class="form-control local-message" placeholder="DataChannel Message"> </textarea>
                    </div>
                </div>
                <div class="col">
                    <div class="card bg-light mb-3">
                        <pre class="remote-message card-body text-monospace preserve-whitespace"></pre>
                    </div>
                </div>
            </div>
            <div>
                <span class="send-message datachannel" >
                  <button type="button" class="btn btn-primary" onClick={sendViewerMessage}>Send DataChannel Message</button>
                </span>
                <button id="stop-viewer-button" type="button" class="btn btn-primary">Stop Viewer</button>
            </div>

<button onClick={startAgent}>Start as Agent</button>
<button onClick={startCustomer}>Start as Customer</button>



</>
  );
}