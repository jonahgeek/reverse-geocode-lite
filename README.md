# 🌍 reverse-geocode-lite

> Lightweight, TypeScript-based reverse geocoder using OpenStreetMap's Nominatim API.

Convert latitude and longitude into a human-readable address — with minimal setup, zero dependencies on Google Maps, and full open-source freedom.

---

## 🚀 Features

- 🌐 Uses free [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/)
- 📦 Lightweight and dependency-free (except `node-fetch`)
- 🔒 Type-safe (written in TypeScript)
- ✅ Tested with Jest
- 💥 ESM-compatible

---

## 📦 Installation

```bash
npm install reverse-geocode-lite
```

or with yarn:

```bash
yarn add reverse-geocode-lite
```

---

## 🔧 Usage

### TypeScript / ES Modules

```ts
import { reverseGeocode } from 'reverse-geocode-lite';

const getAddress = async () => {
  const address = await reverseGeocode(48.8584, 2.2945); // Eiffel Tower
  console.log(address);
};

getAddress();
```

### Node.js (CJS)

```js
const { reverseGeocode } = require('reverse-geocode-lite');

reverseGeocode(40.7128, -74.006).then(console.log); // New York
```

---

## 📘 API

### `reverseGeocode(lat: number, lng: number): Promise<string | null>`

| Param | Type     | Description                  |
|-------|----------|------------------------------|
| lat   | `number` | Latitude                     |
| lng   | `number` | Longitude                    |

Returns a human-readable address (`string`), or `null` if not found or if an error occurred.

---

## 🧪 Testing

Run unit tests using:

```bash
npm test
```

Includes mocked responses for:
- Successful address lookup
- No address found
- Network failure
- Server errors

---

## ⚠️ Notes

- This package uses the **public OpenStreetMap Nominatim API**, which has strict [usage policies](https://operations.osmfoundation.org/policies/nominatim/).
- You **must** include a valid `User-Agent` header in production requests, or risk getting blocked.

---

## 📄 License

MIT © [Jonathan Mwebaze](https://ashitacreatives.com)

---

## 🙌 Contributing

1. Fork this repo
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

---

## 🧠 Acknowledgments

- Built on [OpenStreetMap](https://www.openstreetmap.org/)
- Powered by [Nominatim](https://nominatim.org/)