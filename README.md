1 Tạo dự án

- npm i -D typescript
- npx tsc --init
- npm i --save-dev typescript ts-node nodemon
- npm i --save-dev @types/node @types/express

Flow file serverHandle.ts

app.listen(4000)
↓
Có lỗi?
↓
onError()
↓
Có phải lỗi listen?
↓ ↓
Không Có
↓ ↓
throw kiểm tra code
↓
┌──────┴───────┐
↓ ↓
EACCES EADDRINUSE
↓ ↓
Không đủ quyền Port bị chiếm
↓ ↓
process.exit(1) process.exit(1)

yarn add helmet
yarn add cors

== Cài đặt database:
yarn add mongoose
