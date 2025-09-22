from fastapi import WebSocket, WebSocketDisconnect


async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("WebSocket: connection established")
    try:
        while True:
            data = await websocket.receive_text()
            print(f"WebSocket: received -> {data}")
            if data == 'ping':
                await websocket.send_text('pong')
                print("WebSocket: sent -> pong")
            else:
                resp = f'echo: {data}'
                await websocket.send_text(resp)
                print(f"WebSocket: sent -> {resp}")
    except WebSocketDisconnect:
        print("WebSocket: client disconnected")
    except Exception as e:
        print(f"WebSocket: error -> {e}")
    finally:
        print("WebSocket: handler exiting")
