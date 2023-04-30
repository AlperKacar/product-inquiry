import { useState, useEffect } from "react";
import "./app.css";
import Productlist from "./Productlist";

function App() {
  const [filtrele, setFiltrele] = useState("");
  const [price, setPrice] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [urun, setUrun] = useState([]);
  const [filtrelenenler, setFiltrelenenler] = useState(urun);
  const [inputValue, setInputValue] = useState("");

  //Api'nin sayfa yenilendiginde güncellenmesi sağlıyor.
  useEffect(() => {
    urunGetir();
  }, []);
  //ürünleri getiren api ve onu state içinde tutuyoruz.
  const urunGetir = async () => {
    const urunler = await fetch("https://fakestoreapi.com/products");
    const urunjson = await urunler.json();
    setUrun(urunjson);
  };
  // güncel tarih ayarı.
  const tarih = new Date().toJSON().slice(0, 10);
  // Search kısmında arama yapmamızı saglar.
  const inputChange = (event) => {
    const inputValue = event.target.value;
    const filtrele = urun.filter((urun) =>
      urun.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFiltrele(inputValue);
    setFiltrelenenler(filtrele);
  };
  // buton uzunlugu ve görünürlügü.
  useEffect(() => {
    if (inputValue.length < 12) {
      setIsButtonDisabled(false);
      setPrice(true);
    } else {
      setIsButtonDisabled(true);
    }
  }, [inputValue]);
  const calculatePromoCode = () => {
    const year = inputValue.slice(0, 4); // İlk 4 haneyi al
    const x = 2023 - year;
    let E = 0,
      F = 0,
      G = 0,
      H = 0;
    const lastFourDigits = inputValue.substring(inputValue.length - 4); // son 4 hanesi al
    for (let i = 0; i < lastFourDigits.length; i++) {
      switch (i) {
        case 0:
          E = lastFourDigits.charAt(i);
          break;
        case 1:
          F = lastFourDigits.charAt(i);
          break;
        case 2:
          G = lastFourDigits.charAt(i);
          break;
        case 3:
          H = lastFourDigits.charAt(i);
          break;
      }
    }

    const promosyon =
      (E * Math.pow(x, 3) +
        F * Math.pow(x, 2) +
        G * Math.pow(x, 1) +
        H * Math.pow(x, 0)) /
      Math.pow(x, 4);
    return promosyon;
  };

  return (
    <div className="App">
      <div className="searchdiv">
        <input
          className="input"
          type="text"
          onChange={inputChange}
          value={filtrele}
          placeholder="Aramak için bir isim girin."
        />
        <input
          type="text"
          className="input"
          value={inputValue}
          placeholder="Promosyon Kodunu giriniz."
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="button"
          disabled={!isButtonDisabled}
          onClick={() => setPrice(!price)}
        >
          İndirim
        </button>
      </div>
      <div className="container">
        {/* Urunleri ana sayfada gösterme. */}
        {filtrelenenler.map((urun, index) => (
          <Productlist
            urun={urun}
            key={index}
            price={price}
            calculatePromoCode={calculatePromoCode}
          />
        ))}
      </div>
      <h3>Bu Sorgu {tarih} tarihinde yapıldı.</h3>
    </div>
  );
}

export default App;
