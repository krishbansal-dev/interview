1) 3 Servers owned, 4 Cores, 24 GB Ram 200 Gb Block Storage each \- Oracle free Tier \+ Locally hosted mini pc with ipv6 access connected to a router with ddns setup via cloudflare domain  
2) Own and Manage over 7 Domains  
3) Own 2 SaaS apps  
4) Projects:

   Employee Tracking SaaS

1) It is a SaaS model made for Retailers to facilitate Salesman Tracking, so that Salesman can be precisely tracked, their Active location is uploaded on a Postgres Database, the app itself is made, here is a project Architecture:

# SalesForce Tracking System — Resume Project Guide

This guide compiles the technical details, architecture, and accomplishments of your **SalesForce Tracking System** project into a structured format that you can directly adapt for your college application resume and portfolio.  
---

## Project Overview (Elevator Pitch)

A real-time, enterprise-grade SalesForce and field-agent tracking platform comprising a **React Native (Expo) mobile application**, a **Vite/React administrator dashboard**, and a **Node.js (TypeScript) REST API backend**. The system coordinates real-time location streaming, handles offline coordinate buffering, displays agents and shops on high-performance maps, and uses geographic database queries (GIS) for location verification.  
---

## High-Level Architecture & Tech Stack

                                 \[ Vite/React Admin Dashboard \]  
                                  (Tailwind, Leaflet.js Maps)  
                                               ^  
                                               | Real-time WebSockets  
                                               v  
   \[ React Native / Expo App \] \<=======\> \[ Node.js Express API \] \<=======\> \[ PostgreSQL / PostGIS \]  
     (SQLite Cache, Leaflet)    REST API     (TypeScript, Docker)                (GIS Spatial DB)  
                                                       ^  
                                                       | Cache last-known  
                                                       v  
                                                 \[ Redis Cache \]

### 1\. Mobile Client (React Native & Expo)

* **Cross-Platform Shell**: Built with React Native and Expo (TypeScript) to compile native Android/iOS bundles.  
* **Hybrid Mapping Layer**: Embeds a Leaflet.js WebView engine styled with CartoDB Voyager tiles. It features smooth SVG drop-pin markers for stores, custom layout text labels for shops, and hardware-accelerated CSS keyframe animations for the user's real-time pulsing GPS marker.  
* **Location Processing**: Uses expo-location to tap into the device's native GPS/Fused Location provider. Coordinates are passed securely into the sandboxed WebView DOM via bidirectional JavaScript bridge events, overcoming native Android geolocation permission limitations inside WebViews.  
* **Offline Resiliency**: Features a synchronization engine with a local SQLite queue that buffers coordinate logs during network drops and automatically syncs them when connectivity is restored.

### 2\. Central API Backend (Node.js & TypeScript)

* **Core Application**: High-performance RESTful API written in Node.js, Express, and TypeScript, configured with strict typings and modular controller/service layers.  
* **Database & ORM**: PostgreSQL database integrated with **PostGIS** (the Postgres spatial extension) for geometric data models (Point, Polygon) and geofencing. Connected via **Prisma ORM** for type-safe database queries.  
* **In-Memory Cache**: **Redis** caching to hold agents' active sessions and last known locations, minimizing database read overhead during high-frequency location updates.  
* **Media Management**: Secure API routes for handling check-in attachments (e.g. store front selfies or odometer capture photos) with path verification and reverse proxy routing.

### 3\. Web Admin Dashboard (Vite & React)

* **Real-time Map Visuals**: Custom Leaflet.js-based mapping system rendering live agent locations, paths, and customer geofences without high Google Maps licensing costs.  
* **State Management**: Built on React 18, Vite, and Tailwind CSS for rapid build compilation, responsive CSS Grid/Flexbox layouts, and instant UI state rendering.

### 4\. Infrastructure & DevOps

* **Containerization**: Configured with Docker and multi-container Docker Compose files (db, redis, api, web) for consistent development and production parity.  
* **CI/CD Pipeline**: GitHub Actions workflow that automatically SSHs into a VPS server on push, executes git pull, pulls remote container images, builds custom Docker images, restarts services gracefully, and automatically prunes dangling images to optimize disk space.

---

## Core Technical Challenges Solved

### A. WebView Geolocation Bridge (Android WebView Workaround)

* **Problem**: Android's Chromium-based WebView blocks the browser navigator.geolocation API by default without complex native Gradle configurations, preventing the Leaflet map from locating the agent.  
* **Solution**: Developed a hybrid bridge where the React Native host uses expo-location to fetch highly accurate GPS coordinates natively, then injects them directly into the WebView's Leaflet runtime using WebView message passing.

