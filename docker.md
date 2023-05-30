# docker logs ID - view logs
# docker exec -it ID bash - bash shell
* psql -U postgres -W platformdb
```js
/*
psql là một trình quản lý cơ sở dữ liệu Postgres, cho phép bạn tương tác với các cơ sở dữ liệu Postgres thông qua dòng lệnh.
Trong câu lệnh psql -U postgres -W platformdb, các tham số được sử dụng như sau:

psql: Là tên của chương trình trình quản lý cơ sở dữ liệu Postgres.
-U postgres: Tham số này chỉ định tên người dùng (user) để đăng nhập vào cơ sở dữ liệu Postgres. Trong trường hợp này, postgres là tên người dùng được sử dụng để đăng nhập.
-W: Tham số này yêu cầu trình quản lý cơ sở dữ liệu Postgres yêu cầu mật khẩu của người dùng để đăng nhập vào cơ sở dữ liệu.
platformdb: Là tên của cơ sở dữ liệu (database) mà bạn muốn kết nối và tương tác với.
*/
```
* \dt
```js
/*
\dt là một lệnh trong PostgreSQL command-line interface (CLI), được sử dụng để liệt kê các bảng (tables) trong cơ sở dữ liệu hiện tại.

Khi nhập lệnh \dt trong CLI của PostgreSQL và nhấn enter, PostgreSQL sẽ truy vấn cơ sở dữ liệu và trả về danh sách các bảng trong cơ sở dữ liệu hiện tại. Danh sách này bao gồm tên bảng, loại bảng (table hoặc view) và chủ sở hữu của bảng.
*/
```

* SELECT * FROM "notes";
