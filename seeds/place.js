const mongoose = require("mongoose");
const Place = require("../models/place");

mongoose
  .connect("mongodb://127.0.0.1/bestpoints")
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

async function seedPlaces() {
  const places = [
    {
      title: "Taman Mini Indonesia Indah",
      price: "20000",
      description:
        "Taman hiburan keluarga dengan berbagai replika bangunan dari seluruh Indonesia",
      location: "Taman Mini Indonesia Indah, Jakarta",
      images: [
        {
          url: "public\\images\\image-1695135312611-365650630.jpg",
          filename: 'image-1695135312611-365650630.jpg'
        }
      ]
    },
    {
      title: "Pantai Kuta",
      price: "0",
      description:
        "Pantai yang terkenal di Bali dengan pemandangan sunset yang indah",
      location: "Pantai Kuta, Kuta, Badung Regency, Bali",
      images: [
        {
          url: "public\\images\\image-1695135264127-725748354.jpg",
          filename: 'image-1695135264127-725748354.jpg'
        }
      ]
    },
    {
      title: "Borobudur",
      price: "25000",
      description:
        "Candi Buddha terbesar di dunia yang terletak di Magelang, Jawa Tengah",
      location: "Borobudur, Magelang, Central Java",
      images: [
        {
          url: "public\\images\\image-1695160884104-47229790.jpg",
          filename: 'image-1695160884104-47229790.jpg'
        }
      ]
    },
    {
      title: 'Allianz Stadium',
      price: 250,
      description: 'A Stadium',
      location: 'Turin',      
      images: [
        {
          url: 'public\\images\\image-1695136333524-371344711.jpg',
          filename: 'image-1695136333524-371344711.jpg',
        },
        {
          url: 'public\\images\\image-1695136333518-23855553.png',
          filename: 'image-1695136333518-23855553.png',
        },
        {
          url: 'public\\images\\image-1695136333527-889545051.jpg',
          filename: 'image-1695136333527-889545051.jpg',          
        }
      ],
    },
  ];

  try {
    const newPlace = places.map((place) => {
      return { ...place, author: "65064f5669aa4c4a1c52eb2c"};
    });
    await Place.deleteMany({});
    await Place.insertMany(newPlace);
    console.log("Data berhasil disimpan");
  } catch (err) {
    console.log("Terjadi kesalahan saat menyimpan data:", err);
  } finally {
    mongoose.disconnect();
  }
}

seedPlaces();