### B. High-Performance CSS Animations on WebView Maps

* **Problem**: Native Leaflet markers with heavy GIF/PNG sprites or multiple absolute-positioned SVGs caused map panning lag on budget Android devices.  
* **Solution**: Engineered a lightweight SVG marker combining CSS scale and pulse animations utilizing the GPU-accelerated transform property rather than layout-triggering properties, maintaining 60 FPS map panning.

---

## Resume Bullet Points (Ready to Copy/Paste)

### **Experience / Projects Section**

**Lead Software Engineer — Real-Time SalesForce Tracking System**

* **Architected a three-tier tracking ecosystem** comprising a React Native mobile app, a React/Vite admin dashboard, and a Dockerized Node.js API to coordinate live location logging and shop geofencing for field agents.  
* **Implemented spatial database queries** using PostgreSQL and PostGIS to run real-time geofencing calculations, verifying agent presence within 50 meters of target store fronts during check-ins.  
* **Optimized mobile map performance** by building a custom Leaflet.js map engine inside a React Native WebView, utilizing CSS GPU acceleration to run fluid pulse animations and rendering store markers at 60 FPS.  
* **Engineered a hybrid Javascript Bridge** between native React Native modules (expo-location) and a sandboxed WebView Leaflet container, resolving WebView-specific permission bugs on Android devices.  
* **Developed an offline-first sync engine** using a local SQLite buffer on the mobile client, ensuring data integrity by caching coordinate logs during network dropouts and batch-uploading them on reconnection.  
* **Designed a fully automated CI/CD pipeline** via GitHub Actions, configuring secure SSH deployment to a VPS utilizing Docker Compose for container isolation and automated resource cleanup.

I also have a portfolio website \- krishbansal.dev \- a shell themed website outlining my projects and education

My Social Links:  
LinkedIN: [https://www.linkedin.com/in/krishbansal-dev/](https://www.linkedin.com/in/krishbansal-dev/)  
Github: [https://github.com/krishbansal-dev](https://github.com/krishbansal-dev)  
Contact Email: [contact@krishbansal.dev](mailto:contact@krishbansal.dev)

Another Major Project:  
PeerDrop: A p2p file sharing/calling service, anyone can visit it on peerdrop.krishbansal.dev, it has parallel channel implementation to bypass the inherent handicap of a webrtc based channel  
This website utilized webrtc to establish a p2p channel between peers, the server relays absolutely no data, the backend consists of just a relay service which assigns ephemeral codes to all its visitors and they can be used to connect to each other for file sharing and other purposes

Own Understanding and Emphasis (Everything i made is AI Generated, so ofcourse, i can talk a lot about things on the service but not precisely on its core code, i can make production ready systems but since it is AI Generated so i may have difficulty explaining things, so here i am talking about all the things i have explored in the tech field)

1) SSH: i use it actively to manage my servers, i love ubuntu servers and have a good understanding of linux cli  
2) Docker: I love dockerizing all my programs before i deploy them, this increases  the scalability, follows professional standards, increases my skills and proves really useful  
3) Self Hosting: I have Self Hosted many popular Services such as N8N for automation, Portainer for a quick look on my containers, i use Netbird actively to access my servers and devices, NPM (nginx proxy manager) for reverse proxy to expose my services to WAN  
4) Cloudflare: I actively use Cloudflare, i manage all my domains via it, use its email forwarding feature, use the tunnels to host the websites in environment where it is difficult to get a public ip, i also use its API to facilitate dynamic ipv6 for my self hosted bare metal server, i also use Cloudflare Pages to host the frontend of my sites, that makes them blazingly fast, krishbansal.dev which i mentioned, is hosted on the same\!  
5) Serverless Architecture: I understand Serverless Architecture quite well, we dont need to setup our server for everything we need, Serverless isnt inherently Serverless Hosting, but it does prove Scalable and easier to deploy, cloudflare pages is a good example of the same  
6) Git & Github: I have multiple Projects on Gihub, i actively use git in my projects, i have a good understanding of PR, Commit, Push, Remotes etc, i have also worked with github actions for a full CI/CD pipeline as i will talk about later  
7) CI/CD: I have also made a basic CI/CD pipeline, it essentially works by utilizing cloudflare pages as the frontend and github actions to update the frontend whenever i push the code to github  
8) Zero Trust: I mentioned Netbird, i actively use it among all my PCs and Servers to Create a private mesh to support interconnectability  
9) Rest APIs: I have a good understanding of what APIs are and how they are used, i have worked with both GET and POST APIs, especially within N8N,   
10) AI \- This is a major one i want to strongly put an emphasis on: I Actively use AI for everything i do, i can understand syntax of languages and understand basic code flawlessly, i have worked with HTML, CSS, JS, Python, however i use AI to make all my production apps, one might assume that as an amatuer approach of just prompting the AI once to make something, but i work much deeper than that, the main difference is that i know what i am doing when i use AI, many people write code but they dont even know how are they supposed to host it or expose it to the internet, how will it be even used, but i have a good understanding of how everything works, a good understanding of the world’s digital ecosystem, before making something, i go into a full architecture planning process, i decide which languages to use, how will i host it, which technologies to use etc, i am looking forward to learning the languages during my university time, i am not undermining the importance of learning them, but i cant build major projects in a short time if i were to code them myself, so i will be achieving that deep understanding through my college time, with AI, i believe i can do anything, make any app, host it, make it production ready, MAKE IT FROM SCRATCH and SHIP IT AWAY,   
11) Academics: as you may have seen, i know my academics arent great, i am really bad at chemistry, a lot has happened in our year, from NEET LEEK to Boards OSM checking, i am a JEE student, i am week in chemistry because that was never my interest, Physics intrigues me to an extent, i am ok with working with maths its not a weak forte for me as you can see from my 90+ percentile in JEE, there is only one thing i ask, Indian Education system is not made to fit what i want to be, so i shall not be judged based on its Benchmarks  
12) Co-Curriculars: Even though some of these things are seen negatively, i wished to give you a full description of things that i like. And they play a big part in what i am, That includes my Developer Live Majorly, then Games, Anime and Chess, that is my life,   
    A Fact of my life: i arranged the first server of my life, used ssh on it, just to install a minecraft server as that was a long lived desire i had, that server played a big role in who i am today, that was probably a major turning point in my life

