# Video

<iframe width="100%" height="315" src="https://www.youtube.com/embed/_ctbfHbS5BM" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# Teks

## Perintah input

Untuk menerima pesan dari pengguna, Anda bisa menggunakan perintah `input`.

Contoh penggunaan paling sederhana:

```py
print(input())

# Coba ketik sesuatu pada terminal Anda lalu tekan enter!
```

Namun, umumnya perintah `input` ini nilainya dipasang ke sebuah variabel agar kode lebih mudah dibaca. Bandingkan blok kode di atas dengan blok kode di bawah ini:

```py
input_pengguna = input()
print(input_pengguna)
```

Lebih jelas, bukan?

## Menampilkan teks saat meminta input

Menjalankan kode di atas, pengguna mungkin kebingungan karena tidak ada perintah yang menjelaskan bahwa ia harus memasukkan sesuatu kepada layar.

Anda bisa memasukkan pesan tambahan saat meminta input dari pengguna menggunakan sintaks seperti di bawah:

```py
nama = input("Masukkan nama Anda: ")
print(f"Nama Anda adalah {nama}!})

# Contoh penjalanan program:
# Masukkan nama Anda: __Aether__
# Nama Anda adalah Aether!
```
