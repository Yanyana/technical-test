# Greetings
Dengan Hormat.
saya ucapkan terimakasih atas kesempatan yang telah diberikan oleh bapak/ibu untuk sampai tahap ini.
saya berharap tahap technical test yang saya kerjakan sesuai dengan yang bapak/ibu harapkan.
# Panduan
* [Mengunduh repository ke dalam komputer](https://github.com/Yanyana/technical-test/README#mengunduh-repository)
* [Technologi yang dipakai](https://github.com/datascienceid/README#technologi-yang-dipakai)
* [Configuration environment](https://github.com/datascienceid/README#configuration-environment)
* [Daftar API](https://github.com/datascienceid/README#daftar-api)

## Mengunduh Repository
Unduh repository ke dalam komputer menggunakan perintah `git clone`. Url
repository dapat dilihat di dalam repository yang diinginkan.

```
git clone https://github.com/Yanyana/technical-test.git
```

## Technologi yang dipakai
* nodejs express
* nodemailer untuk mengirim email
* mongoose sebagai penghubung antara NodeJS dan database nosql MongoDB
* redis sebagai message broker


## Configuration environment
```
PORT=<port backend>
MONGODB_URL=<alamat mongodb>
URL=<url yang dapat diakses saat production>
SMPT=<smpt server>
SMPTPORT=<smpt port default: 465>
USERMAIL=<email user yang ingin dipakai menjadi pengirim>
PASSMAIL=<password email>
REDIS_HOST=<alamat redis server ex:127.0.0.1>
REDIS_PORT=<port redis ex:6379>
```

## Daftar API
* METHOD GET All item
```
​http://localhost:3000/api/item
```

* METHOD GET one item
```
​http://localhost:3000/api/item/:hash
```

* METHOD POST item
```
​http://localhost:3000/api/item
```

body (JSON)
```
{
  "name": "sample item",
  "price": 10,
  "rating": "4",
  "hash": "randomString"
}
```

* METHOD PUT
```
​http://localhost:3000/api/item/:hash
```

body (JSON)
```
{
  "name": "sample item",
  "price": 10,
  "rating": "4"
}
```

* METHOD DELETE
```
​http://localhost:3000/api/item/:hash
```