P2p server Architecture: 

# Resume Entry (Bullet Points)

**PeerDrop — High-Performance, Encrypted P2P File Sharing & Video Platform**

* **Technologies**: React.js, Node.js, WebRTC, WebSockets (ws), Docker, Tailwind CSS, Cloudflare, STUN/TURN (Coturn)  
* Architected and deployed a decentralized, serverless-first web application enabling end-to-end encrypted peer-to-peer file transfers and real-time video conferencing directly in the browser.  
* Implemented a secure, real-time **WebSocket signaling server** in Node.js to coordinate AnyDesk-style room code generation, SDP exchanges, and ICE candidate forwarding.  
* Designed a custom **File Transfer Engine** utilizing HTML5 File Reader and WritableStream APIs to segment large files into 64KB chunks, transferring them securely over SCTP datachannels to bypass cloud storage bandwidth overhead.  
* Resolved WebRTC SDP renegotiation glitches (InvalidAccessError) by **pre-allocating static RTCRtpTransceiver slots** for audio and video, allowing dynamic media track swapping via replaceTrack without altering session descriptions.  
* Hardened platform security by configuring IP-based rate limiting on WebSockets, deploying **Coturn STUN/TURN** servers for strict NAT traversal, and containerizing the backend for automated CI/CD deployment via GitHub Actions.

---

# Portfolio & Essay Write-Up (Technical Deep-Dive)

This section can be used in your portfolio website, college essays, or application projects to describe the technical architecture in detail.

## 1\. Project Overview

**PeerDrop** is a privacy-first, zero-knowledge peer-to-peer (P2P) file sharing and video call application. Traditional platforms (like WeTransfer or Google Drive) require files to be uploaded to a third-party cloud server, which creates storage costs, bandwidth bottlenecks, and privacy risks. PeerDrop solves this by establishing a direct, secure connection between two browsers using WebRTC. Once connected, data flows directly between the peers, encrypted end-to-end, meaning the server never sees the files or video feeds.  
---

## 2\. System Architecture & Component Flow

                          ┌─────────────────────────────────┐  
                          │          CDN / STATIC HOST       │  
                          │         (Cloudflare Pages)      │  
                          │   Serves: Static React Assets   │  
                          └──────────┬──────────────────────┘  
                                      │ HTTPS  
                                      ▼  
