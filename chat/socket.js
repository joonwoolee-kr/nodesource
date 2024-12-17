// Socket.io 이용
// socket.io 모듈 불러오기
const SocketIO = require("socket.io");

module.exports = (server, app, sessionMiddleWare) => {
  // 익스프레스 서버와 소켓io 연동
  const io = SocketIO(server, { path: "/socket.io" });

  app.set("io", io);

  // 네임스페이스 부여: 같은 네임스페이스끼리만 데이터 교환
  const room = io.of("/room");
  const chat = io.of("/chat");

  // 이벤트 리스너 추가
  room.on("connection", (socket) => {
    console.log("room 네임 스페이스 접속");
    socket.on("disconnect", () => {
      console.log("room 네임 스페이스 접속 해제");
    });
  });

  chat.on("connection", (socket) => {
    // 소켓을 통해 클라이언트 요청 객체 접근
    console.log("chat 네임 스페이스 접속");

    // 클라이언트 ip 알아내기
    // const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    // console.log("새로운 클라이언트 접속 ", ip, socket.id, req.ip);

    // 클라이언트로부터 메세지가 도착하면 발생
    socket.on("join", (message) => {
      socket.join(message);
    });
    // 클라이언트와 연결이 종료된 경우
    socket.on("disconnect", () => {
      console.log("chat 네임 스페이스 접속 해제");
    });
  });
};
