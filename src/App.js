import React, { useEffect, useState, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './responsive.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/Home/index';
import Listing from './pages/Listing';
import NotFound from './pages/NotFound';
import DetailsPage from './pages/Details';

import axios from 'axios';
import Cart from './pages/cart';
import Loader from './assets/images/loading.gif';

import data from './data';

const MyContext = createContext();

function App() {

  const [productData, setProductData] = useState([]);
  const [cartItems, setCartItems] = useState([
    {
      "productName": "Good Life Whole Moong 500 g",
      "price": "20",
      "oldPrice": "140",
      "weight": [
        50,
        100,
        150,
        200,
        250,
        500
      ],
      "catImg": "https://www.jiomart.com/images/product/original/491187309/good-life-whole-moong-500-g-product-images-o491187309-p491187309-0-202308311426.jpg",
      "discount": "12",
      "brand": "AASHIRVAAD",
      "productImages": [
        "https://www.jiomart.com/images/product/original/491187309/good-life-whole-moong-500-g-product-images-o491187309-p491187309-0-202308311426.jpg",
        "https://www.jiomart.com/images/product/original/491187309/good-life-whole-moong-500-g-product-images-o491187309-p491187309-1-202308311426.jpg",
        "https://www.jiomart.com/images/product/original/491187309/good-life-whole-moong-500-g-product-images-o491187309-p491187309-2-202308311426.jpg",
        "https://www.jiomart.com/images/product/original/491187309/good-life-whole-moong-500-g-product-images-o491187309-p491187309-3-202308311426.jpg",
        "https://www.jiomart.com/images/product/original/491187309/good-life-whole-moong-500-g-product-images-o491187309-p491187309-4-202308311426.jpg",
        "https://www.jiomart.com/images/product/original/491187309/good-life-whole-moong-500-g-legal-images-o491187309-p491187309-5-202308311427.jpg"
      ],
      "rating": 3.5,
      "description": "Good Life Whole Moong is one of the light meal to digest. It is often given to people who prefer diet for fitness. It contains antioxidants which are very healthy for the good functioning of the human body. It can be included in our daily diet as it can fulfil the nutritional and dietary requirements of an entire meal. Buy Good Life Whole Moong online now!",
      "id": 1
    },
    {
      "productName": "Moong Dal 2 kg",
      "price": "246",
      "oldPrice": "320",
      "weight": [
        50,
        100,
        150,
        200,
        250,
        500
      ],
      "catImg": "https://www.jiomart.com/images/product/original/491432711/moong-dal-2-kg-product-images-o491432711-p491432711-0-202205191636.jpg",
      "discount": "16",
      "brand": "Private Label",
      "productImages": [
        "https://www.jiomart.com/images/product/original/491432711/moong-dal-2-kg-product-images-o491432711-p491432711-0-202205191636.jpg",
        "https://www.jiomart.com/images/product/original/491432711/moong-dal-2-kg-product-images-o491432711-p491432711-1-202205191636.jpg",
        "https://www.jiomart.com/images/product/original/491432711/moong-dal-2-kg-legal-images-o491432711-p491432711-3-202205191636.jpg"
      ],
      "rating": 4,
      "description": "Moong Dal is essentially packed with loads of nutrients that are extremely beneficial for your health. Moong contains almost every important element that your body might need. Buy Moong Dal online today.",
      "id": 2
    },
    {
      "productName": "Good Life Raw Peanuts 500 g",
      "price": "89",
      "oldPrice": "150",
      "weight": [
        50,
        100,
        150,
        200,
        250,
        500
      ],
      "catImg": "https://www.jiomart.com/images/product/original/491278616/good-life-raw-peanuts-500-g-product-images-o491278616-p491278616-0-202306102242.jpg",
      "discount": "16",
      "brand": "Good Life",
      "productImages": [
        "https://www.jiomart.com/images/product/original/491278616/good-life-raw-peanuts-500-g-product-images-o491278616-p491278616-0-202306102242.jpg",
        "https://www.jiomart.com/images/product/original/491278616/good-life-raw-peanuts-500-g-product-images-o491278616-p491278616-2-202306102242.jpg",
        "https://www.jiomart.com/images/product/original/491278616/good-life-raw-peanuts-500-g-product-images-o491278616-p491278616-3-202306102243.jpg",
        "https://www.jiomart.com/images/product/original/491278616/good-life-raw-peanuts-500-g-product-images-o491278616-p491278616-4-202306102243.jpg",
        "https://www.jiomart.com/images/product/original/491278616/good-life-raw-peanuts-500-g-product-images-o491278616-p491278616-5-202306102243.jpg"
      ],
      "rating": 3.5,
      "description": "Good Life Raw Peanuts is a healthy snack and the right choice for you. You can easily roast them at home. They are loaded with the goodness of health and taste. Peanut butter made with Peanuts clearly works well in sweet dishes, like cookies and brownies, which is why it pairs well with other sweeter foods like sweet potato. Buy Good Life Raw Peanuts online now!",
      "id": 3
    },
    {
      "productName": "Tata Sampann Unpolished Chilka Moong 500 g",
      "price": "74",
      "oldPrice": "95",
      "weight": [
        50,
        100,
        150,
        200,
        250,
        500
      ],
      "catImg": "https://www.jiomart.com/images/product/original/490830947/tata-sampann-high-protein-unpolished-chilka-moong-500-g-product-images-o490830947-p490830947-0-202203150526.jpg",
      "discount": "18",
      "brand": "Tata Sampann",
      "productImages": [
        "https://www.jiomart.com/images/product/original/490830947/tata-sampann-high-protein-unpolished-chilka-moong-500-g-product-images-o490830947-p490830947-0-202203150526.jpg",
        "https://www.jiomart.com/images/product/original/490830947/tata-sampann-high-protein-unpolished-chilka-moong-500-g-product-images-o490830947-p490830947-1-202203150526.jpg",
        "https://www.jiomart.com/images/product/original/490830947/tata-sampann-high-protein-unpolished-chilka-moong-500-g-legal-images-o490830947-p490830947-2-202203150526.jpg",
        "https://www.jiomart.com/images/product/original/490830947/tata-sampann-high-protein-unpolished-chilka-moong-500-g-legal-images-o490830947-p490830947-5-202203150526.jpg"
      ],
      "rating": 4,
      "description": "Moong Dal is procured from reliable and high-quality sources. The beans are best consumed after being sprouted. Dosa with the whole moong also turns out to be yummy, another exotic way to eat moong is to eat it as a korma which is spiced up with tangy tomatoes and a cashew paste. It is mainly used as the base for curries such as sambar, dal, etc. Buy Tata Sampann Unpolished Chilka Moong online now!",
      "id": 4
    },
    {
      "productName": "Good Life Moong Dal 1 kg",
      "price": "145",
      "oldPrice": "189",
      "weight": [
        50,
        100,
        150,
        200,
        250,
        500
      ],
      "catImg": "https://www.jiomart.com/images/product/original/491187257/good-life-moong-dal-1-kg-product-images-o491187257-p491187257-0-202301171616.jpg",
      "discount": "12",
      "brand": "Good Life",
      "productImages": [
        "https://www.jiomart.com/images/product/original/491187257/good-life-moong-dal-1-kg-product-images-o491187257-p491187257-0-202301171616.jpg",
        "https://www.jiomart.com/images/product/original/491187257/good-life-moong-dal-1-kg-product-images-o491187257-p491187257-1-202301171616.jpg",
        "https://www.jiomart.com/images/product/original/491187257/good-life-moong-dal-1-kg-legal-images-o491187257-p491187257-2-202301171616.jpg"
      ],
      "rating": 4.5,
      "description": "Good life Moong Dal is procured from reliable and high-quality sources. The beans are best consumed after being sprouted. Dosa with whole moong also turns out to be yummy, another exotic way to eat moong is to eat it as a korma which is spiced up with tangy tomatoes and a cashew paste. It is mainly used as the base for curries such as sambar, dal etc. Buy Good Life Moong Dal online now!",
      "id": 5
    },
    {
      "productName": "Good Life Kabuli Chana 1 kg",
      "price": "185",
      "oldPrice": "210",
      "weight": [
        50,
        100,
        150,
        200,
        250,
        500
      ],
      "catImg": "https://www.jiomart.com/images/product/original/491187282/good-life-kabuli-chana-1-kg-product-images-o491187282-p491187282-0-202301171615.jpg",
      "discount": "23",
      "brand": "Good Life",
      "productImages": [
        "https://www.jiomart.com/images/product/original/491187282/good-life-kabuli-chana-1-kg-product-images-o491187282-p491187282-0-202301171615.jpg",
        "https://www.jiomart.com/images/product/original/491187282/good-life-kabuli-chana-1-kg-product-images-o491187282-p491187282-1-202301171615.jpg",
        "https://www.jiomart.com/images/product/original/491187282/good-life-kabuli-chana-1-kg-legal-images-o491187282-p491187282-4-202301171615.jpg"
      ],
      "rating": 3.5,
      "description": "Kabuli Chana is rich in proteins, dietary fibre and low in cholesterol and saturated fat. The beans can be soaked in water and cooked along with vegetables in the preparation of a variety of curries that complement well with rice, roti, chapattis, puri, kulcha as well as bread. It can be sprouted after soaking in water for 24 hours and added to salads to enrich the latter with proteins. Buy Good Life Kabuli Chana online now!",
      "id": 6
    },
    {
      "productName": "Angur Oily Toor Dal 5Kg",
      "price": "999",
      "oldPrice": "1100",
      "weight": [
        50,
        100,
        150,
        200,
        250,
        500
      ],
      "catImg": "https://www.jiomart.com/images/product/original/rv8axdxoiw/angur-oily-toor-dal-5kg-product-images-orv8axdxoiw-p602216568-0-202306071944.jpg",
      "discount": "16",
      "brand": "Angur",
      "productImages": [
        "https://www.jiomart.com/images/product/original/rv8axdxoiw/angur-oily-toor-dal-5kg-product-images-orv8axdxoiw-p602216568-0-202306071944.jpg",
        "https://www.jiomart.com/images/product/original/rv8axdxoiw/angur-oily-toor-dal-5kg-product-images-orv8axdxoiw-p602216568-1-202306071944.jpg",
        "https://www.jiomart.com/images/product/original/rv8axdxoiw/angur-oily-toor-dal-5kg-product-images-orv8axdxoiw-p602216568-2-202306071944.jpg",
        "https://www.jiomart.com/images/product/original/rv8axdxoiw/angur-oily-toor-dal-5kg-product-images-orv8axdxoiw-p602216568-3-202306071944.jpg",
        "https://www.jiomart.com/images/product/original/rv8axdxoiw/angur-oily-toor-dal-5kg-product-images-orv8axdxoiw-p602216568-4-202306071944.jpg",
        "https://www.jiomart.com/images/product/original/rv8axdxoiw/angur-oily-toor-dal-5kg-legal-images-orv8axdxoiw-p602216568-5-202306071944.png"
      ],
      "rating": 5,
      "description": "ANGUR TOOR DAL: Toor Dal (split yellow peas) is a mainstay of Indian cuisine. Related to lentils (pulses) and rich in natural nutrients, these delicious legumes are an excellent source of protein, minerals, and B vitamins.ADDS FLAVORFUL PROTEIN: Split yellow peas are an excellent, flavorful protein alternative for any meal. Use as a base or add Toor Dals to your favorite Indian dishes, including curries, soups, stews, salads, and more!",
      "id": 7
    },
    {
      "productName": "Fortune Soya Wadi / Chunks 1 kg",
      "price": "139",
      "oldPrice": "152",
      "weight": [
        50,
        100,
        150,
        200,
        250,
        500
      ],
      "catImg": "https://www.jiomart.com/images/product/original/491161236/fortune-soya-wadi-chunks-1-kg-product-images-o491161236-p491161236-0-202303181437.jpg",
      "discount": "15",
      "brand": "Fortune",
      "productImages": [
        "https://www.jiomart.com/images/product/original/491161236/fortune-soya-wadi-chunks-1-kg-product-images-o491161236-p491161236-0-202303181437.jpg",
        "https://www.jiomart.com/images/product/original/491161236/fortune-soya-wadi-chunks-1-kg-product-images-o491161236-p491161236-1-202303181437.jpg",
        "https://www.jiomart.com/images/product/original/491161236/fortune-soya-wadi-chunks-1-kg-legal-images-o491161236-p491161236-4-202303181437.jpg"
      ],
      "rating": 4.5,
      "description": "Fortune Soya Wadi / Chunks are light, soft and easy on your stomach. Does your family need champion wala dum aur yum? From biryanis to pulao and even Chinese fried rice, cooked soya chunks can be added to numerous rice dishes. Fortune Soya Chunk - ''Yum jo de champion ko dum'', so buy Fortune Soya Wadi / Chunks online now!",
      "id": 8
    }
  ]);
  const [isLoading, setIsloading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [isopenNavigation, setIsopenNavigation] = useState(false);

  const [isLogin, setIsLogin] = useState();
  const [isOpenFilters, setIsopenFilters] = useState(false);
  const [cartTotalAmount, setCartTotalAmount] = useState();

  
  useEffect(() => {

      setTimeout(() => {
        setProductData(data[1]);
        setIsloading(false);
      }, 3000);


  }, []);


  useEffect(() => {
    getCartData("cartItems url");
}, []);


  const getCartData = async (url) => {

}

  const addToCart = async (item) => {
 

  }

  const removeItemsFromCart = (id) => {
  }

  const emptyCart = () => {
    setCartItems([])
  }



  const openFilters=()=>{
    setIsopenFilters(!isOpenFilters)
  }

  const value = {
    cartItems,
    isLogin,
    windowWidth,
    isOpenFilters,
    addToCart,
    removeItemsFromCart,
    emptyCart,
    openFilters,
    isopenNavigation,
    setIsopenNavigation,
    setCartTotalAmount,
    cartTotalAmount,
    getCartData,
    setCartItems
  }

  return (
    
    data.productData.length !== 0 &&
    <BrowserRouter>
      <MyContext.Provider value={value}>
        {
          isLoading===true && <div className='loader'><img src={Loader}/></div>
        }

        
        <Header data={data.productData} />
        <Routes>
          <Route exact={true} path="/" element={<Home data={data.productData} />} />
          <Route exact={true} path="/cat/:id" element={<Listing data={data.productData} single={true} />} />
          <Route exact={true} path="/cat/:id/:id" element={<Listing data={data.productData} single={false} />} />
          <Route exact={true} path="/product/:id" element={<DetailsPage data={data.productData} />} />
          <Route exact={true} path="/cart" element={<Cart />} />
          <Route exact={true} path="*" element={<NotFound />} />
        </Routes>
       <Footer/>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;

export { MyContext }