┌──────────────┐           ┌─────────────────────────────────┐           ┌──────────────┐  
│              │           │       SIGNALING SERVER           │           │              │  
│   PEER A     │◄─── WSS ─┤    (Node.js \+ WebSocket)         │─── WSS ──►│   PEER B     │  
│  (Browser)   │           │   • Room code allocation        │           │  (Browser)   │  
│              │           │   • SDP metadata relay          │           │              │  
│  • React UI  │           │   • ICE candidate relay         │           │  • React UI  │  
│  • WebRTC    │           └──────────┬──────────────────────┘           │  • WebRTC    │  
│  • File API  │                      │                                  │  • File API  │  
└──────┬───────┘            ┌─────────┴─────────┐                        └──────┬───────┘  
      │                    │                   │                               │  
      │              ┌─────▼─────┐      ┌──────▼──────┐                        │  
      │              │   STUN    │      │    TURN     │                        │  
      │              │  Server   │      │   Server    │                        │  
      │              │(coturn)   │      │  (coturn)   │                        │  
      │              │           │      │             │                        │  
      │              │ Discovers │      │ Relays enc. │                        │  
      │              │ public IP │      │ traffic if  │                        │  
      │              └───────────┘      │ P2P fails   │                        │  
      │                                 └─────────────┘                        │  
      │                                                                        │  
      │              ══════════════════════════════════                        │  
      └─────────────► DIRECT P2P (WebRTC DataChannel) ◄────────────────────────┘  
                      DTLS Encrypted | SCTP Transport  
                      Files, Video, Audio, Chat  
                     ══════════════════════════════════

1. **Static Delivery**: The React frontend is deployed as a Single Page Application (SPA) on Cloudflare Pages.  
2. **Room Allocation**: The initiator connects to the Node.js signaling server over a secure WebSocket (wss://) and receives a random 6-character room code (e.g., B9K7XP).  
3. **Signaling (The Handshake)**: When the receiver enters the code, the signaling server routes the Session Description Protocol (SDP) "offer" and "answer" between the browsers.  
4. **NAT Traversal (STUN/TURN)**: The browsers query STUN servers to discover their public IP addresses. If both peers are behind symmetric NATs or strict corporate firewalls, the self-hosted **Coturn TURN** server acts as a fallback relay to proxy the encrypted data.  
5. **Direct Transfer**: Once the handshake completes, the WebSocket connection goes idle, and data is transferred directly between the browsers using DTLS-encrypted SCTP channels for files/chat and SRTP for video/audio.

---

## 3\. Core Engineering Challenges & Solutions

### Challenge A: The SDP renegotiation race condition (InvalidAccessError)

* **Problem**: In WebRTC, dynamically toggling media tracks (e.g., muting a microphone, switching off a camera, or initiating a screen share) triggers negotiationneeded events. This causes the browser to attempt to renegotiate the connection. If one peer tries to apply a new SDP offer while the other is in the middle of sending one, the session description schemas conflict, resulting in a browser crash: Failed to set local offer sdp: The order of m-lines in subsequent offer doesn't match...  
* **Solution**: I restructured the connection engine to **pre-allocate transceivers** (RTCRtpTransceiver) for both audio and video immediately when initializing the RTCPeerConnection. This guarantees a stable, unchangeable order of media lines (m-lines) in the SDP. Instead of adding/removing tracks dynamically (which triggers renegotiation), the tracks are swapped using transceiver.sender.replaceTrack(newTrack). This allows instant cam/mic toggles and screen sharing with **zero renegotiation overhead and no connection dropouts**.

### Challenge B: Stuck on Connection (Asymmetric Device Permission Handshakes)

* **Problem**: When a user joined a room with their camera or microphone disabled by default, the connection would hang on "Establishing WebRTC connection..." because the code relied on pc.ontrack (which only fires if media tracks are sent) to transition UI state.  
* **Solution**: I decoupled UI state transition from track reception. I implemented listeners for the RTCPeerConnection.connectionState (listening for connected) and the RTCDataChannel.onopen events. The connection now transitions to the call layout instantly upon a successful network handshake, even if the user has denied camera/mic permissions, letting them enable media later.

### Challenge C: High-Performance File Chunking and Backpressure

* **Problem**: Transferring multi-gigabyte files in the browser easily overflows the browser's memory, causing the tab to crash.  
* **Solution**: The file transfer engine segments files into **64KB binary chunks** (the optimal size for SCTP packets). It reads files incrementally using the HTML5 FileReader API and writes them directly to disk on the receiving end using the FileSystemAccess / WritableStream API, bypassing system RAM memory constraints. It monitors the data channel's bufferedAmount to adjust the transfer speed dynamically (implementing backpressure control) so that fast senders do not overwhelm slow receivers.

1:28 AM

