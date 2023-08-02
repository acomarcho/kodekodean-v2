# Video

<iframe width="100%" height="315" src="https://www.youtube.com/embed/_ctbfHbS5BM" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# Teks

Untuk menampilkan pesan pada layar, Anda bisa menggunakan perintah `print` sesuai dengan sintaks berikut.

Pada blok kode di bawah, barisan yang dimulai dengan `#` kita sebut sebagai komen. Baris ini tidak dianggap sebagai bagian dari kode program yang dijalankan, melainkan sebagai dokumentasi saja bagi penulis/yang akan membaca kode.

```py
# Menggunakan petik dua
print("Halo, aku adalah sebuah pesan yang diapit oleh dua buah petik dua")

# Menggunakan petik satu
print('Halo, aku adalah sebuah pesan yang diapit oleh dua buah petik satu')
```

Hati-hati dengan penggunaan petik! Jangan membuat suatu pesan yang diawali dengan petik dua namun diakhiri dengan petik satu dan sebaliknya, contoh:

```py
# Baris di bawah ini akan gagal untuk dijalankan
print("Halo, ini adalah contoh penulisan yang salah')
```

## Menampilkan pesan lebih dari satu baris

Misalkan, Anda memiliki puisi yang ingin Anda tampilkan pada layar yang terdiri lebih dari satu baris, contoh:

```
At kodekodean.id,
A Python course awaits,
Learn coding with ease,
Unlock your coding traits.
```

_Totally not made in ChatGPT_

Salah satu alternatif yang bisa dilakukan adalah melakukan perintah `print` sebanyak empat kali,

```py
print("At kodekodean.id,")
print("A Python course awaits,")
print("Learn coding with ease,")
print("Unlock your coding traits.")
```

Namun, ada pendekatan lain yang lebih mudah. Anda bisa menggunakan tanda `"` atau `'` sebanyak tiga kali untuk membuat suatu **multi line string**, contoh:

```py
# Menggunakan tanda "
print("""At kodekodean.id,
A Python course awaits,
Learn coding with ease,
Unlock your coding traits.""")

# Menggunakan tanda '
print('''At kodekodean.id,
A Python course awaits,
Learn coding with ease,
Unlock your coding traits.''')
```

## Menampilkan pesan pada baris yang sama

By default, dengan menggunakan perintah `print`, pesan baru yang dikirim akan muncul di baris baru, contoh:

```py
print("A")
print("B")
```

Akan menghasilkan output

```
A
B
```

Bagaimana jika kita ingin mengeluarkan output dalam baris yang sama seperti yang ditunjukan blok kode di bawah?

```
AB
```

Untuk melakukannya, Anda bisa menambahkan argumen tambahan ke dalam fungsi print yaitu `end`, untuk contoh penulisannya silakan lihat contoh di bawah:

```py
print("A", end="")
print("B")

# Output:
# AB
```

Argumen `end=""` memberi tahu Python bahwa setelah mengeluarkan A ke layar, akhiri pesan tersebut dengan `""` , yaitu sebuah pesan kosong. Hal ini menghilangkan default behaviour berupa mengakhiri suatu pesan dengan baris baru.

Sebagai contoh lain, Anda bisa mengganti nilai dari parameter `end` sesuai dengan keinginan Anda:

```py
print("A", end=">><<")
print("B")

# Output:
# A>><<B
```
