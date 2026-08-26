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

==== //TODO: [hàm parseBracketQuery] ở utils/index.ts ===
sẽ biến req.query có dạng
{
status: 'active',
'price[gte]': '100',
'price[lte]': '500',
'category[in]': 'phone',
}
thành
{
status: 'active',

    price: {
        $gte: '100',
        $lte: '500',
    },

    category: {
        $in: ['phone'],
    },

}

flow chạy
query
↓
Tách từng cặp key / value bằng Object.entries()
↓
Key có dạng field[operator]?
├─ Không → acc[key] = value
└─ Có
↓
Lấy field và rawOperator từ regex
↓
Kiểm tra field / rawOperator có tồn tại
↓
Thêm "$" vào rawOperator
↓
Khởi tạo acc[field] nếu chưa có
↓
Operator thuộc nhóm cần mảng?
├─ Có, value chưa là mảng → [value]
└─ Không → giữ nguyên value
↓
acc[field][operator] = value
↓
Trả về parsedQuery
